import type { GlossaryEntry } from '../lib/types';

/**
 * Glosario de la terminología de Steins;Gate, redactado para esta enciclopedia.
 * Las entradas marcadas con `spoiler` se ocultan tras un velo en la interfaz.
 */
export const glossary: GlossaryEntry[] = [
  {
    slug: 'd-mail',
    term: 'D-Mail',
    reading: 'DeLorean Mail',
    category: 'artefacto',
    short: 'Mensaje de texto enviado al pasado a través del Teléfono Microondas.',
    body: `Un D-Mail —contracción de "DeLorean Mail", en homenaje al coche de *Regreso al futuro*— es un correo de móvil convencional que, en lugar de viajar por la red hacia el presente, se envía a un teléfono situado en el pasado.

El mensaje no transporta materia: transporta información. Al llegar a un destinatario que aún no ha tomado una decisión, altera esa decisión, y con ella toda la cadena de causas posteriores. El resultado es un salto a una línea de mundo distinta.

La limitación es dura y define buena parte de la trama: el ancho de banda del envío es minúsculo. Los primeros D-Mails apenas admiten 36 bytes, de modo que cambiar el pasado exige comprimir una intención entera en una frase telegráfica. Cuanto mayor es el cambio provocado, mayor es el desplazamiento en el medidor de divergencia.

Quien envía un D-Mail no recuerda haberlo hecho: para él, el nuevo pasado es el único que hubo. Sólo alguien con Reading Steiner conserva la memoria de la línea abandonada.`,
    related: ['telefono-microondas', 'reading-steiner', 'medidor-de-divergencia', 'linea-de-mundo'],
  },
  {
    slug: 'reading-steiner',
    term: 'Reading Steiner',
    category: 'concepto',
    short: 'Capacidad de conservar los recuerdos de una línea de mundo tras saltar a otra.',
    body: `Reading Steiner es el nombre que Okabe Rintarō da a su propia anomalía: cuando la realidad se reescribe, su memoria no se reescribe con ella.

Para el resto del mundo, un salto de línea de mundo es invisible. El pasado cambia, y con él cambian los recuerdos de todos, de modo que nadie percibe discontinuidad alguna: siempre fue así. Okabe, en cambio, se queda con dos versiones incompatibles del pasado y la certeza insoportable de que la que recuerda ya no existe.

Es a la vez su única herramienta y su condena. Sin Reading Steiner nadie podría navegar entre líneas de mundo de forma deliberada; con él, Okabe carga solo con el duelo de cada realidad que borra.

El fenómeno no es exclusivo suyo, aunque en él se manifiesta con una intensidad excepcional.`,
    related: ['linea-de-mundo', 'd-mail', 'okabe'],
  },
  {
    slug: 'linea-de-mundo',
    term: 'Línea de mundo',
    reading: '世界線 · sekaisen',
    category: 'concepto',
    short: 'Una historia posible del universo, identificada por su valor de divergencia.',
    body: `Una línea de mundo es una secuencia completa y coherente de acontecimientos: un universo con su propio pasado y su propio futuro.

La obra parte de una premisa concreta: las líneas de mundo no se ramifican infinitamente sin orden, sino que se agrupan en **campos atractores**. Dentro de un mismo campo, los detalles pueden cambiar —quién trabaja dónde, qué se dijo en una conversación— pero los grandes acontecimientos convergen igualmente hacia el mismo desenlace. Cambiar de detalle es fácil; cambiar de destino exige salir del campo entero.

Cada línea se identifica por su **valor de divergencia**, un número que mide su distancia respecto de la línea de partida. Los saltos dentro del mismo campo mueven el valor en las cifras decimales; cruzar a otro campo exige superar el umbral del 1 %.`,
    related: ['campo-atractor', 'medidor-de-divergencia', 'd-mail'],
  },
  {
    slug: 'campo-atractor',
    term: 'Campo atractor',
    reading: 'アトラクタフィールド',
    category: 'concepto',
    short: 'Conjunto de líneas de mundo que convergen inevitablemente en el mismo desenlace.',
    body: `Un campo atractor agrupa todas las líneas de mundo que, pese a sus diferencias, terminan en el mismo acontecimiento mayor. Es la forma que tiene la obra de explicar por qué ciertos hechos parecen imposibles de evitar.

Dentro de un campo, la causalidad se comporta como un cauce: el agua puede desviarse entre las piedras, pero desemboca donde desemboca. Se puede impedir que alguien muera atropellado y descubrir que muere apuñalado esa misma tarde. El método cambia; el resultado no.

Salir de un campo atractor requiere un cambio cuyo efecto acumulado supere el 1 % de divergencia. Ése es, en la práctica, el problema central de la historia: no basta con cambiar el pasado, hay que cambiarlo lo suficiente.

Los tres campos que estructuran la obra son Alpha, Beta y Steins Gate.`,
    related: ['linea-de-mundo', 'medidor-de-divergencia', 'steins-gate-termino'],
  },
  {
    slug: 'medidor-de-divergencia',
    term: 'Medidor de divergencia',
    reading: 'ダイバージェンスメーター',
    category: 'artefacto',
    short: 'Dispositivo de tubos nixie que indica el valor de la línea de mundo actual.',
    body: `El medidor de divergencia es un aparato de siete tubos nixie que muestra, con seis decimales, la distancia entre la línea de mundo presente y la línea original de referencia.

Lo trae del futuro Amane Suzuha, y su utilidad es precisamente la que Okabe necesita: convierte en un número legible algo que hasta entonces sólo podía intuir. Cuando la lectura cambia, hay confirmación objetiva de que la realidad se ha reescrito.

La lectura se expresa en tanto por ciento. Un salto dentro del mismo campo atractor mueve los decimales; superar el 1 % significa haber cambiado de campo, y con ello de destino.

El diseño con tubos nixie —tecnología de los años sesenta, de brillo anaranjado— es deliberado: la obra asocia el viaje en el tiempo con lo analógico y lo obsoleto, no con lo pulcro y futurista.`,
    related: ['linea-de-mundo', 'campo-atractor', 'suzuha'],
  },
  {
    slug: 'telefono-microondas',
    term: 'Teléfono Microondas (provisional)',
    reading: '電話レンジ（仮）',
    category: 'artefacto',
    short: 'Future Gadget nº 8: un microondas conectado a un móvil que envía mensajes al pasado.',
    body: `El Future Gadget nº 8 nace, como casi todo en el laboratorio, de un accidente. Un microondas de segunda mano conectado a un teléfono móvil resulta enviar mensajes de texto al pasado en vez de calentar comida.

El nombre completo —"Teléfono Microondas (provisional)"— conserva el paréntesis porque nadie llegó a ponerle uno definitivo. Es el chiste recurrente del laboratorio y, a la vez, el resumen perfecto de la obra: el descubrimiento científico más importante de la historia humana ocurre por casualidad, en un piso encima de una tienda de televisores, y ni siquiera le ponen un nombre decente.

Su funcionamiento depende de un fenómeno físico real llevado al extremo: el aparato necesita la potencia y la sincronización de un acelerador de partículas para abrir el canal. De ahí que su alcance sea limitado y que su existencia interese tanto a quien controla ese tipo de instalaciones.

Un efecto secundario documentado y célebre: los plátanos introducidos en él se convierten en una masa gelatinosa verdosa. El gel-nana.`,
    related: ['d-mail', 'future-gadget', 'sern', 'maquina-del-tiempo'],
  },
  {
    slug: 'future-gadget',
    term: 'Future Gadget',
    category: 'artefacto',
    short: 'Los inventos del Laboratorio de Gadgets del Futuro, casi todos inútiles.',
    body: `Los Future Gadgets son las invenciones numeradas del laboratorio. La broma sostenida de la obra es que prácticamente todos son inservibles: un mando a distancia que sólo funciona apuntando a la pared, una pistola de agua que dispara hacia atrás, un dispositivo que hace sonar el móvil cuando alguien mira fijamente.

La lista es larga y el nivel de ambición, mínimo. Hasta que llega el número 8.

Esa desproporción es intencionada. El laboratorio no es un centro de investigación: son tres estudiantes y una amiga en un piso alquilado, jugando a ser científicos. Que el descubrimiento del siglo caiga en sus manos es exactamente lo que hace funcionar la historia.`,
    related: ['telefono-microondas', 'laboratorio', 'gel-nana'],
  },
  {
    slug: 'sern',
    term: 'SERN',
    category: 'organizacion',
    short: 'Organización que investiga en secreto el viaje en el tiempo con su acelerador.',
    body: `SERN es la organización europea de investigación que, en la ficción, mantiene un programa clandestino de viaje en el tiempo bajo su gran acelerador de partículas.

El nombre juega abiertamente con el del CERN real, y el programa —bautizado Z Program en los documentos internos que el laboratorio consigue interceptar— lleva décadas intentando enviar materia orgánica al pasado usando micro agujeros negros. Los registros de esos experimentos son el material más perturbador de la obra: una sucesión de sujetos humanos reducidos a masas de tejido, catalogados con la frialdad de un informe de laboratorio.

Lo que convierte a SERN en amenaza no es la crueldad de sus experimentos, sino su competencia: son la única entidad con la infraestructura necesaria para convertir el descubrimiento accidental del laboratorio en un instrumento de control. La línea de mundo en la que lo consiguen es la distopía que Okabe pasa media historia intentando evitar.`,
    related: ['campo-atractor', 'rounders', 'telefono-microondas', 'ibn-5100'],
  },
  {
    slug: 'rounders',
    term: 'Rounders',
    category: 'organizacion',
    short: 'Unidad encubierta de SERN encargada del trabajo sucio sobre el terreno.',
    body: `Los Rounders son el brazo operativo de SERN: agentes infiltrados que vigilan, recuperan material e intervienen sin dejar rastro cuando alguien se acerca demasiado al Z Program.

Su presencia es lo que transforma la obra a mitad de recorrido. Durante los primeros episodios, el laboratorio juega con el descubrimiento como quien juega con un juguete nuevo. Los Rounders son la factura: el momento en que queda claro que hay alguien al otro lado, que lleva tiempo mirando, y que no tiene intención de negociar.

Operan con identidades falsas y trato cotidiano con sus objetivos, lo que convierte la paranoia de Okabe —hasta entonces una pose teatral— en una lectura razonable de la situación.`,
    related: ['sern', 'moeka'],
  },
  {
    slug: 'ibn-5100',
    term: 'IBN 5100',
    category: 'artefacto',
    short: 'Ordenador de los años setenta, única máquina capaz de leer el código heredado de SERN.',
    body: `El IBN 5100 es un microordenador de mediados de los setenta —trasunto del IBM 5100 real— del que se fabricaron muy pocas unidades.

Su valor en la trama es puramente técnico y por eso resulta convincente: es la única máquina que puede interpretar cierto dialecto de código antiguo sobre el que SERN construyó sus sistemas y que nunca llegó a migrar. Sin él, la base de datos interna de la organización es ilegible. Con él, se puede entrar.

El detalle es históricamente exacto en su espíritu: el IBM 5100 incorporaba un emulador capaz de ejecutar APL, y esa rareza es justo la clase de accidente de la historia de la informática que la obra convierte en pieza clave. Rastrear la máquina —quién la tuvo, dónde acabó, en qué línea de mundo sigue existiendo— ocupa buena parte de la investigación del laboratorio.`,
    related: ['sern', 'suzuha', 'linea-de-mundo'],
  },
  {
    slug: 'maquina-del-tiempo',
    term: 'Máquina del tiempo',
    category: 'artefacto',
    short: 'Vehículo capaz de transportar personas, no sólo información.',
    body: `Frente al Teléfono Microondas, que sólo envía datos, la máquina del tiempo propiamente dicha transporta un cuerpo humano.

Su construcción exige una tecnología que en el presente de la obra no existe, de modo que las que aparecen proceden del futuro. Son voluminosas, poco fiables y están sujetas a limitaciones severas: el salto tiene destino fijo, el margen de error temporal es grande y el aterrizaje rara vez ocurre donde se pretendía.

Esa fragilidad es deliberada. La obra evita el viaje en el tiempo como herramienta cómoda: cada salto cuesta caro, sale mal a menudo y no permite reintentar sin consecuencias.`,
    related: ['suzuha', 'telefono-microondas', 'linea-de-mundo'],
  },
  {
    slug: 'amadeus',
    term: 'Amadeus',
    category: 'ciencia',
    short: 'Sistema que almacena y ejecuta la memoria de una persona como IA conversacional.',
    body: `Amadeus es un proyecto de investigación que digitaliza los recuerdos de una persona y los ejecuta sobre un modelo capaz de conversar: no una imitación externa, sino una reconstrucción a partir de la memoria original.

El sistema plantea la pregunta que sostiene *Steins;Gate 0*: si una copia recuerda todo lo que recordaba el original, responde como respondería el original y cree ser el original, ¿en qué sentido no lo es? Y sobre todo: ¿qué le hace a quien ha perdido a alguien tener acceso permanente a algo que responde con su voz?

La obra no resuelve la cuestión filosófica. Se limita —con más eficacia— a mostrar el daño concreto que hace a quien decide no despedirse.`,
    related: ['kurisu', 'maho', 'steins-gate-0'],
    spoiler: true,
  },
  {
    slug: 'gel-nana',
    term: 'Gel-nana',
    reading: 'ゲルバナ',
    category: 'concepto',
    short: 'Plátano convertido en gel verdoso por el Teléfono Microondas; la primera prueba del fenómeno.',
    body: `El gel-nana es lo que queda de un plátano después de pasar por el Teléfono Microondas: una masa translúcida y verdosa que conserva la forma, pero no el estado.

Es el primer indicio de que el aparato no calienta, sino que hace otra cosa con la materia. Y es también la primera pista de la naturaleza real del fenómeno, porque el gel no está destruido: está desplazado. Un plátano enviado al pasado y devuelto no vuelve entero.

El detalle funciona a la vez como chiste recurrente y como advertencia sobre lo que SERN lleva décadas haciendo con sujetos humanos.`,
    related: ['telefono-microondas', 'sern'],
  },
  {
    slug: 'laboratorio',
    term: 'Laboratorio de Gadgets del Futuro',
    reading: '未来ガジェット研究所',
    category: 'lugar',
    short: 'Piso sobre una tienda de televisores en Akihabara; sede del laboratorio.',
    body: `El laboratorio ocupa el primer piso del edificio que alberga la tienda de televisores Braun, en una calle secundaria de Akihabara.

Es un apartamento pequeño, desordenado, con un aire acondicionado que funciona mal y un alquiler que se paga a duras penas. La plantilla se compone de sus miembros numerados por orden de ingreso, con Okabe como fundador y autoproclamado director.

La elección del emplazamiento importa. El Akihabara de la obra está retratado en un momento concreto de su transformación —tiendas de electrónica de segunda mano cediendo terreno a maid cafés y merchandising— y esa nostalgia por lo que se pierde recorre toda la historia.`,
    related: ['future-gadget', 'akihabara', 'okabe'],
  },
  {
    slug: 'akihabara',
    term: 'Akihabara',
    category: 'lugar',
    short: 'Barrio de Tokio donde transcurre casi toda la obra.',
    body: `Akihabara es el escenario casi único de *Steins;Gate*, y la obra lo trata como un personaje más.

El barrio aparece retratado con una fidelidad topográfica notable: las calles, los cruces, la estación, los locales de electrónica de segunda mano, el paso elevado. Los fondos de la serie se construyeron sobre fotografías reales, y buena parte de las localizaciones son identificables.

La ambientación se sitúa en pleno cambio de identidad del barrio. Ese Akihabara concreto —a medio camino entre el mercado de componentes y el parque temático otaku— es el que la obra fija, y su desaparición progresiva funciona como eco temático del problema central: todo lo que se cambia, se pierde.`,
    related: ['laboratorio'],
  },
  {
    slug: 'steins-gate-termino',
    term: 'Steins Gate',
    category: 'concepto',
    short: 'El campo atractor que escapa a los dos destinos conocidos.',
    body: `Steins Gate da nombre al tercer campo atractor: aquel que no conduce ni a la distopía de Alpha ni a la catástrofe de Beta.

El término lo acuña el propio Okabe, con la grandilocuencia habitual, antes de tener la menor idea de lo que significa. La obra convierte después ese gesto vacío en algo real: la línea de mundo que hay que alcanzar no existe todavía, hay que construirla.

La expresión "elección de Steins Gate" designa la decisión que permite llegar hasta ahí, y que consiste —sin entrar en detalles— en aceptar que salvar algo exige renunciar a la satisfacción de haberlo salvado.`,
    related: ['campo-atractor', 'linea-de-mundo', 'okabe'],
    spoiler: true,
  },
  {
    slug: 'el-psy-kongroo',
    term: 'El Psy Kongroo',
    category: 'concepto',
    short: 'Muletilla con la que Okabe cierra sus llamadas ficticias.',
    body: `"El Psy Kongroo" es la fórmula con la que Okabe termina las llamadas telefónicas que no mantiene con nadie, en su papel de Hōōin Kyōma, científico loco perseguido por una organización.

No significa nada. Ésa es la cuestión: forma parte de un decorado que Okabe construye para sí mismo, una personalidad prestada con la que llenar el hueco de lo que no sabe ser.

Su recorrido a lo largo de la obra es el del personaje entero. Empieza como pose ridícula, se vuelve mecanismo de defensa cuando la persecución imaginaria resulta ser real, y termina significando algo muy distinto de lo que significaba al principio.`,
    related: ['okabe'],
  },
  {
    slug: 'john-titor',
    term: 'John Titor',
    category: 'concepto',
    short: 'Identidad de un viajero del tiempo que publica en foros advertencias sobre el futuro.',
    body: `John Titor es el nombre con el que alguien publica en foros de internet afirmando venir del futuro, describiendo el mundo que le espera al presente y buscando un IBN 5100.

La obra toma el material directamente de un caso real: entre 2000 y 2001, un usuario que firmaba como John Titor publicó en foros estadounidenses sosteniendo ser un soldado enviado desde 2036 en busca de un IBM 5100. La historia, con sus detalles técnicos y su tono sobrio, se convirtió en una de las piezas de folclore de internet más duraderas de la década.

*Steins;Gate* la incorpora casi sin retoques, y ese anclaje en algo que el espectador puede ir a comprobar es parte esencial de su método: mezclar tecnología real, historia real y leyenda de internet hasta que la ficción se sostiene sola.`,
    related: ['ibn-5100', 'suzuha', 'sern'],
  },
];

export const glossaryByCategory = {
  concepto: 'Conceptos',
  artefacto: 'Artefactos',
  organizacion: 'Organizaciones',
  ciencia: 'Ciencia',
  lugar: 'Lugares',
} as const;

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossary.find((entry) => entry.slug === slug);
}
