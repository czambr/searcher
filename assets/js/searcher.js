// ---------------------------------------------------------------------------------------------
//  JSON: Obtenemos los productos desde un objeto JSON.
//       Se cargan en la plantilla HTML y se retorna a un arreglo con los productos contenidos.
// ---------------------------------------------------------------------------------------------
async function getObjectJson(
    URL = "https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json",
    viewProducts
) {
    try {
        let listaProductos = [];
        const respuesta = await fetch(URL);
        const data = await respuesta.json();
        listaProductos = [...listaProductos, ...data];
        data.forEach(({ src, name, type, price }) => {
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
        return listaProductos;
    } catch (error) {
        console.log("Error al obtener data JSON", error);
    }
}


// ---------------------------------------------------------------------------------------------
//  XML: Obtenemos los productos desde un objeto XML.
//       Se cargan en la plantilla HTML y se retorna a un arreglo con los productos contenidos.
// ---------------------------------------------------------------------------------------------
async function getObjectXml(
    URL = "https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.xml",
    viewProducts
) {
    try {
        let listaProductos = [];
        const respuesta = await fetch(URL);
        const xml = await respuesta.text();
        const data = new DOMParser().parseFromString(xml, "application/xml");
        let arrayProducts = [...data.getElementsByTagName("product")];
        arrayProducts.forEach((product) => {
            let name = product.getElementsByTagName("name")[0].innerHTML;
            let price = product.getElementsByTagName("price")[0].innerHTML;
            let src = product.getElementsByTagName("src")[0].innerHTML;
            let type = product.getElementsByTagName("type")[0].innerHTML;
            listaProductos = [...listaProductos,
                {
                    name,
                    price,
                    src,
                    type,
                }
            ];
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
        return listaProductos;
    } catch (error) {
        console.log("Error al obtener data XML", error);
    }
}

// ---------------------------------------------------------------------------------------------
//  Llama a las funciones getObjectJson y getObjectXml
//  Junta todos los productos en un solo arreglo general.
// ---------------------------------------------------------------------------------------------
let loadProducts = async (URL) => {
    let listaProductos = [];
    let viewProducts = document.getElementById("template_products");

    // JSON
    let UrlProductJson = `${URL}.json`;
    listaProductos = [...listaProductos,...(await getObjectJson(UrlProductJson, viewProducts))];

    // XML
    let UrlProductXML = `${URL}.xml`;
    listaProductos = [...listaProductos,...(await getObjectXml(UrlProductXML, viewProducts))];

    return listaProductos;
};

// ---------------------------------------------------------------------------------------------
// Se filtran los productos buscados por el usuario
// La busqueda se realiza por: name o type
// ---------------------------------------------------------------------------------------------
let filterProducts = (productName, arrayProducts) => {
    let searcher = arrayProducts.filter((el) =>
        el.name.toLowerCase().includes(productName.toLowerCase())
    );
    searcher =
        searcher.length != 0
            ? searcher
            : arrayProducts.filter((el) =>
                  el.type.toLowerCase().includes(productName.toLowerCase())
              );
    return searcher;
};

let getProduct = (array) => {
    let productSearched = document.getElementById("text").value;
    let productsFound = filterProducts(productSearched, array);
    // Visualizar producto filtrado console.log("Producto Filtrado:", productsFound);
    return productsFound;
};

// ---------------------------------------------------------------------------------------------
// Se muestran los productos que el usuario busca
// La busqueda se realiza por: name o type
// ---------------------------------------------------------------------------------------------
let displayProduct = (arrayProd) => {
    let viewProducts = document.getElementById("template_products");
    if (arrayProd.length == 0) {
        viewProducts.innerHTML = `<div class="col-xl-12 col-md-6 mb-xl-0 mb-4 mt-4"
                                       style="text-align: center"> 
                                       Sorry, we don't have this product yet
                                  </div>`;
    } else {
        viewProducts.innerHTML = " ";
        arrayProd.forEach(({ src, name, type, price }) => {
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
    };
};




// ---------------------------------------------------------------------------------------------
//  Funcion asincrona principal
// ---------------------------------------------------------------------------------------------

let loadPage = async () => {
    try {
        let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products";
        let arrayProducts = await loadProducts(URL);
        let button = document.getElementById("filter");

        button.addEventListener("click", () => {
            let productView = getProduct(arrayProducts);
            displayProduct(productView);
        });
    } catch (error) {
        console.log("Error al cargar pagina", error);
    }
};

loadPage();


