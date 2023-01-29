import {allItems} from "./data.js";

let inCartItemsArray=[]

const itemsList=document.querySelector(".items-list")
const inCartItemsList=document.querySelector(".in-cart-items-list")
const total=document.querySelector(".total")
const cartIcon=document.querySelector(".cart-icon")
const cartIconCount=document.querySelector(".cart-icon-count")
console.log(inCartItemsList.childNodes[1]);
inCartItemsList.childNodes[1].childNodes[3].addEventListener("click",()=>{
    
    inCartItemsList.style.transform = "translateY(-110%)";
    inCartItemsList.style.transition = "transform 0.5s";
})
cartIcon.addEventListener("click",()=>{
    inCartItemsList.style.transform = "translateY(50px)";
    inCartItemsList.style.transition="transform 0.5s"

})
function updateCartIconCount(){
    cartIconCount.innerText=inCartItemsArray.length
}
function addItemToList(card,item,addToCartBtn){
    const inCartItem=document.createElement("li")
    inCartItem.className="inCartItem"
    const img=document.createElement("img")
    img.src=item.img
    const name=document.createElement("p")
    name.innerText=item.name
    const price=document.createElement("p")
    price.innerText=item.price
    const count=document.createElement("input")
    count.type="number"
    count.value=item.count
    count.oninput=()=>{
        item.count=count.value
        singleTotal.innerText=computeSingleTotal(item)
        updateTotal()
        card.childNodes[1].childNodes[2].childNodes[1].innerText=item.count
        

    }
    const singleTotal =document.createElement("p")
    singleTotal.innerText=`${item.count * item.price}`
    const remove=document.createElement("button")
    remove.classList="material-symbols-outlined delete"
    remove.innerText="delete"
    remove.onclick=()=>{
        
        inCartItem.remove()
        card.childNodes[1].replaceChild(addToCartBtn,card.childNodes[1].childNodes[2])
        inCartItemsArray=inCartItemsArray.filter((inCartItem)=>{
            return item.name !== inCartItem.name
        })
        updateTotal()
        updateCartIconCount()

        
    }
    inCartItem.append(img,name,price,count,singleTotal,remove)
    inCartItemsList.append(inCartItem)
    console.log(computeTotal());
    updateTotal()
    updateCartIconCount()
    return inCartItem
}
function updateTotal(){
    total.innerText=computeTotal()
}
function computeTotal(){
    return inCartItemsArray.reduce((total,item)=>{
        return total +=item.count * item.price
    },0)
}
function computeSingleTotal(item){
    return item.price * item.count
}
function addCounter(card,item,inCartItem){
    const counter=document.createElement("section")
    counter.className="counter"
    const label = document.createElement("label");
    label.innerText = item.count;
    const incBtn=document.createElement("button")
    incBtn.innerText="+"
    incBtn.addEventListener("click",()=>{
        incCount(label,item,inCartItem)
    })
    const decBtn=document.createElement("button")
    decBtn.innerText="-"
    decBtn.addEventListener("click", () => {
      decCount(label, item, inCartItem);
    });

    counter.append(incBtn,label,decBtn)
    card.childNodes[1].append(counter)


    
}
function incCount(label,item,inCartItem){
    item.count++
    label.innerText=item.count
    inCartItem.childNodes[3].value=item.count
    inCartItem.childNodes[4].innerText=computeSingleTotal(item)
    total.innerText=computeTotal()

}
function decCount(label, item, inCartItem) {
  item.count--
  label.innerText = item.count;
  inCartItem.childNodes[3].value = item.count;
  inCartItem.childNodes[4].innerText = computeSingleTotal(item);
  total.innerText = computeTotal();
}
allItems.forEach((item)=>{
    const card=document.createElement("li")
    card.className="item"
    const img=document.createElement("img")
    img.src=item.img
    const info=document.createElement("div")
    const name=document.createElement("p")
    name.innerText=item.name
    const price=document.createElement("p")
    price.innerText=`Rs.${item.price}`
    const addToCartBtn=document.createElement("button")
    addToCartBtn.addEventListener("click",()=>{
        const exists=inCartItemsArray.find((inCartItem)=>{
            return item.name === inCartItem.name
        })
        if(exists) return
        let itemWithCount={...item,count:1}
        inCartItemsArray.push(itemWithCount)
        const inCartItem=addItemToList(card,itemWithCount,addToCartBtn)
        addCounter(card, itemWithCount, inCartItem);
        addToCartBtn.remove()
        
        
    })
    addToCartBtn.innerText="Add to Cart"
    info.append(name,price,addToCartBtn)
    card.append(img,info)
    itemsList.append(card)
})
