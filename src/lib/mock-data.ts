// ============================================================
// MOCK DATA — Datos exactos según especificación
// ============================================================

export const usuario = {
  nombre: "Anyelo Isaac Benavides Gutiérrez",
  iniciales: "AI",
  email: "anyelo@fixx.com",
  rol: "Propietario",
  plan: "Plan Trial",
  cuentaActiva: true,
  desde: "6 mar 2026",
  ultimaActividad: "16 mar 2026",
};

export const clientePrincipal = {
  id: "1",
  nombre: "Usuario Cliente",
  iniciales: "UC",
  telefono: "64470741",
  email: "prueba@gmail.com",
  nota: "Cliente nuevo",
  desde: "6 MAR 2026",
  desdeCompleto: "6 mar 2026",
};

export const vehiculoPrincipal = {
  id: "1",
  marca: "Toyota",
  modelo: "Corolla",
  anio: 2024,
  placa: "ABCD",
  color: "Rojo",
  kilometraje: 50000,
  propietario: "Usuario Cliente",
};

export const repuestos = [
  {
    id: "1",
    nombre: "Filtro de aceite sintético",
    sku: "FE-23434",
    costo: 24.57,
    venta: 30.0,
    stock: 1,
    stockMinimo: 1,
    margen: 18,
    estado: "Bajo",
  },
  {
    id: "2",
    nombre: "Prueba prueba",
    sku: "BA-234",
    costo: 1234.43,
    venta: 1234.43,
    stock: 0,
    stockMinimo: 1,
    margen: 0,
    estado: "Sin stock",
  },
];

export const ordenPrincipal = {
  id: "OT-0009",
  estado: "En proceso",
  vehiculo: "Toyota Corolla",
  cliente: "Usuario Cliente",
  total: 30.0,
  kilometraje: 60000,
  diagnostico: "Prueba prueba",
  notas: "Prueba prueba",
  creada: "16 mar 2026",
  actualizada: "16 mar 2026",
  mecanico: "Anyelo Isaac Benavides Gutiérrez",
};

export const ordenes = [
  { id: "OT-0009", estado: "En proceso", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Anyelo Isaac Benavides Gutiérrez", total: 30.0, fecha: "16 mar 2026" },
  { id: "OT-0008", estado: "Pendiente", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Anyelo Isaac Benavides Gutiérrez", total: 0.0, fecha: "16 mar 2026" },
  { id: "OT-0007", estado: "Pendiente", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Anyelo Isaac Benavides Gutiérrez", total: 0.0, fecha: "16 mar 2026" },
  { id: "OT-0006", estado: "Pendiente", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Arelybaca Benavides Gutiérrez", total: 0.0, fecha: "16 mar 2026" },
  { id: "OT-0005", estado: "Entregado", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Anyelo Isaac Benavides Gutiérrez", total: 1170.0, fecha: "15 mar 2026" },
  { id: "OT-0004", estado: "Entregado", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Anyelo Isaac Benavides Gutiérrez", total: 428.86, fecha: "14 mar 2026" },
  { id: "OT-0003", estado: "Entregado", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Anyelo Isaac Benavides Gutiérrez", total: 1234.43, fecha: "13 mar 2026" },
  { id: "OT-0002", estado: "Entregado", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Anyelo Isaac Benavides Gutiérrez", total: 0.0, fecha: "12 mar 2026" },
  { id: "OT-0001", estado: "Entregado", cliente: "Usuario Cliente", vehiculo: "Toyota Corolla", placa: "ABCD", mecanico: "Anyelo Isaac Benavides Gutiérrez", total: 234.0, fecha: "11 mar 2026" },
];

export const metricas = {
  facturacionAcumulada: 3097.29,
  ordenesTaller: 9,
  ordenesAsignadas: 9,
  otsEnProceso: 1,
  clientes: 1,
  vehiculos: 1,
  repuestosTotal: 2,
  recordatoriosPendientes: 0,
  otTotalesVehiculo: 9,
  entregadas: 5,
  historialCliente: 3,
};

export const recordatorios = [
  {
    id: "1",
    titulo: "Llantas",
    subtitulo: "Rotación, presión o inspección de llantas",
    tipo: "Enviado",
    modo: "Automático",
    nota: "Chequeo de llantas",
    programado: "14 mar 2026",
    enviado: "14 mar 2026",
  },
  {
    id: "2",
    titulo: "Otro",
    subtitulo: "Recordatorio personalizado para este vehículo",
    tipo: "Enviado",
    modo: "Automático",
    nota: "Prueba",
    programado: "14 mar 2026",
    enviado: "14 mar 2026",
  },
  {
    id: "3",
    titulo: "Revisión general",
    subtitulo: "Chequeo general del vehículo y puntos críticos",
    tipo: "Enviado",
    modo: "Manual",
    nota: "Recordatorio prueba",
    programado: "11 abr 2026",
    enviado: "14 mar 2026",
  },
];

export const ingresosSemanales = [
  { dia: "Lun", ingreso: 480, gasto: 120 },
  { dia: "Mar", ingreso: 620, gasto: 180 },
  { dia: "Mié", ingreso: 350, gasto: 90 },
  { dia: "Jue", ingreso: 780, gasto: 220 },
  { dia: "Vie", ingreso: 1200, gasto: 150 },
  { dia: "Sáb", ingreso: 900, gasto: 100 },
  { dia: "Dom", ingreso: 400, gasto: 60 },
];
