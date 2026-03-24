import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'

import { createClient } from '@supabase/supabase-js'

/**
* PASO 1: CONFIGURACIÓN DE CONEXIÓN
* Sustituye estos valores con los de tu proyecto en Supabase (Project Settings > API)
*/
const SUPABASE_URL: string = "https://dxtzczofyhrzadgkbwgc.supabase.co";
const SUPABASE_KEY: string = "sb_publishable_Ls_frD-PjPKSAm0oEu9QIQ_V8fXBbut";
/**
*/
/* PASO 2: INICIALIZACIÓN DEL CLIENTE
* Creamos el objeto que nos permite hablar con la base de datos.
*/

// DESCOMENTAR LA LINEA DE ABAJO
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
/**
* PASO 3: INTERFAZ DE DATOS
* Definimos la estructura exacta de la tabla que vemos en tu imagen.
*/
interface Profesor {
  id: number;
  nombre: string;
  email: string;
}

const listaProfesores: Profesor[] = [];
const getProfesores = async (): Promise<void> => {
  const { data, error } = await supabase.from('profesor').select('*');

  if (error) {
    console.error('Error al obtener los profesores:', error.message);
    return;
  }

  const listaProfesores: Profesor[] = data as Profesor[];

  listaProfesores.forEach(profesor => {
    const option = document.createElement('option');
    option.value = profesor.id.toString();
    option.textContent = profesor.nombre;
    document.querySelector<HTMLSelectElement>('#profesores')!.appendChild(option);
  });

  console.log(data);
  console.table(listaProfesores);
}

getProfesores();


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src=${viteLogo} class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.ts</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src=${viteLogo} alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://www.typescriptlang.org" target="_blank">
          <img class="button-icon" src="${typescriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>



<div class="ticks"></div>
<section id="profesores">
<h2>Profesores</h2>
</section>
<section id="spacer"></section>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
