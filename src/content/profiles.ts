import type { CharacterProfile } from '../lib/types';

/**
 * Fichas en español escritas para esta enciclopedia. Complementan —no sustituyen—
 * los datos objetivos que vienen de AniList (edad, cumpleaños, seiyuu, retrato).
 * Se enlazan por `characterId`; un personaje sin ficha muestra sólo los datos de la API.
 */
export const profiles: CharacterProfile[] = [
  {
    characterId: 35252,
    alias: 'Hōōin Kyōma · Okarin · Miembro nº 001',
    tagline: 'El científico loco que no lo es, y que acabará necesitando serlo.',
    bio: `Okabe Rintarō es estudiante universitario y fundador del Laboratorio de Gadgets del Futuro. También es, según él mismo, un científico loco perseguido por una organización mundial, y responde al nombre de Hōōin Kyōma.

Nada de eso es cierto al principio. La persecución es imaginaria, las llamadas telefónicas son a un teléfono apagado y la risa maníaca es un número ensayado. Okabe es un chaval inseguro que ha construido un personaje para no tener que ser él mismo, y todo el mundo a su alrededor lo sabe y le sigue la corriente.

Su transformación es el eje de la obra, y su mérito está en la dirección que toma: no consiste en abandonar la máscara, sino en descubrir que va a hacer falta. Cuando la organización resulta existir y la persecución resulta ser real, el disfraz deja de ser un juego y pasa a ser lo único que le permite seguir funcionando mientras carga con recuerdos que nadie más tiene.

Reading Steiner lo convierte en el único testigo de cada realidad que borra. La obra es implacable con lo que eso cuesta: Okabe repite las mismas horas decenas de veces, acumula duelos que nadie puede acompañar y llega al final considerablemente roto. Que aun así siga eligiendo, una vez tras otra, es lo que hace que el personaje se sostenga.`,
    traits: ['Fundador del laboratorio', 'Portador de Reading Steiner', 'Chūnibyō en remisión'],
  },
  {
    characterId: 34470,
    alias: 'Christina · El genio · Miembro nº 004',
    tagline: 'Neurocientífica a los dieciocho, y la única que discute de tú a tú con Okabe.',
    bio: `Makise Kurisu investiga en el programa de neurociencia de una universidad estadounidense y ha publicado en revistas de primer nivel antes de cumplir los diecinueve. Llega a Tokio para un congreso y termina, sin planearlo, siendo miembro del laboratorio.

Su función en la obra es doble. Por un lado, es el contrapeso científico: la que traduce el accidente del Teléfono Microondas a un marco teórico coherente, la que hace las preguntas correctas y la que impone rigor sobre el entusiasmo. Sin ella, el laboratorio nunca habría entendido lo que tenía entre manos.

Por otro, es la relación que la historia construye con más cuidado. Kurisu y Okabe se comunican casi exclusivamente por la vía del insulto y la pulla —los apodos que él le inventa son un chiste sostenido durante toda la serie— y esa esgrima verbal funciona como la única forma de intimidad que ninguno de los dos sabe admitir en voz alta.

Bajo la seguridad intelectual hay una persona bastante sola: una relación difícil con su padre, un historial de aislamiento por ir siempre varios años por delante y una costumbre de publicar en foros de internet que jamás reconocería. La obra le da una interioridad completa, y eso hace que lo que ocurre con ella pese lo que tiene que pesar.`,
    traits: ['Neurociencia', 'Miembro del laboratorio', 'Coautora del descubrimiento'],
  },
  {
    characterId: 35253,
    alias: 'Mayushii · Miembro nº 002',
    tagline: 'La amiga de la infancia; el ancla de Okabe y el precio del campo atractor.',
    bio: `Shiina Mayuri es amiga de Okabe desde la infancia, estudia bachillerato, trabaja en un maid café y cose disfraces con una habilidad notable. Su saludo —"tuturū~"— y su forma pausada de hablar la hacen parecer, al principio, un personaje decorativo.

No lo es. Mayuri es la razón por la que Okabe funciona. Su relación no es romántica ni pretende serlo: es la de dos personas que se conocen desde antes de saber quiénes eran, y ella es quien lo trajo de vuelta cuando él perdió el rumbo tras la muerte de su abuela. Que Okabe pueda permitirse el numerito de Hōōin Kyōma depende directamente de que ella esté ahí para tolerarlo.

Cuando la trama la convierte en la constante del campo atractor Alpha, la obra activa toda esa carga acumulada. No es la amenaza a un personaje secundario: es la amenaza a la única cosa que sostenía al protagonista. Y el campo atractor garantiza que cada rescate fracase de una forma nueva.

Su lucidez sobre lo que está pasando —mayor de la que aparenta y expresada siempre con suavidad— es de lo más doloroso que tiene la serie.`,
    traits: ['Amiga de la infancia', 'Cosplay y costura', 'Constante del campo Alpha'],
  },
  {
    characterId: 35258,
    alias: 'Daru · Súper Hacka · Miembro nº 003',
    tagline: 'El hacker del laboratorio: el que hace posible, en la práctica, todo lo demás.',
    bio: `Hashida Itaru —Daru para todo el mundo— es compañero de universidad de Okabe y el ingeniero real del laboratorio. Es quien construye lo que Okabe imagina y quien penetra los sistemas que hacen falta penetrar.

Su registro cómico es evidente y a menudo grosero: el otaku declarado, los comentarios sobre chicas, la afición al 2D. La obra no lo suaviza, y a la vez tiene cuidado de no reducirlo a eso.

Porque Daru es, sin discusión, el miembro más competente del equipo en términos prácticos. Cada avance importante —entrar en los archivos de SERN, entender el funcionamiento del gadget, mantener la infraestructura— pasa por sus manos. Y en los momentos en que la situación se vuelve grave, es también el más estable de los tres: el que no se derrumba, el que sigue trabajando, el que le dice a Okabe lo que necesita oír sin adornarlo.

Su relación con Suzuha añade una capa de la que es mejor no adelantar nada.`,
    traits: ['Ingeniería y hacking', 'Miembro fundador', 'Soporte técnico del laboratorio'],
  },
  {
    characterId: 35255,
    alias: 'Part-time Warrior · Miembro nº 008',
    tagline: 'Trabaja en la tienda de abajo, va en bicicleta a todas partes y busca algo.',
    bio: `Amane Suzuha aparece como empleada a tiempo parcial de la tienda de televisores de los bajos del laboratorio. Es directa, enérgica, físicamente muy capaz y va a todos lados en bicicleta.

También pregunta demasiado. Por el año en que estamos, por ciertos aparatos antiguos, por la gente del edificio. Su interés por el IBN 5100 es insistente y no del todo explicable en alguien que trabaja despachando televisores.

Suzuha es el vector por el que la obra introduce el marco temporal completo: es ella quien trae el medidor de divergencia, quien aporta información sobre lo que viene, y quien pone sobre la mesa que el problema no se agota en el presente. La sección de la historia que ocupa es también la que más claramente conecta con el material de John Titor.

Debajo de la energía hay una misión personal y un plazo, y la obra deja que ambos pesen antes de explicarlos.`,
    traits: ['Viajera', 'Portadora del medidor de divergencia', 'Busca el IBN 5100'],
  },
  {
    characterId: 35256,
    alias: 'Feyris Nyan-Nyan · Miembro nº 006',
    tagline: 'Estrella del maid café, campeona de cartas y heredera de media Akihabara.',
    bio: `Akiha Rumiho trabaja como camarera estrella en el maid café donde también trabaja Mayuri, bajo el nombre artístico de Feyris Nyan-Nyan y con un habla salpicada de "nyan".

El personaje juega con las expectativas. La maid de voz cantarina es en realidad hija del hombre más rico del barrio, jugadora de cartas de nivel competitivo y una de las mentes más frías del reparto cuando la situación lo pide. Su influencia sobre lo que Akihabara es —y sobre lo que podría haber sido— resulta mayor de lo que nadie sospecha.

Su arco personal gira en torno a su padre y a hasta dónde está dispuesta a llegar para recuperar algo perdido. Es una de las derivaciones donde la obra explora con más claridad su tesis de fondo: que todo cambio en el pasado se cobra en otro sitio, y que quien lo provoca casi nunca es quien lo paga.`,
    traits: ['Maid café', 'Torneos de cartas', 'Heredera de los Akiha'],
  },
  {
    characterId: 30919,
    alias: 'Lukako · Miembro nº 007',
    tagline: 'Hijo del sacerdote del santuario vecino; el objetivo de los peores chistes de Daru.',
    bio: `Urushibara Ruka es hijo del sacerdote del santuario contiguo al laboratorio, estudia en el mismo instituto que Mayuri y practica kendo.

Su presentación se apoya en un equívoco sostenido —el reparto entero, empezando por Okabe, tarda en asimilar que Ruka no es una chica— que la obra explota primero como comedia y después convierte en algo bastante más serio.

Porque el arco de Ruka plantea directamente la pregunta de qué haría alguien con acceso a un dispositivo capaz de cambiar el pasado, si lo que quiere cambiar es algo sobre sí mismo. La obra trata el asunto con más delicadeza de la que su punto de partida hacía prever, y el resultado es uno de los episodios donde el mecanismo de los D-Mails duele más.

Es también, sin discusión, la persona más amable del reparto.`,
    traits: ['Santuario Yanabayashi', 'Kendo', 'Miembro del laboratorio'],
  },
  {
    characterId: 35257,
    alias: 'Shining Finger · Miembro nº 005',
    tagline: 'Escribe en el móvil a velocidad imposible y no habla si puede evitarlo.',
    bio: `Kiryū Moeka trabaja para una revista y se comunica casi exclusivamente por mensajes de móvil, que teclea a una velocidad que le vale el apodo de Shining Finger. Hablar en voz alta le resulta difícil hasta el punto de la parálisis.

Su primera aparición es la de alguien que busca información sobre el IBN 5100 con una insistencia extraña. A partir de ahí, el personaje se convierte en uno de los elementos más incómodos de la obra, y también en uno de los mejor construidos.

Sin entrar en lo que ocurre: Moeka es el retrato de una dependencia. Alguien vaciado por dentro que ha encontrado una única fuente de sentido y que es capaz de cualquier cosa por no perderla. La obra no la excusa, pero tampoco la reduce a un obstáculo, y el resultado es un personaje que resulta difícil de odiar limpiamente.`,
    traits: ['Periodismo', 'Comunicación por móvil', 'Miembro del laboratorio'],
    spoilerNote: 'Su papel real en la trama se revela a mitad de la serie.',
  },
  {
    characterId: 83419,
    alias: 'Miembro nº 010',
    tagline: 'Investigadora en el proyecto Amadeus y antigua colega de Kurisu.',
    bio: `Hiyajō Maho es investigadora en neurociencia en una universidad estadounidense, donde trabajó junto a Kurisu, y una de las responsables del proyecto Amadeus.

Es el personaje que *Steins;Gate 0* incorpora al centro de la historia, y su función es la de alguien que llegó segunda. Maho es brillante, pero convivió con alguien más joven y más brillante todavía, y esa comparación la ha marcado de un modo que no consigue dejar atrás. Su relación con Kurisu —admiración, envidia, afecto real, resentimiento— es de lo más honesto que tiene la secuela.

Su trabajo con Amadeus la sitúa además en el centro de la pregunta que define esa obra: qué se le debe a una reconstrucción de alguien que ya no está, y qué le hace a los vivos conservarla.

Es sensible sobre su estatura y sobre que la confundan con una estudiante. Ambas cosas ocurren constantemente.`,
    traits: ['Neurociencia', 'Proyecto Amadeus', 'Miembro del laboratorio'],
  },
  {
    characterId: 126104,
    alias: 'Miembro nº 009',
    tagline: 'Una joven sin recuerdos que aparece buscando a alguien.',
    bio: `Shiina Kagari aparece en *Steins;Gate 0* sin memoria de quién es, con fragmentos sueltos de un pasado que no logra ordenar y la certeza de estar buscando a una persona concreta.

Su vínculo con Mayuri es inmediato y difícil de explicar por los datos disponibles, y la obra se toma su tiempo en aclararlo. Alrededor de ella se organiza buena parte de la trama de la secuela: quién la envió, desde dónde y con qué propósito.

Es un personaje construido sobre la fragilidad —los recuerdos que vuelven a trozos, los episodios de desconexión— y sobre lo que otros están dispuestos a hacer con alguien en ese estado.`,
    traits: ['Amnesia', 'Vínculo con Mayuri', 'Miembro del laboratorio'],
    spoilerNote: 'Su origen es uno de los ejes de Steins;Gate 0.',
  },
  {
    characterId: 38558,
    alias: 'Mr. Braun',
    tagline: 'Dueño de la tienda de televisores de abajo y casero del laboratorio.',
    bio: `Tennōji Yūgo regenta la tienda de televisores Braun, en los bajos del edificio, y es el casero del laboratorio. Padre viudo de Nae, brusco, malhablado y en conflicto permanente con el alquiler que Okabe no termina de pagar.

Su papel aparente es el de vecino gruñón con corazón de oro, y durante buena parte de la serie funciona exactamente así: el adulto que refunfuña, tolera el desorden de arriba y cuida de su hija con una torpeza evidente.

La obra tiene otros planes para él. Lo que Tennōji resulta ser reordena varias escenas anteriores, y su presencia acaba siendo uno de los recordatorios más eficaces de que en esta historia nadie es sólo lo que parece ser.`,
    traits: ['Tienda Braun', 'Casero del laboratorio', 'Padre de Nae'],
  },
  {
    characterId: 38559,
    alias: '',
    tagline: 'La hija pequeña de Mr. Braun; la niña del edificio.',
    bio: `Tennōji Nae es la hija de Yūgo, una niña tímida que ronda el edificio y a la que el laboratorio trata con una mezcla de cariño y desconcierto.

Su presencia en la serie principal es discreta y en buena medida funciona como termómetro: por cómo está Nae en cada línea de mundo se entiende rápido qué ha cambiado y qué se ha perdido.

En el material que explora el futuro, ese papel se amplía considerablemente.`,
    traits: ['Hija de Yūgo Tennōji', 'Vecina del laboratorio'],
  },
  {
    characterId: 41913,
    alias: '',
    tagline: 'Un viajero del tiempo que publica en foros advertencias sobre lo que viene.',
    bio: `John Titor es la identidad bajo la cual alguien publica en foros de internet sosteniendo venir del futuro, describiendo el mundo que espera al presente y buscando un IBN 5100.

El personaje llega directamente del folclore real de internet: entre 2000 y 2001 un usuario con ese nombre publicó en foros estadounidenses afirmando ser un soldado enviado desde 2036 en busca de esa misma máquina. *Steins;Gate* recoge el caso casi sin modificarlo.

Dentro de la obra, los mensajes de Titor son la primera pista sólida de que el descubrimiento del laboratorio se inscribe en algo mucho más grande, y de que hay gente que lleva tiempo intentando arreglarlo.`,
    traits: ['Viajero del tiempo', 'Foros de internet', 'Busca el IBN 5100'],
  },
  {
    characterId: 126105,
    alias: '',
    tagline: 'Investigador estadounidense al frente del proyecto Amadeus.',
    bio: `Alexis Leskinen dirige el equipo de investigación estadounidense responsable del proyecto Amadeus. Extrovertido, entusiasta y aficionado a las bromas, tiene el trato fácil de quien está acostumbrado a conseguir financiación.

Ese registro afable convive con una ambición científica que no se detiene ante gran cosa. Leskinen entiende perfectamente el valor de lo que tiene entre manos y las implicaciones de llevarlo más lejos, y la obra deja claro pronto que su interés no se agota en la investigación.

Es uno de los antagonistas de *Steins;Gate 0* y funciona por contraste: donde SERN era una organización sin rostro, él es un hombre concreto, simpático y perfectamente dispuesto.`,
    traits: ['Proyecto Amadeus', 'Investigación en IA', 'Viktor Chondria'],
  },
  {
    characterId: 41897,
    alias: '',
    tagline: 'Físico de reputación dudosa con una teoría sobre el viaje en el tiempo.',
    bio: `El doctor Nakabachi presenta en un congreso de Akihabara una teoría sobre el viaje en el tiempo que la comunidad científica recibe con escepticismo abierto.

Su intervención en la trama es breve pero determinante: la conferencia con la que arranca la serie es suya, y lo que ocurre en ese edificio pone en marcha todo lo demás.

Su relación con Kurisu, y el papel que juega en la cadena de acontecimientos que la obra tarda en desplegar por completo, lo convierten en bastante más que una figura de fondo.`,
    traits: ['Física teórica', 'Congreso de Akihabara'],
    spoilerNote: 'Su implicación real se aclara en el tramo final.',
  },
  {
    characterId: 57403,
    alias: '',
    tagline: 'Empleada de una empresa de electrónica; su apellido no es casualidad.',
    bio: `Amane Yuki trabaja en una empresa de electrónica y aparece en el entorno del laboratorio de forma aparentemente incidental.

Su apellido no es una coincidencia, y su presencia forma parte de una de las conexiones que la obra deja sembradas mucho antes de recogerlas.`,
    traits: ['Industria electrónica'],
    spoilerNote: 'Su relación con otro personaje es material de spoiler.',
  },
];

const byId = new Map(profiles.map((profile) => [profile.characterId, profile]));

export function getProfile(characterId: number): CharacterProfile | undefined {
  return byId.get(characterId);
}
