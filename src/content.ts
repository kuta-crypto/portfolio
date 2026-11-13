export const content = {
  name: 'Jeremias Spataro',
  location: 'Tandil, Buenos Aires, Argentina',
  intro: 'Desarrollo proyectos que conectan tecnología con necesidades cotidianas.',
  about: [
    'Soy estudiante de programación en una escuela técnica de Tandil. Me interesa crear soluciones útiles y entender todo el recorrido de una idea: desde la interfaz que usa una persona hasta los datos que la hacen funcionar.',
    'Estoy construyendo mi perfil como desarrollador a través de proyectos reales. En ese camino aprendí a trabajar con aplicaciones, backend y bases de datos, y sigo sumando herramientas con cada desafío.',
  ],
  contact: {
    email: '' as string,
    github: 'https://github.com/kuta-crypto' as string,
    linkedin: '' as string,
  },
  technologyGroups: [
    { title: 'Aplicaciones', items: ['Flutter', 'Dart'], number: '01' },
    { title: 'Backend y datos', items: ['Supabase', 'PostgreSQL', 'PHP'], number: '02' },
    { title: 'Programación', items: ['Java'], number: '03' },
  ],
  projects: [
    {
      id: 'infomicro',
      name: 'Infomicro',
      type: 'Proyecto educativo · Prototipo',
      authors: 'Jeremias Spataro y Franco Albanese',
      summary: 'Una propuesta para consultar la ubicación de colectivos y explorar líneas, recorridos y paradas del transporte urbano de Tandil.',
      objective: 'Busca reducir la incertidumbre durante la espera y facilitar la planificación de viajes.',
      stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'flutter_map', 'OpenStreetMap'],
    },
  ],
  busLines: [
    { number: '500', color: 'yellow' },
    { number: '501', color: 'red' },
    { number: '502', color: 'white' },
    { number: '503', color: 'blue' },
    { number: '504', color: 'green' },
    { number: '505', color: 'brown' },
  ],
} as const

