/**
 * Editable sample floor plan for VINCENZO.
 * Status is illustrative — wire to live availability later.
 */

export type TableZone = "window" | "hall" | "bar" | "private";
export type TableStatus = "available" | "held" | "unavailable";

export type FloorTable = {
  id: string;
  label: string;
  seats: number;
  zone: TableZone;
  status: TableStatus;
  /** Position on the plan, percent of canvas */
  x: number;
  y: number;
  shape: "round" | "rect";
  w: number;
  h: number;
  note?: string;
};

export const zoneLabels: Record<TableZone, string> = {
  window: "У окна",
  hall: "Основной зал",
  bar: "У бара",
  private: "Приватная зона",
};

export const floorTables: FloorTable[] = [
  {
    id: "w1",
    label: "01",
    seats: 2,
    zone: "window",
    status: "available",
    x: 12,
    y: 18,
    shape: "round",
    w: 11,
    h: 14,
    note: "Тихий свет, вид на улицу",
  },
  {
    id: "w2",
    label: "02",
    seats: 2,
    zone: "window",
    status: "held",
    x: 26,
    y: 18,
    shape: "round",
    w: 11,
    h: 14,
  },
  {
    id: "w3",
    label: "03",
    seats: 4,
    zone: "window",
    status: "available",
    x: 40,
    y: 16,
    shape: "rect",
    w: 14,
    h: 16,
    note: "Для пары или небольшой компании",
  },
  {
    id: "h1",
    label: "04",
    seats: 4,
    zone: "hall",
    status: "available",
    x: 18,
    y: 42,
    shape: "rect",
    w: 14,
    h: 16,
  },
  {
    id: "h2",
    label: "05",
    seats: 4,
    zone: "hall",
    status: "unavailable",
    x: 36,
    y: 42,
    shape: "rect",
    w: 14,
    h: 16,
  },
  {
    id: "h3",
    label: "06",
    seats: 6,
    zone: "hall",
    status: "available",
    x: 54,
    y: 40,
    shape: "rect",
    w: 18,
    h: 18,
    note: "Центр зала",
  },
  {
    id: "b1",
    label: "B1",
    seats: 2,
    zone: "bar",
    status: "available",
    x: 78,
    y: 22,
    shape: "round",
    w: 10,
    h: 12,
    note: "Aperitivo у барной стойки",
  },
  {
    id: "b2",
    label: "B2",
    seats: 2,
    zone: "bar",
    status: "available",
    x: 78,
    y: 40,
    shape: "round",
    w: 10,
    h: 12,
  },
  {
    id: "p1",
    label: "P1",
    seats: 8,
    zone: "private",
    status: "available",
    x: 72,
    y: 68,
    shape: "rect",
    w: 20,
    h: 22,
    note: "Полуприватный угол",
  },
  {
    id: "h4",
    label: "07",
    seats: 2,
    zone: "hall",
    status: "available",
    x: 18,
    y: 70,
    shape: "round",
    w: 11,
    h: 14,
  },
  {
    id: "h5",
    label: "08",
    seats: 4,
    zone: "hall",
    status: "held",
    x: 36,
    y: 68,
    shape: "rect",
    w: 14,
    h: 16,
  },
];
