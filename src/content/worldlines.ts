import type { Worldline } from '../lib/types';

/**
 * Los campos atractores y las líneas de mundo notables de la obra.
 * Redactado para esta enciclopedia; el orden es el del recorrido narrativo.
 */
export const worldlines: Worldline[] = [
  {
    slug: 'alpha',
    name: 'Campo atractor Alpha',
    divergence: '0,000000 – 0,999999 %',
    band: 'α',
    summary:
      'El campo donde SERN culmina su investigación y convierte el viaje en el tiempo en un instrumento de control mundial.',
    detail: `Alpha es el campo en el que el laboratorio cae al empezar a jugar con los D-Mails.

Sus líneas difieren entre sí en detalles considerables —quién trabaja dónde, qué relaciones existen, qué recuerda cada cual— pero todas comparten un mismo desenlace: SERN obtiene la tecnología, la perfecciona y la usa para imponer un régimen de vigilancia total. La distopía no es un accidente de una línea concreta, sino el fondo del cauce.

Dentro de Alpha existe además una constante más íntima y más cruel, que el propio Okabe tarda en identificar y que convierte cada intento de arreglo en una variación del mismo fracaso. Puede cambiar el método; no puede cambiar el resultado.

Salir de Alpha requiere deshacer los cambios que lo provocaron: cada D-Mail enviado debe ser anulado, uno por uno, y cada anulación devuelve el mundo a un estado anterior a costa de borrar lo que ese cambio había traído consigo.`,
  },
  {
    slug: 'beta',
    name: 'Campo atractor Beta',
    divergence: '1,000000 – 1,999999 %',
    band: 'β',
    summary:
      'El campo de partida, donde SERN nunca obtiene la tecnología, pero el futuro desemboca en una guerra mundial.',
    detail: `Beta es el campo del que parte la historia y al que Okabe dedica media obra a intentar volver.

Aquí SERN no llega a controlar el viaje en el tiempo, y la distopía de vigilancia no ocurre. El precio es de otro orden y tarda décadas en cobrarse: la tecnología acaba en otras manos, y el resultado es un conflicto mundial de una escala que deja el mundo de Alpha casi habitable en comparación.

La ironía estructural de la obra está en este par. Alpha y Beta no son la línea mala y la línea buena: son dos catástrofes distintas, y cada intento de escapar de una conduce a la otra. Todo el segundo tramo de la historia consiste en descubrir que el objetivo por el que se ha luchado no era el correcto.

*Steins;Gate 0* transcurre precisamente aquí: en la rama de Beta donde Okabe abandona el intento y tiene que vivir con las consecuencias.`,
  },
  {
    slug: 'steins-gate',
    name: 'Campo atractor Steins Gate',
    divergence: '≥ 1,048596 %',
    band: 'SG',
    summary: 'El campo que evade los dos destinos conocidos. No se encuentra: hay que construirlo.',
    detail: `Steins Gate es el tercer campo, y su rasgo definitorio es que no está ahí esperando a ser encontrado.

Alcanzarlo no consiste en dar con el D-Mail correcto ni en ajustar mejor las variables. Exige una operación distinta: producir un pasado que satisfaga simultáneamente las condiciones de las dos catástrofes —que el mundo crea lo que necesita creer para que ninguna de las dos se dispare— sin que ese pasado sea verdadero.

El valor 1,048596 se ha convertido en la cifra emblemática de la obra, hasta el punto de funcionar como fecha conmemorativa entre sus lectores.

Llegar hasta aquí obliga a Okabe a renunciar a algo que ha perseguido durante toda la historia, y la obra es explícita en que ese precio no se compensa después. La línea de mundo se alcanza; el coste se queda.`,
    spoiler: true,
  },
  {
    slug: 'omega',
    name: 'Otras ramas',
    divergence: 'variable',
    band: '?',
    summary:
      'Ramas alternativas exploradas por las derivaciones de la obra: novelas visuales, OVAs y material paralelo.',
    detail: `Más allá de los tres campos centrales, el conjunto de la franquicia recorre ramas que la serie principal no visita.

Las derivaciones —novelas visuales, capítulos paralelos, OVAs, material de spin-off— exploran líneas donde las decisiones clave se toman de otro modo: finales centrados en personajes concretos, versiones cómicas del laboratorio, escenarios donde el descubrimiento nunca llega a producirse.

Su valor no es tanto la continuidad estricta como el contraste. Ver las mismas piezas ordenadas de otra manera aclara qué es exactamente lo que hace que la línea principal funcione.`,
  },
];

export function getWorldline(slug: string): Worldline | undefined {
  return worldlines.find((line) => line.slug === slug);
}
