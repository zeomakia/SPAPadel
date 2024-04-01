export interface Partida {
  id: number;
  pareja1: string;
  pareja2: string;
  ubicacion: string;
  dia?: Date;
  resultado?: string;
  parejaGanadora?: string;
}