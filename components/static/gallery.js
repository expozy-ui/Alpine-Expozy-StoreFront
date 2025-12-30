

export let Gallery = {

    open: async function (dataCollect) {
        let response = {
            empty: 1
        };
        if (dataCollect.combinedData.images.length == 0 || dataCollect.combinedData.images == undefined) return response;

        let galleryHtml = `
    
            <div   style="z-index:100000; top:0px;left:0px; position:fixed; width:100%;height:100%; background-color:#373737f7; padding:50px;position:fixed;">
                   <div  style="width:100%;height:100%;">
                     <button  class="" style="position:absolute; top:20px; right:50px;"> <i id="closeGallery" class="fa-solid fa-circle-xmark text-white text-[26px]" style="font-size:26px;"></i></button>
            
                     <div  id="gallerySlider" class="glide" >
                       <div class="glide__track" data-glide-el="track">
                         <ul class="glide__slides">
                          
                           `;


        for (const img of dataCollect.combinedData.images) {
            let imgUrl = img.url != '' ? img.url : Helpers.image('product');

            galleryHtml += `<li><img src="${imgUrl}" alt="" class="w-full h-full " style="object-fit: contain;"></li>`;
        }




        galleryHtml += `
                    </ul>
        
                </div>
                <div class="glide__arrows" data-glide-el="controls"><button class="glide__arrow glide__arrow--left" data-glide-dir="<"><svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>
                        </svg></button><button class="glide__arrow glide__arrow--right" data-glide-dir=">"><svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                        </svg></button></div>
                </div>
        
        
                </div>
            </div>
                `;


        let container = document.getElementById('galleryContainer');

        // Ако го няма → създаваме го и го добавяме в body
        if (!container) {
            container = document.createElement('div');
            container.id = 'galleryContainer';
            document.body.appendChild(container);
        }

        // Слагаме съдържанието вътре
        container.innerHTML = galleryHtml;

        container.addEventListener("click", function (event) {

            if (event.target.id === "closeGallery") {
                document.getElementById('galleryContainer').innerHTML = '';
            }
        });


        setTimeout(function () {
            new Glide('#gallerySlider', {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                focus: 1,
                autoplay: false,
                animationDuration: 1000,
                arrow: true,
                dots: false,
            }).mount();
        }, 100);

        return response;

    },




};
window.Gallery = Gallery;



