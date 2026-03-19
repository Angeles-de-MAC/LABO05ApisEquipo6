import { createClient } from '@supabase/supabase-js';
/**
 * PASO 1: DATOS PRIMITIVOS (Configuración base)
 * Definimos valores básicos con tipado explícito para que el compilador sepa 
 * exactamente qué tipo de datos estamos manejando desde el inicio.
 */
// Declaramos la URL base como string para no escribirla muchas veces.
const API_URL: string = "https://jsonplaceholder.typicode.com"; 

// El ID que usaremos para las pruebas. Especificamos que es un número.
const POST_ID_TO_SEARCH: number = 1; 

// Un booleano para decidir si mostramos mensajes de log detallados.
const IS_DEBUG_MODE: boolean = true; 

/**
 * PASO 2: INTERFACES (El contrato de datos)
 * Creamos una interfaz 'Post'. Esto no genera código JS, es una guía para TS
 * que define la estructura exacta que esperamos recibir de la API.
 */
interface Post {
  userId: number;   // ID del autor (numérico)
  id: number;       // ID único del post (numérico)
  title: string;    // Título del post (texto)
  body: string;     // Contenido del post (texto)
}

/**
 * PASO 3: FUNCIÓN PARA OBTENER DATOS (GET)
 * Usamos 'async' para indicar que la función maneja procesos de llamadas a APIS.
 * 'Promise<void>' indica que la función no retorna un valor, sino una promesa vacía.
 */

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const fetchSinglePost = async (id: number): Promise<void> => {
  // Aplicamos un estilo visual a la consola si estamos en modo debug.
  if (IS_DEBUG_MODE) {
    console.log(`%c [LAB 1] Buscando post con ID: ${id}...`, "color: cyan; font-weight: bold;");
  }

  try {
    // 'fetch' realiza la petición HTTP. 'await' espera a que se complete.
    // Usamos backticks (``) para concatenar la URL y el ID de forma dinámica.
    const response = await fetch(`${API_URL}/posts/${id}`);

    // Verificamos si la respuesta es exitosa (status 200-299).
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
    }

    // Convertimos el cuerpo de la respuesta a JSON.
    // Le decimos a TS que el resultado es de tipo 'Post'.
    const data: Post = await response.json();

    // Imprimimos el resultado accediendo a las propiedades definidas en la interfaz.
    console.log("✅ Post recuperado:");
    console.log(`   - Título: ${data.title}`);
    console.log(`   - Cuerpo: ${data.body.substring(0, 50)}...`);
    
  } catch (error) {
    // Si algo falla (red, error de servidor, etc.), el error cae aquí.
    console.error("❌ Fallo en Lab 1:", error);
  }
};

/**
 * PASO 4: FUNCIÓN PARA CREAR DATOS (POST)
 * Aquí aprendemos a enviar un objeto JS al servidor.
 */
const createNewPost = async (): Promise<void> => {
  console.log("%c [LAB 2] Creando un nuevo recurso...", "color: orange; font-weight: bold;");

  // Definimos un objeto literal que sigue la lógica de nuestra interfaz.
  const myNewPost = {
    title: "Mi Post de Prueba",
    body: "Contenido generado desde el laboratorio de TypeScript.",
    userId: 10
  };

  try {
    // En el fetch, pasamos un objeto de configuración como segundo parámetro.
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST", // Especificamos que vamos a "enviar/crear".
      
      // El servidor requiere una cadena de texto, no un objeto JS.
      // 'JSON.stringify' hace esa conversión.
      body: JSON.stringify(myNewPost), 
      
      headers: {
        // Metadata: Informamos al servidor que el contenido es JSON con codificación UTF-8.
        "Content-type": "application/json; charset=UTF-8", 
      },
    });

    // La API responde con el objeto creado y un nuevo ID (usualmente el 101).
    const createdPost: Post = await response.json();
    
    console.log("✅ Recurso creado exitosamente en el servidor:");
    console.log(createdPost);

  } catch (error) {
    console.error("❌ Fallo en Lab 2:", error);
  }
};
/*
        ##################################################
        EL RETO 
        ##################################################
*/

/**
 * PASO 6: RETO DE RECURSOS ANIDADOS (Pistas y estructura)
 * Objetivo: Obtener los comentarios que pertenecen a un Post específico.
 */
// PISTA A: Crea la interfaz 'Comment'. 
// Recuerda que la API devuelve: postId, id, name, email y body.

/**
 * PASO 7: FUNCIÓN DE BÚSQUEDA DE COMENTARIOS
 * Instrucciones:
 * 1. Usa la URL: ${API_URL}/posts/${id}/comments
 * 2. Recuerda que la respuesta es una LISTA (Array) de objetos Comment.
 * 3. Usa un bucle o método de array (como .forEach) para mostrar los datos.
 */
/**
 * RETO DE LABORATORIO: Obtener recursos anidados (Comments)
 */
const fetchCommentsByPost = async (postId: number): Promise<void> => {
  
  // 1. [LOG]: Mensaje de aviso con un toque de estilo
  console.log(`%c Buscando comentarios para el post ID: ${postId}...`, "color: #00ff00; font-weight: bold;");

  try {
    // 2. [PETICIÓN]: Construcción de la URL dinámica
    // Nota: Asegúrate de que API_URL esté definida globalmente
    const response = await fetch(`${API_URL}/posts/${postId}/comments`);

    // 3. [VALIDACIÓN]: Manejo de errores de red o peticiones fallidas
    if (!response.ok) {
      throw new Error(`Error al cargar los comentarios: ${response.status}`);
    }

    // 4. [TRADUCCIÓN]: Conversión a JSON con tipado de TypeScript
    // Nota: Definimos la interfaz Comment[] para tener autocompletado
    const data: Comment[] = await response.json();

    // 5. [PROCESAMIENTO]: Informe de resultados
    console.log(`Se han encontrado ${data.length} comentarios.`);

    // 6. [RECORRIDO]: Iteración y acceso a propiedades específicas
    data.forEach((comment) => {
      console.log(`Email del autor: ${comment.email}`);
    });

  } catch (error) {
    // 7. [ERRORES]: Captura de excepciones
    console.error("Hubo un problema con la operación fetch:", error);
  }
};

/**
 * PISTA FINAL DE EJECUCIÓN:
 * Dentro de tu función 'runLaboratory', no olvides añadir:
 * await fetchCommentsByPost(POST_ID_TO_SEARCH);
 */

/*
    ################################################################################
    
    Supabase challenge

    #################################################################################



 */

/**
 * PASO 1: CONFIGURACIÓN DE CONEXIÓN
 * Sustituye estos valores con los de tu proyecto en Supabase (Project Settings > API)
 */
const SUPABASE_URL: string = "https://grjcxywwagqhhmuffjtd.supabase.co";
const SUPABASE_KEY: string = "sb_publishable_i8E7JdEN2XVlnuFroQRIgg_nk3DqKB1";

/**
 * PASO 2: INICIALIZACIÓN DEL CLIENTE
 * Creamos el objeto que nos permite hablar con la base de datos.
 */

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * PASO 3: INTERFAZ DE DATOS
 * Definimos la estructura exacta de la tabla que vemos en tu imagen.
 */
interface Semestre {
  id: number;       // Columna id (int4)
  numero: number;   // Columna numero (int4)
}

/**
 * PASO 4: LA FUNCIÓN DE LECTURA (GET)
 * Esta función entra a la base de datos y trae los registros.
 */
const getSemestres = async (): Promise<void> => {
  
  // Realizamos la consulta: 
  // 1. .from('semestre') -> Selecciona la tabla de tu imagen.
  // 2. .select('*')   -> Pide todas las columnas de esa tabla.

  const { data, error } = await supabase
    .from('semestre')   
    .select('*');

  // Si Supabase responde con un error (ej: tabla inexistente o sin permisos RLS)
  if (error) {
    console.error("❌ Error al obtener los semestres:", error.message);
    return;
  }

  // Si todo sale bien, 'data' contiene el array de objetos.
  // Usamos 'as Semestre[]' para decirle a TS que confíe en nuestra interfaz.
  const listaSemestres: Semestre[] = data as Semestre[];

  // Mostramos el resultado final en la consola del navegador
  console.log("✅ Lista de semestres recibida:");
  console.table(listaSemestres); 
};



/**
 * PASO final: EJECUCIÓN DEL LABORATORIO
 * Creamos una función orquestadora para manejar el flujo de las llamadas.
 */
const runLaboratory = async () => {
  console.log("%c --- INICIO DEL EXPERIMENTO ---", "background: #222; color: #bada55; padding: 5px;");
  
  // Usamos await para que los logs salgan en orden y no se mezclen.
  await fetchSinglePost(POST_ID_TO_SEARCH); 
  await createNewPost();    
  await getSemestres();                
  
  console.log("%c --- EXPERIMENTO FINALIZADO ---", "background: #222; color: #bada55; padding: 5px;");
};



// Disparamos todo el proceso.
runLaboratory();