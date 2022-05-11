export async function onRequest(context){
   console.log(context);
   return new Response("Check console log, please");
}