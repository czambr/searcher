let loadProducts = (URL) => {
    let productJson = `${URL}.json`;
    let viewProducts = document.getElementById('template_products');
    fetch( productJson )
    .then(response => response.json() )
    .then(result => {
        result.forEach(element => {
            let template = `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                                    <div class="card card-blog card-plain">
                                    <div class="card-header p-0 mt-n4 mx-3">
                                        <a class="d-block shadow-xl border-radius-xl">
                                        <img src="${element.src}" alt="${element.name}" class="img-fluid shadow border-radius-xl">
                                        </a>
                                    </div>
                                    <div class="card-body p-3">
                                        <p class="mb-0 text-sm">${element.type}</p>
                                        <a href="javascript:;">
                                        <h5>
                                            ${element.name}
                                        </h5>
                                        </a>
                                        <p class="mb-4 text-sm">
                                        <b>Price: </b> $ ${element.price}
                                        </p>
                                    </div>
                                    </div>
                                </div>`;
            viewProducts.innerHTML += template;
        });
    })
    .catch(error => {
      console.log( error );
    });

    let productXML = `${URL}.xml`;
    fetch( productXML )
    .then(response => response.text() )
    .then(result => {
        let xml = (new DOMParser()).parseFromString(result, 'application/xml');
        let arrayProducts = [...xml.getElementsByTagName('product')];       
        arrayProducts.forEach(product => {
            let src = product.getElementsByTagName("src")[0].innerHTML;
            let name = product.getElementsByTagName("name")[0].innerHTML;
            let type = product.getElementsByTagName("type")[0].innerHTML;
            let price = product.getElementsByTagName("price")[0].innerHTML;           
            let template = `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                                    <div class="card card-blog card-plain">
                                    <div class="card-header p-0 mt-n4 mx-3">
                                        <a class="d-block shadow-xl border-radius-xl">
                                        <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                                        </a>
                                    </div>
                                    <div class="card-body p-3">
                                        <p class="mb-0 text-sm">${type}</p>
                                        <a href="javascript:;">
                                        <h5>
                                            ${name}
                                        </h5>
                                        </a>
                                        <p class="mb-4 text-sm">
                                        <b>Price: </b> $ ${price}
                                        </p>
                                    </div>
                                    </div>
                                </div>`;
            viewProducts.innerHTML += template;
        });
    })
    .catch(error => {
      console.log( error );
    });
};


let urlProducts = 'https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products';

loadProducts(urlProducts);