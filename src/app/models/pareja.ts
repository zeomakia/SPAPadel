export interface Pareja {
    id: number;
    jugador1: number;
    jugador2?: number;
    p_jugadas?: number;
    p_ganadas?: number;
    p_perdidas?: number;
    nombre_jugador1?: string;
    nombre_jugador2?: string;
    nombrePareja?: string;
  }