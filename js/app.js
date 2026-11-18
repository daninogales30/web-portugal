const h = React.createElement;
const STAGES = [
 {id:"s1",em:"🏁",name:"Salida desde Jerez",sub:"Jerez → Sevilla por la AP-4",items:[
  ["Foto de salida con cara de campeones","Cascos puestos y sonrisa de piloto, aunque vayáis a 100 km/h",10],
  ["Primer saludo de motero","Otro motero os saluda y devolvéis el saludo con mucha clase",20],
  ["Cantar a dúo una canción entera","Vale cantarla mal. Si desafináis los dos, vale doble",15],
  ["Que nadie diga: ¿me he dejado algo?","Prohibido acordarse de algo olvidado antes de la primera parada",15]]},
 {id:"s2",em:"🥐",name:"Sevilla",sub:"Parada 1 · Desayuno (30-40 min)",stop:"Desayuno exprés: tostada, café y a rodar. Que el cronómetro del novio no vea que paráis más de 40 minutos.",items:[
  ["Cruzar el Guadalquivir","Saludad al río como si os conociera",15],
  ["Desayuno completado","Tostada con tomate y a volar",25],
  ["Ella elige el desayuno","Y tú pagas sin protestar",20],
  ["Foto de los dos con la moto","Cuanto más ridícula la pose, más puntos mentales",15]]},
 {id:"s3",em:"🚛",name:"Sevilla → Gibraleón",sub:"A-49 · tramo de camioneros",items:[
  ["Adelantar a un camión sin dramas","Intermitente, sonrisa y que ella grite ¡dale!",20],
  ["Contar 5 coches rojos","Gana quien llegue antes a cinco, y el que pierde invita a un helado",15],
  ["Contar un chiste malo cada uno","Premio extra si el otro se ríe con el casco puesto",15],
  ["Ver un tractor","Aunque sea de lejos. Valen los de juguete en un coche",10],
  ["Que el copiloto invente el nombre de un pueblo","El nombre más ridículo del siguiente cartel gana",10],
  ["Un conductor os saluda con la mano","Un camionero o un coche, da igual quién",20],
  ["Ver un camión con nombre de mujer","Pintado en la cabina, sin parar a mirar",15]]},
 {id:"s4",em:"⛽",name:"Gibraleón",sub:"Parada 2 · Gasolina y estirar (10-15 min)",stop:"Parada rápida: repostar, agua y estirar el cuerpo serrano.",items:[
  ["Repostar la moto","Dale de comer, que se lo merece",10],
  ["Estiramiento de espalda a lo bailarín","Los dos a la vez, sin vergüenza",15],
  ["Ella elige la canción del siguiente tramo","Sin quejas del piloto",10]]},
 {id:"s5",em:"🌉",name:"Frontera con Portugal",sub:"Ayamonte → A-22",items:[
  ["Cruzar el Puente Internacional del Guadiana","Salir de España y entrar en Portugal en dos minutos",30],
  ["Cambio de hora: restar una hora","Hoy os regalan una hora de vida",20],
  ["Decir obrigado/a con acento portugués","Cuanto más exagerado, mejor",15],
  ["Ver el mar o la ría desde la autovía","Es oficial, estáis en el Algarve",20]]},
 {id:"s6",em:"🥤",name:"Gasolinera en Portugal",sub:"Parada 3 · Última parada (10 min)",stop:"La gasolinera de siempre: agua, algo dulce y último tirón.",items:[
  ["Pedir algo en portugués","Aunque salga una mezcla rara de español y portugués",20],
  ["Probar un pastel de nata","Obligatorio, y compartirlo es opcional",20],
  ["Contar 5 motos de países distintos","Matrículas de fuera, y que cuente el copiloto",25]]},
 {id:"s7",em:"🏨",name:"Recta final: zona del hotel",sub:"Mirachoro · Carvoeiro",items:[
  ["Ir al supermercado Apolónia","Objetivo: comprobar si sigue trabajando el vigilante de seguridad que conocisteis",40],
  ["Si el vigilante sigue ahí: ¡foto de reencuentro!","Dadle las gracias por mantener la seguridad del Algarve",60],
  ["Paseo por Carvoeiro","Foto en la zona y helado de premio",20],
  ["Llegada al hotel","Check-in, cascos fuera y misión cumplida",50]]}
];
const ALL = STAGES.flatMap(s=>s.items.map((it,i)=>({key:s.id+i,pts:it[2]})));
const MAX = ALL.reduce((a,b)=>a+b.pts,0);
function load(){try{return JSON.parse(localStorage.getItem("portimao2")||"{}")}catch(e){return {}}}
function save(v){try{localStorage.setItem("portimao2",JSON.stringify(v))}catch(e){}}
function rank(p){return p>=MAX?"Leyenda del Algarve":p>MAX*.7?"Piloto de Superbike":p>MAX*.4?"Rey de la rotonda":p>MAX*.15?"Piloto con ruedines":"Aún en el garaje"}
function App(){
 const [done,setDone]=React.useState(load);
 const [open,setOpen]=React.useState({s1:true});
 const [fin,setFin]=React.useState(false);
 const pts=ALL.reduce((a,x)=>a+(done[x.key]?x.pts:0),0);
 const n=ALL.filter(x=>done[x.key]).length;
 const pct=Math.round(pts/MAX*100);
 const toggle=k=>{const v={...done,[k]:!done[k]};setDone(v);save(v);};
 const hotel=done["s60"+""]&&false;
 const arrived=!!done["s73"];
 return h("div",null,
  h("header",{className:"hero"},
   h("img",{className:"sticker",src:"img/pegatina.jpg",alt:"Pegatina Jerez - Portugal con MotoGP"}),
   h("h1",null,"¡Juego para el camino!",h("span",null,"Jerez → Portimão")),
   h("p",{className:"sub"},"Marca cada reto por el camino, echaos unas risas y llegad al hotel con el camino superado.")),
  h("div",{className:"flag"}),
  h("div",{className:"bar"},
   h("div",{className:"road"},h("div",{className:"fill",style:{width:pct+"%"}}),h("span",{className:"moto",style:{left:Math.max(3,Math.min(pct,96))+"%"}},"🏍️"),h("span",{className:"goal"},"🏁")),
   h("div",{className:"meta"},h("span",null,n+" de "+ALL.length+" logros · "+pts+" pts"),h("span",{className:"rank"},rank(pts)))),
  h("div",{className:"list"},
  STAGES.map(s=>{
   const c=s.items.filter((_,i)=>done[s.id+i]).length;
   const full=c===s.items.length;
   return h("div",{className:"stage"+(full?" full":""),key:s.id},
    h("div",{className:"sh",tabIndex:0,onKeyDown:e=>{if(e.key==="Enter")setOpen({...open,[s.id]:!open[s.id]})},onClick:()=>setOpen({...open,[s.id]:!open[s.id]})},
     h("span",{className:"em"},s.em),
     h("div",null,h("div",{className:"st"},s.name),h("div",{className:"ss"},s.sub)),
     h("span",{className:"badge"+(full?" done":"")},full?"✓ Superada":c+"/"+s.items.length)),
    open[s.id]&&[s.stop&&h("div",{className:"stop",key:"stop"},"⏱️ "+s.stop)].concat(
     s.items.map((it,i)=>{const k=s.id+i;return h("button",{key:k,className:"item"+(done[k]?" on":""),onClick:()=>toggle(k)},
      h("span",{className:"chk"},done[k]?"✓":""),
      h("div",null,h("div",{className:"t"},it[0]),h("div",{className:"d"},it[1])),
      h("span",{className:"p"},"+"+it[2]))})));
  }),
  ),
  arrived&&!fin&&h("div",{className:"cta"},h("button",{className:"pri",style:{width:"100%"},onClick:()=>setFin(true)},"🏆 Ver resultado final")),
  fin&&h("div",{className:"final",onClick:()=>setFin(false)},
   h("div",{className:"fc",onClick:e=>e.stopPropagation()},
    h("img",{className:"sticker",src:"img/pegatina.jpg",alt:""}),
    h("h2",null,"¡Camino superado!"),
    h("p",null,"Jerez → Portimão completado. ¡Lo habéis conseguido!"),
    h("p",{className:"big"},pts+" puntos · "+n+" logros"),
    h("p",{className:"rank"},rank(pts)),
    h("p",{className:"sub"},"Ahora toca disfrutar de las motos... y de buscar al vigilante."),
    h("button",{className:"pri",onClick:()=>setFin(false)},"Cerrar"))),
  h("button",{className:"ghost",onClick:()=>{if(confirm("¿Reiniciar todos los logros?")){setDone({});save({});setFin(false);}}},"Reiniciar juego"));
}
ReactDOM.createRoot(document.getElementById("root")).render(h(App));
