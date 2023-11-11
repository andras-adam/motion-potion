enum Movement {
  unclassified = -1,
  line_y = 1,
  line_x = 2,
  circle = 4,
}

export type InputDatum = {
  ax: number;
  ay: number;
  az: number;
  timestamp: number;
};

type Position = {
  dt: number;
  ax: number;
  ay: number;
  az: number;
  vx: number;
  vy: number;
  vz: number;
  x: number;
  y: number;
  z: number;
};

// TMP Ret type
export function detect_figure(time_series: InputDatum[]): Position[] {
  let positions = track_position(time_series);
  // console.log(positions);
  let motion_periods = get_motion_periods(positions);

  if (!motion_periods) {
    return [];
  }

  for (const mp of motion_periods) {
    let classification = classify_motion_period(mp);
    if (classification != Movement.unclassified) {
      console.log(classification);
      return motion_periods[0] || [];
    }
  }
  // return Movement.unclassified;
  return motion_periods[0] || [];
}

function classify_motion_period(motion_period: Position[]): Movement {
  let duration = 0;
  for (const pos of motion_period) {
    duration += pos.dt;
  }
  if (duration <= 0.2) {
    return Movement.unclassified;
  }

  let sax = 0;
  let say = 0;
  for (let index = 0; index < motion_period.length; index++) {
    const pos = motion_period[index];
    sax += pos.ax;
    say += pos.ay;
  }
  sax = sax / motion_period.length;
  say = say / motion_period.length;

  // If acceleration vector never falls below thresh
  // AND avg acceleration vector is roughly zero
  // AND we have enough samples (took enough time)
  // then circle
  // if (duration > 0.7) {
  //   return Movement.circle;
  // }
  if (check_if_circle(motion_period, duration, sax, say)) {
    return Movement.circle;
  }

  // If velocity vector goes through threshold in one cardinal direction
  // AND not for any other
  // then line (vert or horizontal or pull)
  const line_variants = [
    // X
    {
      selector: (x: number, y: number, z: number) => {
        return { primary: x, other_1: y, other_2: 0 };
      },
      type: Movement.line_x,
    },

    // Y
    {
      selector: (x: number, y: number, z: number) => {
        return { primary: y, other_1: x, other_2: 0 };
      },
      type: Movement.line_y,
    },
    // // Z
    // {
    //   selector: (x: number, y: number, z: number) => {
    //     return { primary: z, other_1: y, other_2: x };
    //   },
    //   reversed: false,
    //   type: Movement.line_from,
    // },
    // {
    //   selector: (x: number, y: number, z: number) => {
    //     return { primary: z, other_1: y, other_2: x };
    //   },
    //   reversed: true,
    //   type: Movement.line_towards,
    // },
  ];

  for (const variant of line_variants) {
    if (check_if_line(motion_period, variant.selector, sax, say)) {
      return variant.type;
    }
  }

  return Movement.unclassified;
}

function check_if_circle(
  motion_period: Position[],
  duration: number,
  sax: number,
  say: number
): boolean {
  const circle_center_thresh = 0.7;
  const circle_acc_thresh = 0.25;
  let little_movement_duration = 0;
  let probably_circle = true;
  if (motion_period.length >= 40 && duration >= 0.5) {
    let n = motion_period.length;
    // Sum of ax,ay,az
    for (let index = 0; index < motion_period.length; index++) {
      const pos = motion_period[index];
      let l2d = l2(pos.ax, pos.ay, 0);
      if (l2d <= circle_acc_thresh) {
        little_movement_duration += pos.dt;
      }
    }
    if (little_movement_duration / duration > 0.4) {
      probably_circle = false;
    }

    let cut_off = 0.0;
    for (const pos of motion_period) {
      let d = l0(pos.ax - sax, pos.ay - say);
      if (d < 0.4) {
        cut_off += 1;
      }
    }
    console.log("c " + sax + " cc " + say);
    console.log("cnn " + cut_off / n);
    if (cut_off / n > 0.6) {
      probably_circle = false;
    }

    return probably_circle;
  }
  return false;
}

function check_if_line(
  motion_period: Position[],
  selector: (
    x: number,
    y: number,
    z: number
  ) => { primary: number; other_1: number; other_2: number },
  sax: number,
  say: number
): boolean {
  const line_detect_thresh = 0.8;
  const max_angle = 3.14 / 16;
  // Needs to be done again, on a single vector component rather than their norm
  let can_be_line = false;
  let outliers = 0;
  let centers = selector(sax, say, 0);
  let csax = centers.primary;
  let csay = centers.other_1;
  for (const pos of motion_period) {
    let ordered = selector(pos.vx, pos.vy, pos.vz);
    let primary = ordered.primary;
    let o1 = ordered.other_1;

    if (Math.abs(primary - csax) > 0.4) {
      can_be_line = true;
    }
    if (
      Math.abs(o1 - csay) > line_detect_thresh &&
      Math.atan2(Math.abs(o1 - csay), Math.abs(primary - csax)) > max_angle
    ) {
      outliers += 1;
    }
  }
  if (outliers / motion_period.length > 0.1) {
    return false;
  }
  if (can_be_line) {
  }
  return can_be_line;
}

function get_motion_periods(positions: Position[]): Position[][] {
  let edge_up = false;
  const thresh = 0.2;

  let period = [];
  let periods = [];
  let stopped = 0;
  for (const pos of positions) {
    if (!edge_up) {
      if (l2(pos.ax, pos.ay, pos.az) > thresh) {
        edge_up = true;
        period.push(pos);
        stopped = 0;
      }
    }
    if (edge_up) {
      period.push(pos);
      if (l2(pos.ax, pos.ay, pos.az) <= thresh) {
        stopped += pos.dt;
      } else {
        stopped = 0;
      }
      if (stopped > 0.1) {
        edge_up = false;
        periods.push(period);
        period = [];
      }
    }
  }
  return periods;
}

function track_position(time_series: InputDatum[]): Position[] {
  if (time_series.length <= 1) {
    return [];
  }
  let vx = 0;
  let vy = 0;
  let vz = 0;
  let x = 0;
  let y = 0;
  let z = 0;

  let previous_t = time_series[0].timestamp;
  let positions = [];
  let skipfirst = true;

  let lpfazbuffer: number[] = [];
  let lpfaybuffer: number[] = [];
  let lpfaxbuffer: number[] = [];
  const smoothing = 0.2;

  for (const ts of time_series) {
    ts.az = 0;
    if (skipfirst) {
      skipfirst = false;
      continue;
    }
    let ax = lpf(lpfaxbuffer, ts.ax, smoothing);
    let ay = lpf(lpfaybuffer, ts.ay, smoothing);
    let az = lpf(lpfazbuffer, ts.az, smoothing);
    const dt = (ts.timestamp - previous_t) / 1000000000;
    previous_t = ts.timestamp;
    if (l2(ax, ay, az) < 0.1) {
      vx = 0;
      vy = 0;
      vz = 0;
    } else {
      vx += ax * dt;
      vy += ay * dt;
      vz += az * dt;
    }
    x += vx * dt;
    y += vy * dt;
    z += vz * dt;

    positions.push({
      ax: ax,
      ay: ay,
      az: az,
      dt,
      vx,
      vy,
      vz,
      x,
      y,
      z,
    });
  }

  return positions;
}

function l2(a: number, b: number, c: number): number {
  return Math.sqrt(a ** 2 + b ** 2 + c ** 2);
}

function l0(a: number, b: number): number {
  return Math.min(Math.abs(a), Math.abs(b));
}

function lpf(buffer: number[], next: number, smoothing: number): number {
  const maxBuffer = 10;
  var removed = buffer.length === maxBuffer ? buffer.shift() : 0;
  buffer.push(next);
  // smooth value using all values from buffer
  var result = buffer.reduce(function (last, current) {
    return smoothing * current + (1 - smoothing) * last!;
  }, removed)!;
  // replace smoothed value
  buffer[buffer.length - 1] = result;
  return result;
}
