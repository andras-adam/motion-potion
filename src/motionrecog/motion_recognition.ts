export enum Figure {
  circle = 0,
  square = 1,
  pull = 2,
  line_left = 3,
  line_up = 4,
}

enum Movement {
  unclassified = -1,
  line_up = 0,
  line_down = 1,
  line_left = 2,
  line_right = 3,
  line_towards = 4,
  line_from = 5,
  circle = 6,
}

export type InputDatum = {
  ax: number;
  ay: number;
  az: number;
  dt: number;
};

type Position = InputDatum & {
  vx: number;
  vy: number;
  vz: number;
  x: number;
  y: number;
  z: number;
};

export function detect_figure(time_series: InputDatum[]): Figure {
  let positions = track_position(time_series);

  let motion_periods = get_motion_periods(positions);
  return 0;
}

function classify_motion_period(motion_period: Position[]): Movement {
  let duration = 0;
  for (const pos of motion_period) {
    duration += pos.dt;
  }
  if (duration <= 0.2) {
    return Movement.unclassified;
  }
  // If acceleration vector never falls below thresh
  // AND avg acceleration vector is roughly zero
  // AND we have enough samples (took enough time)
  // then circle
  {
    const circle_center_thresh = 0.1;
    const circle_acc_thresh = 0.2;
    let probably_circle = true;
    if (motion_period.length >= 8 && duration >= 0.5) {
      // Sum of ax,ay,az
      let sax = 0;
      let say = 0;
      let saz = 0;
      for (const pos of motion_period) {
        sax += pos.ax;
        say += pos.ay;
        saz += pos.az;
        if (l2(pos.ax, pos.ay, pos.az) <= circle_acc_thresh) {
          probably_circle = false;
          break;
        }
      }
      if (l2(sax, say, saz) >= circle_center_thresh) {
        probably_circle = false;
      }
      if (probably_circle) {
        return Movement.circle;
      }
    }
  }

  // If velocity vector goes through threshold in one cardinal direction
  // AND not for any other
  // then line (vert or horizontal or pull)
  const line_variants = [
    // X
    {
      selector: (x: number, y: number, z: number) => {
        return { primary: x, other_1: y, other_2: z };
      },
      reversed: false,
      type: Movement.line_right,
    },
    {
      selector: (x: number, y: number, z: number) => {
        return { primary: x, other_1: y, other_2: z };
      },
      reversed: true,
      type: Movement.line_left,
    },
    // Y

    {
      selector: (x: number, y: number, z: number) => {
        return { primary: y, other_1: x, other_2: z };
      },
      reversed: false,
      type: Movement.line_down,
    },
    {
      selector: (x: number, y: number, z: number) => {
        return { primary: y, other_1: x, other_2: z };
      },
      reversed: true,
      type: Movement.line_up,
    },
    // Z
    {
      selector: (x: number, y: number, z: number) => {
        return { primary: z, other_1: y, other_2: x };
      },
      reversed: false,
      type: Movement.line_from,
    },
    {
      selector: (x: number, y: number, z: number) => {
        return { primary: z, other_1: y, other_2: x };
      },
      reversed: true,
      type: Movement.line_towards,
    },
  ];

  for (const variant of line_variants) {
    if (check_if_line(motion_period, variant.selector, variant.reversed)) {
      return variant.type;
    }
  }

  return Movement.unclassified;
}

function check_if_line(
  motion_period: Position[],
  selector: (
    x: number,
    y: number,
    z: number
  ) => { primary: number; other_1: number; other_2: number },
  reverse: boolean
): boolean {
  const line_detect_thresh = 0.3 * (reverse ? -1 : 1);
  const min_line_duration = 0.3;
  // Needs to be done again, on a single vector component rather than their norm
  let edge_up = false;
  let edge_up_duration = 0;
  for (const pos of motion_period) {
    let ordered = selector(pos.vx, pos.vy, pos.vz);
    let primary = ordered.primary;
    let o1 = ordered.other_1;
    let o2 = ordered.other_2;
    if (!edge_up) {
      if (primary > line_detect_thresh) {
        edge_up = true;
      }
    }
    if (edge_up) {
      edge_up_duration += pos.dt;

      if (
        Math.abs(o1) >= Math.abs(line_detect_thresh) ||
        Math.abs(o2) >= Math.abs(line_detect_thresh)
      ) {
        return false;
      }
      if (primary <= line_detect_thresh) {
        break;
      }
    }
  }
  if (edge_up_duration <= min_line_duration) {
    return false;
  }
  return true;
}

function get_motion_periods(positions: Position[]): Position[][] {
  let edge_up = false;
  const thresh = 0.5;

  let period = [];
  let periods = [];

  for (const pos of positions) {
    if (!edge_up) {
      if (l2(pos.vx, pos.vy, pos.vz) > thresh) {
        edge_up = true;
        period.push(pos);
      }
    }
    if (edge_up) {
      if (l2(pos.vx, pos.vy, pos.vz) <= thresh) {
        edge_up = false;
        period.push(pos);
        periods.push(period);
        period = [];
      }
    }
  }
  return periods;
}

function track_position(time_series: InputDatum[]): Position[] {
  let vx = 0;
  let vy = 0;
  let vz = 0;
  let x = 0;
  let y = 0;
  let z = 0;

  let positions = [];
  for (const ts of time_series) {
    const dt = ts.dt;
    vx += ts.ax * dt;
    vy += ts.ay * dt;
    vz += ts.az * dt;

    x += vx * dt;
    y += vy * dt;
    z += vz * dt;

    positions.push({
      ax: ts.ax,
      ay: ts.ay,
      az: ts.az,
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
