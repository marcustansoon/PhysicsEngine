
var productIds = [
    "io.cocoon.yourproduct1",
    "io.cocoon.yourproduct2"
];

function main() {
   inAppPurchase
  .getProducts(productIds)
  .then(function (products) {
    alert(JSON.stringify(products));
    /*
       [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', currency: '...', price: '...', priceAsDecimal: '...' }, ...]
    */
       
        inAppPurchase
      .buy(productIds[0])
      .then(function (data) {
        alert(JSON.stringify(data));
            //when purphase is complete
        /*
          {
            transactionId: ...
            receipt: ...
            signature: ...
          }
        */
               inAppPurchase
              .getReceipt()
              .then(function (receipt) {
                alert('receipt',JSON.stringify(receipt));
              })
              .catch(function (err) {
                alert(JSON.stringify(err));
              });
            
            
             div.innerHTML=JSON.stringify(data);
          alert('returning',inAppPurchase.consume(data.productType, data.receipt, data.signature));//consume the purchased product, allow repurchase
           
      })
      .then(function () {
        alert('product was successfully consumed!');
      })
      .catch(function (err) {
        alert(JSON.stringify(err));
      });   
  })
  .catch(function (err) {
   alert('err', JSON.stringify(err) );
  });
    
    
    let div = document.createElement('div');
    div.id='test';
    document.body.appendChild(div);
    div.style.left = "0px";
        div.style.top = "0px";
        div.style.position = "absolute";
    /*
    
   let script = document.createElement('script');
    script.src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.2/pixi.min.js";
    document.body.appendChild(script);
    script.onload=function(){
        alert('loaded');
    	let renderer = new PIXI.autoDetectRenderer(250,250);
        document.body.appendChild(renderer.view);
        renderer.view.style.left = "0px";
        renderer.view.style.top = "0px";
        renderer.view.style.position = "absolute";
    } 
    */
}

document.addEventListener('deviceready', main, false);





