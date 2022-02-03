

$(document).ready(function () {
    // full-scope variables
const monsUrl = "https://pokeapi.co/api/v2/pokemon/"
const statList = document.getElementById("monstats")
const dexRegions = document.getElementById("dex-regions")
const pkmnType = document.getElementById("pkmn-type")
const monId = document.getElementById("mon-id")
const abilities = document.getElementById("abilities")
const strongTypeTo = document.getElementById("strong-type-to")
const strongTypeFrom = document.getElementById("strong-type-from")
const weakTypeTo = document.getElementById("weak-type-to")
const weakTypeFrom = document.getElementById("weak-type-from")
const monList = document.getElementById("mon-list")
let weaknesses = false
const damageValues = {}
const typeCheck = {}
let typesClone
let monNames = [] 
let typesArr = []
  let teamDiv = document.createElement('div')
let typesUrlArr = [] 
let regionArr = []
let courseArr = []
let dataset
let regionNameString

// function duplicateChildNodes (parentId){
//   var parent = document.getElementById(parentId);
//   NodeList.prototype.forEach = Array.prototype.forEach;
//   var children = parent.childNodes;
//   children.forEach(function(item){
//     var cln = item.cloneNode(true);
//     parent.appendChild(cln);
//   });
// };

// duplicateChildNodes("container");

function toTitleCase(upper) {
  return upper.charAt(0).toUpperCase() + upper.slice(1);
}
//remove children//
function removeAllChildNodes(parent) {
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                    
                }
            }

//main code start//
//initial data fetch//
function openingFetch(){
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=649')
        .then(response => response.json())
        .then(data => {
            dataset = data;
            const alphaNumOut = [];
            alphaNumOut.push([dataset]);
            newArr = (alphaNumOut[0])
            trueArr = (newArr[0].results)
            loadSidebar(trueArr)
            
        });
    }
    
//closure: initial data fetch//
    openingFetch()
//find types initially//
function getTypes(){
        fetch ("https://pokeapi.co/api/v2/type/")
        .then(data => data.json())
        .then(pie => {
            //** typesAll: type names containing urls//
            let typesAll = pie.results
            typesAll.forEach(ele => {
            typesUrlArr.push(ele.url)
            //** typesUrl: urls going to each individual type//
            typesUrlArr.forEach(mid =>{
            fetch(mid)
            .then(data => data.json())
            .then(it => {
            typesArr.push(it)
                 //**type objects w/ lots of data//
                typesArr.forEach(montype =>{
                //**damageValues: each type w/ double damage, half damage, etc//
                damageValues[montype.name] = montype.damage_relations 

                //**typecheck: each type with all mons and their urls//
                typeCheck[montype.name] = montype.pokemon
        //typecheck end//
     })   
   //typesArr creation end// 
})
  //typesUrl fetch end//
    })
    //typesUrl creation end//
        })
        //initial typefetch end
    })
    //getTypes end//
}
getTypes()

//sidebar start
function loadSidebar(namesArr) {
        namesArr.forEach(mon => {

            let nameLi = document.createElement("li")
            monNames.push(mon.name)
            nameLi.innerHTML = mon.name
            nameLi.addEventListener('click', () => fetchMon(mon))
            monList.appendChild(nameLi)
        })
    //sidebar end
 }

//get mon loaded
// let evolDataset =[]

// let evolFin = []

//  function retrieveEvolution() {
//         fetch ('https://pokeapi.co/api/v2/evolution-chain/?limit=335')
//             .then(data => data.json())
//             .then(p => {
//                 const alphaNumEvol = [];
//                 alphaNumEvol.push([p]);
//                 //let newEvolArr = (alphaNumEvol[0])
//                 evolDataset = [alphaNumEvol[0][0].results]
//                 console.log(evolDataset)
//                 let keyAll = Object.keys(evolDataset)
//                 let keyArr = (evolDataset[keyAll])
//                 keyArr.forEach(k => {
//                     fetch(Object.values(k))
//                     .then(data => data.json())
//                     .then(j => {
//                         evolFin.push(j.chain)
//                         evolFin.forEach(link => 
//                             delete (link.is_baby))
//                         evolFin.forEach(link => 
//                             delete (link.evolution_details))
                        
//                     })
//                 })
//                })                       
        
//            } 

//   retrieveEvolution()
  

        

//featured mon on page fetched; data needed is mon.name or mon.id//
function fetchMon(mon) {
            fetch(monsUrl + `${mon.name}`)
                .then(data => data.json())
                .then(part => renderMon(part))
}

//end fetch of feat mon//

//**event listener set on search bar//
document.getElementById('monLookup').addEventListener('submit', (e) =>{
        e.preventDefault()
        fetch(monsUrl + (document.getElementById('mon').value) + '/')
        .then(data => data.json())
        .then(mon => renderMon(mon))

})

//--render fetched data from pokemon url//
        function renderMon(part){
                    console.log(part.types[0].type.name)
                    monImage = document.getElementById('main-img')
                    monImage.src = "src/pokemon/" + part.id + ".png"
                    let myMonTeam = document.getElementById('my-mons')
                       
                     if (monImage.hasListener == true){removeAllChildNodes(teamDiv)}
                        //typebutton.innerText = 
                  
                    if (monImage.hasListener) ()=> monImage.removeEventListener('click', addToTeam())
         
                    monImage.addEventListener('click', function addToTeam() {
                    let monTeamName = document.createElement('span')
                    let teamImg = document.createElement('img')                 
                        monImage.hasListener = true;
                      
                         
                     monTeamName.innerHTML = `<br>${part.name}<hr>`
                        teamImg.src = "src/pokemon/" + part.id + ".png"
                        teamDiv.append(teamImg)
                        teamDiv.append(monTeamName)
                        teamDiv.append(typesClone)
                    //    
                    })
                       myMonTeam.append(teamDiv) 
                      
                    
                    document.getElementById('mon-id').innerHTML = part.order + ": " + part.name
                    loadDexEntries(part)

//still RenderMon//            //--game appearances load//
                    let allGames = part.game_indices
                    removeAllChildNodes(dexRegions)
                    allGames.forEach(game => {
                        const dexLi = document.createElement("span")
                        dexLi.innerHTML =  game.version.name 
                        dexRegions.appendChild(dexLi)
                        $('<br>').insertBefore(dexLi)
                         //--game appearances load//
                    })

 //still RenderMon//            //--abilities load//
                    let allAbil = part.abilities
                    removeAllChildNodes(abilities)
                    allAbil.forEach(abil => {
                        let ability = document.createElement("span")
                        ability.innerHTML = (abil.ability.name).split('-').join(' ') + (abil.is_hidden ? "(hidden)" : "")
                        abilities.appendChild(ability)
                        $('<br>').insertBefore(ability)
            //--abilities load//
                    })
 //still RenderMon//            //--stats load//
                    if (statList.hasChildNodes) { removeAllChildNodes(statList) }
                    const HP = document.createElement("span")
                    HP.innerHTML = `HP: ${part.stats[0].base_stat}<br>`
                    statList.appendChild(HP)
                    const atk = document.createElement("span")
                    atk.innerHTML = `Attack: ${part.stats[1].base_stat}<br>`
                    statList.appendChild(atk)
                    const def = document.createElement("span")
                    def.innerHTML = `Defense: ${part.stats[2].base_stat}<br>`
                    statList.appendChild(def)
                    const spatk = document.createElement("span")
                    spatk.innerHTML = `Special attack: ${part.stats[3].base_stat}<br>`
                    statList.appendChild(spatk)
                    const spdef = document.createElement("span")
                    spdef.innerHTML = `Special Defense: ${part.stats[4].base_stat}<br>`
                    statList.appendChild(spdef)
                    const speed = document.createElement("span")
                    speed.innerHTML = `Speed: ${part.stats[5].base_stat}<br>`

                    statList.appendChild(speed)
//still RenderMon//                     //***/ bst summation loop
                    var sum = 0;
                    let bst = document.createElement('h6')
                    for (let i = 0; i < 6; i++) {
                        sum += part.stats[i].base_stat;
                    }
                   statList.appendChild(bst)
                    if (sum>500){bst.classList.add("good")
                    bst.innerHTML = ("Base Stat Total(BST):" + `${sum}<br>` + "This pokemon's BST is above average.")}
                     else if ((sum<=500) &&(sum>=400)){bst.classList.add("fine")
                    bst.innerHTML = ("Base Stat Total(BST):" + `${sum}<br>` + "This pokemon's BST is average.")}
                    else if (sum < 400){bst.classList.add("rough")
                    bst.innerHTML = ("Base Stat Total(BST):" + `${sum}<br>` + "This pokemon's BST is below average.")}
                   
//still RenderMon//                     //**/ bst summation loop
//still RenderMon//                    //give feat mon types-two only//   
//start to setelement-relationships//
                     
                    removeAllChildNodes(pkmnType)
                         removeAllChildNodes(weakTypeTo)
                          removeAllChildNodes(weakTypeFrom)
                           removeAllChildNodes(strongTypeTo)
                            removeAllChildNodes(strongTypeFrom)
                       
                    let montypes = part.types
                    montypes.forEach(bit => {
                           monType = document.createElement("button")
                              monType.innerText = bit.type.name
                          
//[can be removed from renderMon if part is defined]//
//[all appending can be pulled out into its own function]//
                        if ((pkmnType.childElementCount < 2) && (Array.from(pkmnType.children) !== Array.from(monType.innerText))) {
                                  
                            pkmnType.appendChild(monType)
                            
                        }
                        typesClone = pkmnType.cloneNode(true)
                           
                         
                            
                           
                 
                          
                           
                        
                        let featTypeDamage = (damageValues[bit.type.name]) 
                            let weakTo = (featTypeDamage.double_damage_from)
                                                         
                                weakTo.forEach(weak =>{
                                  let weakToList = document.createElement('button')  
                                  weakToList.innerHTML = weak.name
                                  weakToList.style.color = 'orange'
                                  weakTypeFrom.appendChild(weakToList)
                                   weaknesses == true
                                   weakToList.addEventListener('click', () => narrowByType(weak.name))
                                 
                                })
                                
                            let strongTo = (featTypeDamage.double_damage_to)
                           
                                strongTo.forEach(strong =>{
                                  let strongToList = document.createElement('button')  
                                 strongToList.innerText = strong.name
                                  strongToList.style.color = 'silver'
                                  strongTypeTo.appendChild(strongToList)
                                   weaknesses == true
                                  strongToList.addEventListener('click', () => narrowByType(strong.name))
                                })
                         
                            let strongAgainst = featTypeDamage.half_damage_from
                              
                                strongAgainst.forEach(strong =>{
                                  let strongAgainstList = document.createElement('button')  
                                 strongAgainstList.innerText = strong.name
                                  strongAgainstList.style.color = 'gold'
                                  strongTypeFrom.appendChild(strongAgainstList)
                                   weaknesses == true
                                   strongAgainstList.addEventListener('click', () => narrowByType(strong.name))
                                })
                     
                            let weakAgainst = (featTypeDamage.half_damage_to)
                                   
                             weakAgainst.forEach(weak =>{
                                  let weakAgainstList = document.createElement('button')  
                                  weakAgainstList.innerText = weak.name
                                  weakAgainstList.style.color = 'red'
                                  weakTypeTo.appendChild(weakAgainstList)
                                   weaknesses == true
                                weakAgainstList.addEventListener('click', () => narrowByType(weak.name))
                             })
//closes montypes for each//
                            })
                   
//render mon end//
}
            
//[can be removed from renderMon if part is defined]//
//[all appending can be pulled out into its own function]//
                       
//loads descriptive dex text//                    
                    function loadDexEntries(pkmn) {
                        fetch("https://pokeapi.co/api/v2/pokemon-species/" + pkmn.name + "/")
                            .then(data => data.json())
                            .then(entry => {
                                let description = document.createElement("span")
                                let descriptionText = document.createElement("area")
                                description.innerText = (entry.genera[7].genus) 
                                descriptionText.innerText = (entry.flavor_text_entries[Math.floor((Math.random() * 10) + 1)].flavor_text)
//generates random number for description pull; appends description, 'the --- pokemon' and breaks//                                
                                monId.appendChild(description)
                                $('<br />').insertBefore(description)
                                monId.appendChild(descriptionText)
                                $('<br />').insertBefore(descriptionText)

                                })

//loads descriptive dex text end//
                            }
//**dropdown creation-- region **/
$(regionChoice).change(function () {
            switch (regionChoice.value) {
                    case 'region':    
                        openingFetch()
                        break;   
                    case 'Kanto':
                        regionNameString = 'Kanto'.toString().toLowerCase();
                        break;
                    case 'Johto':
                        regionNameString = 'Johto'.toString().toLowerCase();
                        break;
                    case 'Hoenn':
                        regionNameString = 'Hoenn'.toString().toLowerCase();
                        break;
                    case 'Sinnoh':
                        regionNameString ='Sinnoh'.toString().toLowerCase();
                        break;
                    case 'Unova':
                        regionNameString = 'Unova'.toString().toLowerCase()
         //closes dropdown switch statement//
        }
//region selection: can be pulled out (carefully)//
    //fetch all dexes
            fetch('https://pokeapi.co/api/v2/pokedex')
                .then(data => data.json())
                .then(boi => {
                        regionArr.push(boi.results)
                        regionArr[0].forEach(region => {
                        let nameOfRegionDex = region.name
            //--generates string of region names//            
                        let nameOfRegion = nameOfRegionDex.split("-").join(" ")
                        let urlOfRegionDex = region.url
            //--compares to selection//
                        if (nameOfRegion.includes(regionNameString)) {
                                fetch(urlOfRegionDex)
                                    .then(data => data.json())
                                    .then(piece => {
                                    removeAllChildNodes(monList)
                                    let course = piece.pokemon_entries
                                            courseArr.push(course)
                                            let entryList = courseArr[0]
             //--generates string of all mon names//  
                                            let monString = monNames.toString()
                                            entryList.forEach(pkmn => {
                                                let pkmnAll = (pkmn.pokemon_species.name)
        //--generates string of all mon names within region// 
                                                let nameString = (pkmnAll).toString()
                        //--keeps only relevant names to append//
                                                if (monString.includes(nameString)) {
                                                    let nameLiNew = document.createElement('li')
                                                    nameLiNew.innerHTML = pkmnAll
                                                    nameLiNew.addEventListener('click', () => fetchMon(pkmn.pokemon_species))
                                                    if ((monList.childElementCount < entryList.length) && ((Array.from(monList.children) !== (Array.from(nameLiNew.innerHTML))))) {
                                                         monList.appendChild(nameLiNew)
                                                         nameLiNew.hasEvent = false
                                                         //end of third if statement//
                                                                    }
                                                    //end of second if statement//
                                                                }
                                                            })
                                                        })
                                //end of first if statement//
                                                }
                    //end of regionArr[0].forEach//
                                            })
                //ends use of dex fetch data//
                                        })
//**dropdown creation-- region end//
                            })              
//**dropdown creation-- type//
function narrowByType(typeName) {
    removeAllChildNodes(monList)
                    let pkmnOfType = typeCheck[typeName]
                    pkmnOfType.forEach(mon => { 
                        let nameLiNew = document.createElement('li')
                        nameLiNew.innerHTML = mon.pokemon.name
                        nameLiNew.addEventListener('click', () => fetchMon(mon.pokemon))                               
                        monList.append(nameLiNew)        
                                                
})}
 $(typeChoice).change(function () {

        switch (typeChoice.value) {
            case 'type':
                openingFetch();
                break;
             case "normal":
                typeName = "normal"
                break;
            case "fire":
                typeName  = "fire"
                break;
            case "water":
                typeName  = "water"
                break;
            case "grass":
                typeName = "grass"
                break;
            case "electric":
                typeName  = "electric"
                break;
            case "ice":
                typeName = "ice"
                break;
            case "fighting":
                typeName  = "fighting"
                break;
            case "poison":
                typeName  = "poison"
                break;
            case "ground":
                typeName = "ground"
                break;
            case "flying":
                typeName  = "flying"
                break;                                        
            case "psychic":
                typeName  = "psychic"
                break;
            case "bug":
                typeName  = "bug"
                break;
            case "rock":
                typeName = "rock"
                break;
            case "ghost":
                typeName  = "ghost"
                break;
            case "dark":
                typeName  = "dark"
                break;
            case "dragon":
                typeName  = "dragon"
                break;
            case "steel":
                typeName = "steel"
                break;
            case "fairy":
                typeName  = "fairy"
            //end of type switch statement
            }
            //redoes sidebar
            narrowByType(typeName)

    //end of type dropdown//
    });
    

//end of doc ready//
  })  
