var data_templates = {
    name: 'Simple Start',
    categories: [
        { id: 1, name: 'Basic' }, 
        { id: 2, name: 'Slider' }, 
        { id: 3, name: 'Video' }, 
        { id: 5, name: 'Plugins' }, 
        { id: 6, name: 'Legacy' }, 
    ],
    designs: [

        {
		    'thumbnail': 'preview/plugin-slider1.png',
		    'category': '2,5',
		    'html': `
<div class="is-section is-box is-light-text is-section-100 type-system-ui">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="fullscreen-slider" data-cb-loading="fade" style="--transition-speed: 2200ms; --zoom-scale: 1.06; --overlay-opacity: 0.25;" data-cb-autoplay-duration="5000" data-cb-transition-speed="2200" data-cb-enable-keyboard="true" data-cb-pause-on-hover="false" data-cb-show-counter="true" data-cb-show-nav-buttons="true" data-cb-show-pagination="true" data-cb-show-keyboard-hint="true" data-cb-zoom-effect="true" data-cb-zoom-scale="106" data-cb-overlay-opacity="25">
                <div class="media-overlay"></div>
                <div class="media-slide">
                    <div class="media-slide-inner">
                        <img src="[%IMAGE_PATH%]images/ai-RVMvr.jpg" alt="Mountain view">
                    </div>
                </div>
                <div class="media-slide">
                    <div class="media-slide-inner">
                        <img src="[%IMAGE_PATH%]images/ai-Dv3Cv.jpg" alt="Technology">
                    </div>
                </div>
                <div class="media-slide">
                    <div class="media-slide-inner">
                        <img src="[%IMAGE_PATH%]images/ai-2ANoV.jpg" alt="People working">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-container v2 leading-13 size-17 v3 is-content-820">
        <div class="row">
            <div class="column full">
                <p class="text-center size-12 uppercase tracking-250">Branding &amp; Digital Marketing</p>
            </div>
        </div>
        <div class="row">
            <div class="column full">
                <h1 class="leading-none font-semibold text-center size-50">We've put together a special combination of design, strategy, and digital expertise.</h1>
            </div>
        </div>
        <div class="row">
            <div class="column full">
                <div class="spacer height-20"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <p class="text-center">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type.</p>
                <div class="spacer height-40"></div>
                <div class="text-center">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="#fff" data-hover-bg="rgba(248, 248, 250, 1)">Start a Project</a>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},
        {
		    'thumbnail': 'preview/plugin-slider2.png',
		    'category': '2,5',
		    'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-dark-text box-autofit is-box-6">
        <div class="is-overlay"></div>
        <div class="is-container v2 leading-13 size-17 v3 is-content-700">
            <div class="row">
                <div class="column full">
                    <p class="size-12 uppercase tracking-250">Branding &amp; Digital Marketing</p>
                </div>
            </div>
            <div class="row">
                <div class="column full">
                    <h1 class="leading-none text-left font-semibold size-48">We've put together a special combination of design, strategy, and digital expertise.</h1>
                </div>
            </div>
            <div class="row">
                <div class="column full">
                    <div class="spacer height-20"></div>
                </div>
            </div>
            <div class="row">
                <div class="column" style="width: 69.9367%; flex: 0 0 auto;">
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type.</p>
                    <div class="spacer height-20"></div>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-current hover:border-current">Start a Project</a>
                    </div>
                </div>
                <div class="column">
                    <div class="spacer height-80"></div>
                </div>
            </div>

        </div>
    </div>
    <div class="is-box is-align-left is-light-text is-content-top box-autofit min-height-60 is-box-6">
        <div class="is-overlay">
            <div class="is-overlay-content">
                <div data-cb-type="fullscreen-slider" data-cb-loading="fade" style="--transition-speed: 2200ms; --zoom-scale: 1.06; --overlay-opacity: 0.2;" data-cb-autoplay-duration="5000" data-cb-transition-speed="2200" data-cb-enable-keyboard="true" data-cb-pause-on-hover="false" data-cb-show-counter="true" data-cb-show-nav-buttons="true" data-cb-show-pagination="true" data-cb-show-keyboard-hint="true" data-cb-zoom-effect="true" data-cb-zoom-scale="106" data-cb-overlay-opacity="20" data-cb-text-position="position-center-left">
                    <div class="media-overlay"></div>
                    <div class="media-slide">
                        <div class="media-slide-inner">
                            <img src="[%IMAGE_PATH%]images/ai-RVMvr.jpg" alt="Mountain view">
                        </div>
                    </div>
                    <div class="media-slide">
                        <div class="media-slide-inner">
                            <img src="[%IMAGE_PATH%]images/ai-Dv3Cv.jpg" alt="Technology">
                        </div>
                    </div>
                    <div class="media-slide">
                        <div class="media-slide-inner">
                            <img src="[%IMAGE_PATH%]images/ai-2ANoV.jpg" alt="People working">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

        {
		    'thumbnail': 'preview/plugin-slider3.png',
		    'category': '2,5',
		    'html': `
<div class="is-section is-box is-section-100 is-light-text type-system-ui">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="fullscreen-slider" data-cb-loading="fade" style="--transition-speed: 2200ms; --zoom-scale: 1.06; --overlay-opacity: 0.2;" data-cb-autoplay-duration="5000" data-cb-transition-speed="2200" data-cb-enable-keyboard="true" data-cb-pause-on-hover="false" data-cb-show-counter="true" data-cb-show-nav-buttons="true" data-cb-show-pagination="true" data-cb-show-keyboard-hint="true" data-cb-zoom-effect="true" data-cb-zoom-scale="106" data-cb-overlay-opacity="20" data-cb-text-position="position-center">
                <div class="media-overlay"></div>
                <div class="media-slide">
                    <div class="media-slide-inner">
                        <img src="[%IMAGE_PATH%]images/ai-RVMvr.jpg" alt="Mountain view">
                    </div>
                    <div class="item-content position-center is-container">
                        <div class="is-subblock edit">
                            <p class="uppercase tracking-225 size-12">New Collection</p>
                            <h2>Discover Timeless Elegance</h2>
                            <p>Experience the perfect blend of minimalist design and exceptional craftsmanship in our latest collection.</p>
                            <div>
                                <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="#fff" data-hover-bg="rgba(248, 248, 250, 1)">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="media-slide">
                    <div class="media-slide-inner">
                        <img src="[%IMAGE_PATH%]images/ai-Dv3Cv.jpg" alt="Technology">
                    </div>
                    <div class="item-content position-center is-container">
                        <div class="is-subblock edit">
                            <p class="uppercase tracking-225 size-12">Spring 2024</p>
                            <h2>Nature Inspired Design</h2>
                            <p>Crafted with care, designed for life. Our sustainable approach brings nature into your everyday.</p>
                            <div>
                                <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="#fff" data-hover-bg="rgba(248, 248, 250, 1)">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="media-slide">
                    <div class="media-slide-inner">
                        <img src="[%IMAGE_PATH%]images/ai-2ANoV.jpg" alt="People working">
                    </div>
                    <div class="item-content position-center is-container">
                        <div class="is-subblock edit">
                            <p class="uppercase tracking-225 size-12">Limited Edition</p>
                            <h2>The Art of Simplicity</h2>
                            <p>Where form meets function. Every detail considered, nothing unnecessary.</p>
                            <div>
                                <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="#fff" data-hover-bg="rgba(248, 248, 250, 1)">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

        {
		    'thumbnail': 'preview/plugin-slider4.png',
		    'category': '2,5',
		    'html': `
<div class="is-section is-box is-section-100 is-light-text type-system-ui">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="swiper-slider" class="slider-fullscreen zoom-effect" data-cb-loading="fade" data-cb-effect="slide" data-cb-aspect-ratio="16/9" data-cb-autoplay="true" data-cb-loop="true" data-cb-slides-per-view="1" data-cb-speed="800" data-cb-space-between="0" data-cb-navigation="true" data-cb-pagination="true" data-cb-delay="5000" data-cb-text-position="position-bottom-left" style="--top-overlay-opacity: 0.1; --bottom-overlay-opacity: 0.4; --aspect-ratio: 16/9; --border-radius: 0px; --swiper-navigation-border-radius: 50%; --zoom-scale: 1.08; --swiper-navigation-size: 60px; --swiper-navigation-font-size: 19px; --swiper-navigation-sides-offset: 60px; --text-max-width: 700px;" data-cb-top-overlay-opacity="0.1" data-cb-bottom-overlay-opacity="0.4" data-cb-transition-speed="800" data-cb-navigation-style="transparent" data-cb-pagination-style="rounded-rectangle" data-cb-rounded-corners="0" data-cb-navigation-rounded-corners="50" data-cb-zoom-scale="108" data-cb-zoom-effect="true" data-cb-pause-on-hover="false" data-cb-navigation-button-size="60" data-cb-navigation-arrow-size="19" data-cb-navigation-offset="60" data-cb-text-max-width="700">
                <div class="swiper">
                    <div class="swiper-wrapper">

                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-vgXcr.jpg" alt="Slide">
                                <div class="slide-overlay"></div>
                                <div class="slide-caption is-container v3">
                                    <div class="is-subblock edit">
                                        <p class="uppercase tracking-225 size-12">Limited Edition</p>
                                        <h2>The Art of Simplicity</h2>
                                        <p>Where form meets function. Every detail considered, nothing unnecessary.</p>
                                        <div>
                                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="#fff" data-hover-bg="rgba(248, 248, 250, 1)">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-q8xtk.jpg" alt="Slide">
                                <div class="slide-overlay"></div>
                                <div class="slide-caption is-container v3">
                                    <div class="is-subblock edit">
                                        <p class="uppercase tracking-225 size-12">New Collection</p>
                                        <h2>Discover Timeless Elegance</h2>
                                        <p>Experience the perfect blend of minimalist design and exceptional craftsmanship in our latest collection.</p>
                                        <div>
                                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="#fff" data-hover-bg="rgba(248, 248, 250, 1)">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-yld0M.jpg" alt="Slide">
                                <div class="slide-overlay"></div>
                                <div class="slide-caption is-container v3">
                                    <div class="is-subblock edit">
                                        <p class="uppercase tracking-225 size-12">Spring 2024</p>
                                        <h2 class="">Nature Inspired Design</h2>
                                        <p>Crafted with care, designed for life. Our sustainable approach brings nature into your everyday.</p>
                                        <div>
                                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="#fff" data-hover-bg="rgba(248, 248, 250, 1)">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},
        {
		    'thumbnail': 'preview/plugin-slider5.png',
		    'category': '2,5',
		    'html': `
<div class="is-section is-box is-light-text type-system-ui box-space is-section-50 box-space-xxs">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="swiper-slider" class="slider-fullscreen" data-cb-loading="fade" data-cb-effect="slide" data-cb-aspect-ratio="1/1" data-cb-autoplay="true" data-cb-loop="true" data-cb-slides-per-view="3" data-cb-speed="800" data-cb-space-between="15" data-cb-navigation="true" data-cb-pagination="true" data-cb-delay="3000" data-cb-text-position="position-center" style="--top-overlay-opacity: 0; --bottom-overlay-opacity: 0; --aspect-ratio: 1/1; --border-radius: 11px; --swiper-navigation-border-radius: 50%; --zoom-scale: 1.08; --swiper-navigation-size: 48px; --swiper-navigation-font-size: 16px; --swiper-navigation-sides-offset: 20px;" data-cb-top-overlay-opacity="0" data-cb-bottom-overlay-opacity="0" data-cb-transition-speed="600" data-cb-navigation-style="solid" data-cb-pagination-style="rounded-rectangle" data-cb-rounded-corners="11" data-cb-navigation-rounded-corners="50" data-cb-zoom-scale="108" data-cb-zoom-effect="false" data-cb-pause-on-hover="true" data-cb-navigation-button-size="48" data-cb-navigation-arrow-size="16" data-cb-navigation-offset="20">
                <div class="swiper">
                    <div class="swiper-wrapper">

                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-4fmmL.jpg" alt="New Slide">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-mQEub.jpg" alt="New Slide">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-0gZN7.jpg" alt="New Slide">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-eEG7M.jpg" alt="New Slide">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-Pehly.jpg" alt="New Slide">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="slide-image">
                                <img src="[%IMAGE_PATH%]images/ai-pILjo.jpg" alt="New Slide">
                            </div>
                        </div>

                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

        {
		    'thumbnail': 'preview/video-02.webp',
		    'category': '3,5',
		    'html': `
<div class="is-section is-box is-light-text is-section-100 type-poppins">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="video-background" data-cb-loading="none" data-cb-autoplay="true" data-cb-loop="true" data-cb-muted="true" data-cb-plays-inline="true" data-cb-show-overlay="true" data-cb-overlay-opacity="20" data-cb-overlay-color="#000000" data-cb-show-controls="true" data-cb-controls-position="bottom-right">
                <div class="video-bg-wrapper">
                    <video>
                        <source src="[%IMAGE_PATH%]videos/ai-DIhYA.mp4" type="video/mp4">
                    </video>
                    <div class="video-bg-overlay"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-container v2 leading-13 size-17 v3 is-content-940">
        <div class="row">
            <div class="column">
                <h1 class="text-center font-normal leading-11 size-72">We Create Simple and Effective Designs</h1>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-20"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="text-center button-group">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-7 font-normal leading-14 border-transparent rounded-full tracking-wide hover:border-transparent" title="" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Our Works</a>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-7 font-normal leading-14 border-transparent rounded-full tracking-wide hover:border-transparent" title="" style="color: rgb(255, 255, 255); background-color: rgb(255, 127, 0);">Get in Touch</a>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},
        {
		    'thumbnail': 'preview/video-03.webp',
		    'category': '3,5',
		    'html': `
<div class="is-section is-section-100 type-poppins">
    <div class="is-box-6 is-box is-dark-text box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container v2 size-17 leading-13 is-content-620">
            <div class="row">
                <div class="column">
                    <h1 class="font-normal leading-11 text-left size-72">We Create Simple and Effective Designs</h1>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="button-group text-left">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-6 is-box is-light-text box-autofit min-height-50">
        <div class="is-overlay">
            <div class="is-overlay-content">
                <div data-cb-type="video-background" data-cb-loading="none" data-cb-autoplay="true" data-cb-loop="true" data-cb-muted="true" data-cb-plays-inline="true" data-cb-show-overlay="false" data-cb-overlay-opacity="20" data-cb-overlay-color="#000000" data-cb-show-controls="true" data-cb-controls-position="bottom-right">
                    <div class="video-bg-wrapper">
                        <video>
                            <source src="[%IMAGE_PATH%]videos/ai-thhyR.mp4" type="video/mp4">
                        </video>
                        <div class="video-bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},
        {
		    'thumbnail': 'preview/video-04.webp',
		    'category': '3,5',
		    'html': `
<div class="is-section is-section-100 type-poppins">
    <div class="is-box-6 is-box is-light-text box-autofit min-height-50">
        <div class="is-overlay">
            <div class="is-overlay-content">
                <div data-cb-type="video-background" data-cb-loading="none" data-cb-autoplay="true" data-cb-loop="true" data-cb-muted="true" data-cb-plays-inline="true" data-cb-show-overlay="false" data-cb-overlay-opacity="20" data-cb-overlay-color="#000000" data-cb-show-controls="true" data-cb-controls-position="bottom-right">
                    <div class="video-bg-wrapper">
                        <video>
                            <source src="[%IMAGE_PATH%]videos/ai-xuSq2.mp4" type="video/mp4">
                        </video>
                        <div class="video-bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-6 is-box is-dark-text box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container v2 size-17 leading-13 is-content-620">
            <div class="row">
                <div class="column">
                    <h1 class="font-normal leading-11 text-left size-72">We Create Simple and Effective Designs</h1>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="button-group text-left">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

        {
		    'thumbnail': 'preview/video-05.webp',
		    'category': '3,5',
		    'html': `
<div class="is-section type-poppins is-section-80">
    <div class="is-box-6 is-box is-dark-text box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container v2 size-17 leading-13 is-content-500">
            <div class="row">
                <div class="column" style="min-height: 54px;">
                    <h3 class="font-light text-center">Item Two</h3>
                    <p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div class="text-center button-group">
                        <a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 mt-1 uppercase py-2 px-8 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-125 size-13" style="background-color: rgb(240, 240, 240);">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-6 is-box is-light-text box-autofit min-height-50">
        <div class="is-overlay">
            <div class="is-overlay-content">
                <div data-cb-type="video-background" data-cb-loading="none" data-cb-autoplay="true" data-cb-loop="true" data-cb-muted="true" data-cb-plays-inline="true" data-cb-show-overlay="true" data-cb-overlay-opacity="20" data-cb-overlay-color="#000000" data-cb-show-controls="true" data-cb-controls-position="bottom-right">
                    <div class="video-bg-wrapper">
                        <video>
                            <source src="[%IMAGE_PATH%]videos/ai-EZe2u.mp4" type="video/mp4">
                        </video>
                        <div class="video-bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="is-container v2 size-17 leading-13 is-content-500">
            <div class="row">
                <div class="column" style="min-height: 54px;">
                    <h3 class="font-light text-center">Item One</h3>
                    <p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div class="text-center button-group">
                        <a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 py-2 px-8 font-normal leading-relaxed border-transparent rounded-full ml-0 mt-1 tracking-125 hover:border-transparent uppercase size-13" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},        
        {
		    'thumbnail': 'preview/video-06.webp',
		    'category': '3,5',
		    'html': `
<div class="is-section type-poppins is-section-80">
    <div class="is-box-6 is-box is-light-text box-autofit min-height-50">
        <div class="is-overlay">
            <div class="is-overlay-content">
                <div data-cb-type="video-background" data-cb-loading="none" data-cb-autoplay="true" data-cb-loop="true" data-cb-muted="true" data-cb-plays-inline="true" data-cb-show-overlay="true" data-cb-overlay-opacity="20" data-cb-overlay-color="#000000" data-cb-show-controls="true" data-cb-controls-position="bottom-right">
                    <div class="video-bg-wrapper">
                        <video>
                            <source src="[%IMAGE_PATH%]videos/ai-qJYAE.mp4" type="video/mp4">
                        </video>
                        <div class="video-bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="is-container v2 size-17 leading-13 is-content-500">
            <div class="row">
                <div class="column" style="min-height: 54px;">
                    <h3 class="font-light text-center">Item One</h3>
                    <p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div class="text-center button-group">
                        <a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 py-2 px-8 font-normal leading-relaxed border-transparent rounded-full ml-0 mt-1 tracking-125 hover:border-transparent uppercase size-13" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-6 is-box is-dark-text box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container v2 size-17 leading-13 is-content-500">
            <div class="row">
                <div class="column" style="min-height: 54px;">
                    <h3 class="font-light text-center">Item Two</h3>
                    <p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div class="text-center button-group">
                        <a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 mt-1 uppercase py-2 px-8 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-125 size-13" style="background-color: rgb(240, 240, 240);">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

        {
		    'thumbnail': 'preview/plugin-sticky-category.png',
		    'category': '5',
		    'html': `
<div class="is-section is-box type-system-ui is-section-auto" style="position: sticky; height: 70px; top: 0px; z-index: 1;">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="sticky-category-nav" role="navigation" aria-label="Category navigation">
                <div class="category-nav-container" role="list">
                    <ul class="category-nav-list">
                        <li role="listitem"><a href="#category1">Category 1</a></li>
                        <li role="listitem"><a href="#category2">Category 2</a></li>
                        <li role="listitem"><a href="#category3">Category 3</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

        {
		    'thumbnail': 'preview/plugin-gradient-blobs1.png',
		    'category': '5',
		    'html': `
<div class="is-section is-box is-section-100 type-dynalight-mada">
    <div class="is-overlay" style="background-color: rgb(247, 247, 255);">
        <div class="is-overlay-content">
            <div data-cb-type="blobs-bg" data-cb-color-scheme="peach" data-cb-intensity="medium" data-cb-blob-count="4" data-cb-animation-speed="medium" style="--blob-opacity: 0.7; --blob-blur: 80px; --animation-duration: 5s; --blob-size-1: 500px; --blob-gradient-1: linear-gradient(135deg, #ffb3ba 0%, #ffccd5 100%); --blob-size-2: 450px; --blob-gradient-2: linear-gradient(135deg, #ffd1a1 0%, #ffe4c4 100%); --blob-size-3: 400px; --blob-gradient-3: linear-gradient(135deg, #ffc3a0 0%, #ffdab9 100%); --blob-size-4: 380px; --blob-gradient-4: linear-gradient(135deg, #ffafcc 0%, #ffc8dd 100%); --blob-size-5: 420px; --blob-gradient-5: linear-gradient(135deg, #ffe5d9 0%, #fff0e8 100%);" data-cb-blob-opacity="70" data-cb-blob-blur="80">
            </div>
        </div>
    </div>
    <div class="is-container v2 leading-13 size-17 v3 is-content-760">
        <div class="row">
            <div class="column">
                <div class="display">
                    <h1 class="text-center xs-size-64 size-96">The Art of Simplicity</h1>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
            <div class="column" style="width: 60%; flex: 0 0 auto;">
                <p class="text-center leading-normal size-19" style="color: rgb(16, 16, 16);">Discover the intersection of timeless design and modern elegance. A curated experience of minimalist luxury.</p>
            </div>
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-160"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <div class="column">
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
    </div>
</div>
`
		},
        {
		    'thumbnail': 'preview/plugin-gradient-blobs2.png',
		    'category': '5',
		    'html': `
<div class="is-section is-section-100 type-raleway-lato">
    <div class="is-box box-autofit is-box-4 is-content-bottom edge-y-2">
        <div class="is-overlay">
        </div>
        <div class="is-container v2 size-17 leading-13 is-content-480 v3">
            <div class="row">
                <div class="column">
                    <h2 class="font-normal size-42">We deliver extraordinary things.</h2>
                    <p style="color: rgb(61, 61, 61);" class="leading-14">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box box-autofit is-box-8 is-content-bottom edge-y-2">
        <div class="is-overlay" style="background-color: rgb(247, 247, 255);">
            <div class="is-overlay-content">
                <div data-cb-type="blobs-bg" data-cb-color-scheme="peach" data-cb-intensity="medium" data-cb-blob-count="2" data-cb-animation-speed="medium" style="--blob-opacity: 0.7; --blob-blur: 80px; --animation-duration: 5s; --blob-size-1: 500px; --blob-gradient-1: linear-gradient(135deg, #ffb3ba 0%, #ffccd5 100%); --blob-size-2: 450px; --blob-gradient-2: linear-gradient(135deg, #ffd1a1 0%, #ffe4c4 100%); --blob-size-3: 400px; --blob-gradient-3: linear-gradient(135deg, #ffc3a0 0%, #ffdab9 100%); --blob-size-4: 380px; --blob-gradient-4: linear-gradient(135deg, #ffafcc 0%, #ffc8dd 100%); --blob-size-5: 420px; --blob-gradient-5: linear-gradient(135deg, #ffe5d9 0%, #fff0e8 100%);" data-cb-blob-opacity="70" data-cb-blob-blur="80">
                </div>
            </div>
        </div>
        <div class="is-container v2 size-17 leading-13 v3 is-content-480 is-content-right edge-x-2">
            <div class="row">
                <div class="column">
                    <h2 class="font-normal size-42">We deliver extraordinary things.</h2>
                    <p style="color: rgb(61, 61, 61);" class="leading-14">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},    
    
		{
		    'thumbnail': 'preview/simple-29.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-container is-content-760 v3">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-8">Approach</p>
                <h2 class="size-42 font-normal leading-13 pb-6">We focus on what matters most.</h2>
                <p>Effective design comes from careful consideration, not complexity. Every element should have a clear purpose. Every choice should add value. We believe in creating work that is both functional and meaningful.</p>
            </div>
        </div>
    </div>
</div>
`
		},  

		{
		    'thumbnail': 'preview/simple-28.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-container v3 is-content-800">
        <div class="row">
            <div class="column">
                <h1 class="size-54 font-bold leading-12 text-center pb-6">Functional Simplicity.</h1>
                <p class="size-17 leading-17 text-gray-500 text-center pb-8" style="max-width: 600px; margin-left: auto; margin-right: auto;">Design that speaks through clarity. Structure that guides without distraction. Purpose in every detail.</p>
                <p class="size-12 uppercase tracking-150 text-gray-400 text-center">↓ Scroll to Explore</p>
            </div>
        </div>
    </div>
</div>
`
		},

        /*      
		{
		    'thumbnail': 'preview/simple-01.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box is-section-100 type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container text-center v3 is-content-580 leading-17 size-18">
        <div class="row">
            <div class="column">
                <p class="size-14 uppercase tracking-150 text-gray-400 pb-6">Next Steps</p>
                <h2 class="size-72 font-light pb-8 leading-11">Have an idea? <br>Let's build it.</h2>
                <p class="size-17 leading-17 text-gray-600">
                    A forward-thinking design studio dedicated to building brands that stand the test of time through strategic clarity and visual excellence.
                </p>
                <div class="spacer height-20"></div>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full border-current hover:text-white hover:border-transparent pb-2 pt-2 px-6" style="color: rgb(0, 0, 0);" data-bg="" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">
                        Start a Project
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},
		
		{
		    'thumbnail': 'preview/simple-02.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box is-section-100 type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container v2 v3 is-content-980 size-17 leading-17">
        <div class="row">
            <div class="column pt-1">
                <p class="size-14 uppercase tracking-150 text-gray-400">Welcome</p>
            </div>
            <div class="column" style="width: 75%; flex: 0 0 auto;">
                <p class="size-17 leading-17 text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
    </div>
</div>
`
		},
        */

		{
		    'thumbnail': 'preview/simple-canvas.png',
		    'category': '1',
			'type': 'canvas',
		    'html': `
			<div class="is-section is-box is-section-100 type-system-ui box-canvas autolayout">
				<div class="is-overlay"></div>
				<div class="is-block block-steady height-auto" style="top: calc(50% - 84px); left: calc(50% - 264px); width: 528px;">
					<div class="is-container container-new size-18 leading-14">
						<div class="row">
							<div class="column">
								<p>
									Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
									when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
`
		},

        {
            'thumbnail': 'preview/navbar-01.png',
            'category': '6',
            'googleFonts': [],
            'type': 'navbar',
            'html':
                '<div class="is-section is-section-navbar is-section-sticky is-section-auto is-box type-opensans" style="height:90px;background:transparent;">' +
                    '<div class="is-overlay">' +
                        '<div class="is-overlay-content content-selectable" data-module="navbar-builder" data-module-desc="Navigation Bar" data-dialog-width="570px" data-dialog-height="640px" data-html="' +
                        
                        encodeURIComponent('' +
						'<div class="is-topbar">' +
							'<div class="is-topbar-container" style="max-width:980px;">' +
								'<div class="is-topbar-logo">' +
									'<a class="is-logo-link" href="." title="Your Name">' +
										// '<img class="is-photo-profile circle" src="[%IMAGE_PATH%]images/innova-logo.png" alt="Your Name">' +
										'<span class="is-sitename">Your Name</span>' +
									'</a>' +
								'</div>' +
								'<div class="is-topbar-menu">' +
									'<a id="is-menu-toggle" href="javascript:void(0)" title="Menu"><span class="line line-1"></span><span class="line line-2"></span><span class="line line-3"></span></a>' +
									'<div class="is-menu-overlay"></div>' +
									'<div class="is-menu">' +
										'<div class="is-menu-search-input"><input id="is_txtSearch" type="text" placeholder="Search" /><button id="is_btnSearch"><i class="icon-menu-search"></i></button></div>' +
										'<ul class="is-menu-links">' +
											'<li><a href="#section1"><i class="icon ion-android-home"></i></a></li>' +
											'<li><a href="portfolio">Portfolio</a></li>' +
											'<li><a href="about">About</a></li>' +
											'<li><a href=""><i class="icon ion-android-share-alt"></i></a>' +
												'<ul>' +
													'<li><a href="https://instagram.com">Instagram</a></li>' +
													'<li><a href="https://facebook.com">Facebook</a></li>' +
													'<li><a href="https://youtube.com">Youtube</a></li>' +
												'</ul>' +
											'</li>' +
										'</ul>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<scr' + 'ipt>' +
							'var navbarReady = function (fn) {' +
								'var stateCheck = setInterval(function () {' +
									'if (typeof NavBar === "undefined") return;' +
									'clearInterval(stateCheck);' +
									'try { fn() } catch (e) { }' +
								'}, 1);' +
							'};' +
							'navbarReady(function () {' +
								'var obj = new NavBar({' +
									'onSearch: (keywords)=>{' +
										'alert(keywords)' +
									'}' +
								'});' +
								'obj.init();' +
							'});' +
							'' +
						'</scr' + 'ipt>' +

                        '') +
                        
                        '" data-settings="' +

                        encodeURIComponent('' +
                        '{' +
                            '"logotext": "Your Name",' +
                            '"logolink": "",' +
                            '"logocircle": true,' +
                            '"topbar": "",' +
                            '"maxwidth": 980,' +
                            '"menu":' +
                                '[' + 

                                '{"name": "Home", "link": "#section1", "html": "' + encodeURIComponent('<i class=\"icon ion-android-home\"></i>') + '", "class": "", "sub": []},' +
                                
                                '{"name": "Portfolio", "link": "portfolio", "class": "","sub": []},' +
                                '{"name": "About", "link": "about", "class": "","sub": []},' +
                                
                                '{"name": "Share", "link": "", "html": "' + encodeURIComponent('<i class=\"icon ion-android-share-alt\"></i>') + '", "class": "", "sub": [' +
                                    '{"name": "Twitter","link": "https://twitter.com", "class": "", "sub": []},' +
                                    '{"name": "Facebook","link": "https://facebook.com", "class": "", "sub": []},' +
                                    '{"name": "Youtube","link": "https://youtube.com", "class": "", "sub": []}' +
                                    ']}' +

                                ']' +
                        '}') + '">' +

                        '</div>' +

                    '</div>' +
                '\n</div>'
        },

        {
            'thumbnail': 'preview/navbar-01.png',
		    'category': '1,5',
		    'html': `
<div class="is-section is-box is-section-auto nav-menu type-system-ui">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="nav-menu" data-cb-logo="My Website" data-cb-loading="fade">
                <style>
                    [data-cb-type="nav-menu"]:not([data-cb-loaded]) {
                        opacity: 0;
                        visibility: hidden;
                        transition: none;
                    }

                    [data-cb-type="nav-menu"]:not([data-cb-loaded]) .nav-link {
                        transition: none;
                    }
                </style>
                <div class="nav-wrapper">
                    <nav>
                        <div class="nav-container">
                            <a href="/" class="logo"><img src="[%IMAGE_PATH%]images/logo.png" alt="My Website" class="logo-img rounded"></a>

                            <button class="menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            </button>

                            <ul class="nav-list" role="menubar">
                                <li class="nav-item has-submenu" role="none">
                                    <a href="#about" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false">
                                        About
                                        <span class="nav-arrow" aria-hidden="true"></span>
                                    </a>
                                    <button class="submenu-toggle" aria-label="Toggle About submenu" aria-expanded="false">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <ul class="submenu" role="menu" aria-label="About submenu">
                                        <li role="none">
                                            <a href="#team" class="submenu-link" role="menuitem">Team</a>
                                        </li>
                                        <li role="none">
                                            <a href="#history" class="submenu-link" role="menuitem">History</a>
                                        </li>
                                        <li role="none">
                                            <a href="#careers" class="submenu-link" role="menuitem">Careers</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item has-submenu" role="none">
                                    <a href="#" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false">
                                        Services
                                        <span class="nav-arrow" aria-hidden="true"></span>
                                    </a>
                                    <button class="submenu-toggle" aria-label="Toggle Services submenu" aria-expanded="false">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <ul class="submenu" role="menu" aria-label="Services submenu">
                                        <li role="none">
                                            <a href="#design" class="submenu-link" role="menuitem">Design</a>
                                        </li>
                                        <li role="none">
                                            <a href="#development" class="submenu-link" role="menuitem">Development</a>
                                        </li>
                                        <li role="none">
                                            <a href="#consulting" class="submenu-link" role="menuitem">Consulting</a>
                                        </li>
                                        <li role="none">
                                            <a href="#support" class="submenu-link" role="menuitem">Support</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item has-submenu" role="none">
                                    <a href="#work" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false">
                                        Work
                                        <span class="nav-arrow" aria-hidden="true"></span>
                                    </a>
                                    <button class="submenu-toggle" aria-label="Toggle Work submenu" aria-expanded="false">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <ul class="submenu" role="menu" aria-label="Work submenu">
                                        <li role="none">
                                            <a href="#portfolio" class="submenu-link" role="menuitem">Portfolio</a>
                                        </li>
                                        <li role="none">
                                            <a href="#case-studies" class="submenu-link" role="menuitem">Case Studies</a>
                                        </li>
                                        <li role="none">
                                            <a href="#clients" class="submenu-link" role="menuitem">Clients</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item" role="none">
                                    <a href="#journal" class="nav-link" role="menuitem">Journal</a>
                                </li>
                                <li class="nav-item" role="none">
                                    <a href="#contact" class="nav-link" role="menuitem">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

        {
            'thumbnail': 'preview/gallery-01.png',
            'category': '6',
            'html': `
          <div class="is-section is-section-auto is-box box-custom is-align-left type-poppins box-autofit min-height-60" style="justify-content:flex-start">
            <div class="is-overlay" style="position:relative;">
              <div class="is-overlay-content content-selectable" style="position:relative;" data-dialog-width="1200px" data-dialog-height="740px" data-module="media-grid" data-module-desc="Image Gallery" data-html="${encodeURIComponent(`
                <div id="_style_{id}" style="display:none">
                #{id}.is-media-grid {
                  column-count: 4;
                  column-gap: 10px;
                  padding: 10px;
                }
                #{id} .gallery-item {
                  position: relative;
                  break-inside: avoid;
                  border-radius: 0px;
                  margin-bottom: 10px;
                  line-height: 0; /* Eliminate extra space */
                  overflow: hidden;
                }
                #{id} .gallery-item img {
                  width: 100%;
                  height: auto;
                  transition: .8s all;
                }
                #{id} .gallery-item .caption {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  background-color: rgba(0, 0, 0, 0.4);
                  color: #fff;
                  padding: 12px 15px;
                  opacity: 0;
                  transition: all 0.8s ease;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  box-sizing: border-box;
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  font-size: .9em;
                  font-weight: 200;
                  line-height: 1.2;
                }
                
                #{id} .gallery-item .caption h4 {
                  font-weight: 300;
                  font-size: 1.1em;
                  margin: 0 0 0.1em;;
                }
                #{id} .gallery-item:hover .caption {
                  opacity: 1;
                }
      
                /* Slide */
                #{id} .gallery-item .caption {
                    transform: translateY(100%);
                    transition: transform 0.5s ease, opacity 0.5s ease;
                }
                #{id} .gallery-item:hover .caption {
                    transform: translateY(0%);
                    opacity: 1;
                } 
                
                /* Caption Light */
                #{id} .gallery-item .caption {
                    background-color: #fff;
                    color: #000;
                }
      
                @media (max-width: 800px) {
                  #{id}.is-media-grid {column-count: 3;}
                }
                @media (max-width: 600px) {
                  #{id}.is-media-grid {column-count: 2;}
                }
                @media (max-width: 400px) {
                  #{id}.is-media-grid {column-count: 1;}
                }
      
                #{id} .gallery-item a.glightbox {
                    pointer-events: none;
                }

                .gallery-item video {
                    height: auto; 
                    width: 100%;
                    object-fit: cover;
                }
                </div>
                <div id="{id}" class="is-media-grid grid-sortable" style="opacity:0">
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-MILpb.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-MILpb.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-2JkRP.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-2JkRP.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-EjMa5.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-EjMa5.jpg" alt="">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
                
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-j6Oyc.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-j6Oyc.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
      
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-lMoX0.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-lMoX0.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-a5R1g.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-a5R1g.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-4mQ3H.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-4mQ3H.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
      
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-HI7Lx.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-HI7Lx.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-xPlfu.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-xPlfu.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
      
      
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-twTdD.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-twTdD.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="[%IMAGE_PATH%]images/ai-ruq9W.jpg" class="glightbox" data-title="My title" data-description="This is the description">
                      <img src="[%IMAGE_PATH%]images/ai-ruq9W.jpg" alt="My title">
                      <div class="caption">
                        <h4>My title</h4>
                        <div>This is the description</div>
                      </div>
                    </a>
                  </div>
                </div>
                <script>
                var docReady = function(fn) {
                    var stateCheck = setInterval(function() {
                        if (document.readyState !== "complete") return;
                        clearInterval(stateCheck);
                        fn();
                    }, 1);
                };
      
                docReady(function() {
                  var cssElm = document.querySelector('#_style_{id}');
                  if(!cssElm) return;
                  var css = cssElm.innerHTML;
                  var head = document.getElementsByTagName('head')[0];
                  var s = document.createElement('style');
                  s.appendChild(document.createTextNode(css));
                  head.appendChild(s);
      
                  var grid = document.getElementById('{id}');
              
                  if (typeof GLightbox === 'undefined') {
                    var lightboxCss = document.createElement('link');
                    lightboxCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/css/glightbox.min.css';
                    lightboxCss.rel = 'stylesheet';
              
                    var lightboxJs = document.createElement('script');
                    lightboxJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/js/glightbox.min.js';
                    lightboxJs.onload = function() {
                      
                      const lightbox = GLightbox({
                          touchNavigation: true,
                          selector: '#{id} .glightbox',
                          loop: true,
                          autoplayVideos: true,
                          zoomable: true,
                          slideEffect: 'slide',
                          descPosition: 'bottom',
                          skin: 'light'
                      });
      
                      setTimeout(()=>{
                        grid.style.opacity = '';
                      }, 100);
           
                    };
              
                    document.head.appendChild(lightboxCss);
                    document.head.appendChild(lightboxJs);
                  } else {
                    const lightbox = GLightbox({
                        touchNavigation: true,
                        selector: '#{id} .glightbox',
                        loop: true,
                        autoplayVideos: true,
                        zoomable: true,
                        slideEffect: 'slide',
                        descPosition: 'bottom',
                        skin: 'light'
                    });
      
                    setTimeout(()=>{
                      grid.style.opacity = '';
                    }, 100);
      
                  }
              
                });
                </script>
              `)}" data-settings="${encodeURIComponent(`
                {
                  "gap": 10,
                  "cols": 4,
                  "rounded": 0,
                  "theme": "light",
                  "hover": "",
                  "captionPos": "bottom",
                  "captionEffect": "slide",
                  "captionTheme": "light",
                  "slideEffect": "slide",
                  "zoomable": "yes",
                  "lightbox": "disabled"
                }
              `)}">
                
              </div>
            </div>
            
          </div>
      `
        },

        {
		    'thumbnail': 'preview/gallery-01.png',
		    'category': '1,5',
		    'html': `
<div class="is-section is-box is-section-100 type-poppins">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="media-grid" data-cb-columns="3" class="grid-sortable" data-cb-gap="16" data-cb-rounded="8" data-cb-content-theme="light" data-cb-padding="16">
                <div class="gallery-item">
                    <img src="[%IMAGE_PATH%]images/ai-MILpb.jpg" alt="Sample Title">
                    <div class="item-content">

                        <h4>Sample Title</h4>
                        <div>Short descriptive text goes here</div>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="[%IMAGE_PATH%]images/ai-2JkRP.jpg" alt="Sample Title">

                </div>
                <div class="gallery-item">
                    <img src="[%IMAGE_PATH%]images/ai-4mQ3H.jpg" alt="Sample Title">
                    <div class="item-content">

                        <h4>Sample Title</h4>
                        <div>Short descriptive text goes here</div>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="[%IMAGE_PATH%]images/ai-j6Oyc.jpg" alt="Sample Title">
                    <div class="item-content">

                        <h4>Sample Title</h4>
                        <div>Short descriptive text goes here</div>
                    </div>
                </div>
                <div class="gallery-item"><img src="[%IMAGE_PATH%]images/ai-lMoX0.jpg" alt=""></div>
                <div class="gallery-item"><img src="[%IMAGE_PATH%]images/ai-xPlfu.jpg" alt=""></div>
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-04.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box is-section-100 type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container v2 md-w-980 size-17 v3 leading-17 is-content-1180">
        <div class="row relative sm-items-1" style="gap:80px">
            <div class="flex flex-col justify-center column xs-pb-6 sm-pb-6">
                <p class="size-14 uppercase tracking-150 text-gray-400 pb-6">Next Steps</p>
                <h2 class="font-light pb-8 leading-11 size-54 md-size-48">Have an idea?<br>Let's build it.</h2>
                <p class="size-17 leading-17 text-gray-600">
                    A forward-thinking design studio dedicated to building brands that stand the test of time through strategic clarity and visual excellence.
                </p>

                <div class="spacer height-20"></div>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-10 size-16 border-transparent hover:border-transparent" style="color: rgb(250, 250, 250); background-color: rgb(241, 64, 40);" data-bg="rgb(241, 64, 40)" data-hover-bg="rgba(244, 76, 53, 1)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                        Start a Project
                    </a>
                </div>
            </div>
            <div class="flex flex-col justify-center items-center column" style="width: 57.0904%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-200" style="border-radius: 14px;aspect-ratio:1/1">
                    <img src="[%IMAGE_PATH%]images/ai-paqI3-editIt0eaYf.jpg" alt="Design Studio" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-10.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box is-section-100 type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container v2 v3 size-17 leading-17 is-content-1440">
        <div class="row">
            <div class="column flex flex-col justify-center">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-6">Philosophy</p>
                <h2 class="size-48 leading-12 font-light pb-6">We deliver extraordinary things.</h2>
                <p class="size-17 leading-17 text-gray-600 pb-6">
                    Our innovative solutions have revolutionized the industry, providing unparalleled experiences for our customers. We believe that true luxury lies in simplicity and the thoughtful elimination of the unnecessary.
                </p>
                <p class="size-17 leading-17 text-gray-600">
                    Every line drawn and every material selected serves a purpose. We don't just design spaces; we curate environments that enhance the human experience.
                </p>
            </div>
            <div class="column" style="width: 12%; flex: 0 0 auto;">
                <div class="spacer height-80"></div>
            </div>
            <div class="column" style="width: 52%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-200 mb-8" style="aspect-ratio: 16/9;">
                    <img src="[%IMAGE_PATH%]images/ai-EjMa5-editTiWcFjJ.jpg" alt="Interior Detail" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="w-full overflow-hidden relative bg-gray-200" style="aspect-ratio: 16/9;">
                    <img src="[%IMAGE_PATH%]images/ai-b4di1.jpg" alt="Minimalist Space" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
`
		},
		{
		    'thumbnail': 'preview/simple-08.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container content-py-100 v3 is-content-1440 pb-14 pt-9 size-17 leading-17">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Our Philosophy</p>
                <div style="border-top: 1px solid #e5e5e5; width: 100%;"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row relative sm-items-2">
            <div class="column" style="width: 35.4348%; flex: 0 0 auto;">
                <h2 class="size-48 font-light leading-12">
                    Redefining the <br>digital landscape.
                </h2>
            </div>
            <div class="column">
                <p class="size-14 text-gray-400 pb-4">01</p>
                <h3 class="font-normal pb-3">Strategy</h3>
                <p class="text-gray-600">We define the roadmap for your brand's digital evolution, ensuring every step is calculated.</p>
            </div>
            <div class="column">
                <p class="size-14 text-gray-400 pb-4">02</p>
                <h3 class="font-normal pb-3">Design</h3>
                <p class="text-gray-600">Visual storytelling that captivates and converts, built on solid typographic foundations.</p>
            </div>
            <div class="column">
                <p class="size-14 text-gray-400 pb-4">03</p>
                <h3 class="font-normal pb-3">Build</h3>
                <p class="text-gray-600">Robust engineering meets fluid interaction, creating seamless experiences across devices.</p>
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-05.png',
		    'category': '1',
		    'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container is-content-640 v3 leading-17 size-18 sm-pb-10">
            <div class="row">
                <div class="column">
                    <div class="flex items-center pb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <p class="size-12 uppercase tracking-150 text-gray-400">Est. 2024</p>
                        <div style="flex:1"></div>
                        <p class="size-12 uppercase tracking-150 text-gray-400">London, UK</p>
                    </div>
                    <div class="spacer height-60"></div>
                    <h1 class="size-72 font-light text-black pb-6 leading-11">
                        We craft digital <br>
                        <span class="text-gray-400">experiences that</span> <br>
                        matter.
                    </h1>
                    <p class="text-gray-600 max-w-md pb-8">
                        A forward-thinking design studio dedicated to building brands that stand the test of time through strategic clarity and visual excellence.
                    </p>

                    <div class="space-x-2">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-8 size-15 border-transparent hover:border-transparent" style="color: rgb(250, 250, 250); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">
                            View Projects
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 hover-zoom box-autofit min-height-60">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-emoL3.jpg&quot;); background-position: 50% 50%;">
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-03.png',
		    'category': '1',
		    'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-6 box-autofit">
        <div class="is-overlay" style="background-color: rgb(247, 247, 247);">
        </div>
        <div class="is-container v2 size-17 is-content-540 leading-17">

            <div class="row">
                <div class="column">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 box-autofit">
        <div class="is-overlay">
        </div>
        <div class="is-container v2 size-17 is-content-540 leading-17">
            <div class="row">
                <div class="column">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type.</p>

                </div>
            </div>
        </div>
    </div>
</div>
`
		},


		{
		    'thumbnail': 'preview/simple-07.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-80">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 leading-17 size-17">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 mb-8">The Team</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row" style="gap:40px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1/1;">
                    <img src="[%IMAGE_PATH%]images/ai-32nTD.jpg" alt="Freja E. Andersen" class="w-full h-full object-cover transition-transform hover:scale-105 duration-1000">
                </div>
                <h4 class="size-20 font-normal">Freja E. Andersen</h4>
                <p class="size-14 text-gray-500 uppercase tracking-wide mt-1 mb-3">Lead Architect</p>
                <p class="size-15 text-gray-600 leading-16">Specializing in sustainable residential architecture with a focus on natural light.</p>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1/1;">
                    <img src="[%IMAGE_PATH%]images/ai-YLtos.jpg" alt="Vincent Nelson" class="w-full h-full object-cover transition-transform hover:scale-105 duration-1000">
                </div>
                <h4 class="size-20 font-normal">Vincent Nelson</h4>
                <p class="size-14 text-gray-500 uppercase tracking-wide mt-1 mb-3">Interior Director</p>
                <p class="size-15 text-gray-600 leading-16">Creating intuitive user interfaces within physical spaces for seamless experiences.</p>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1/1;">
                    <img src="[%IMAGE_PATH%]images/ai-1ANxo.jpg" alt="Emilie Petersen" class="w-full h-full object-cover transition-transform hover:scale-105 duration-1000">
                </div>
                <h4 class="size-20 font-normal">Emilie Petersen</h4>
                <p class="size-14 text-gray-500 uppercase tracking-wide mt-1 mb-3">Technical Lead</p>
                <p class="size-15 text-gray-600 leading-16">Ensuring structural integrity and innovative engineering solutions across all projects.</p>
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-06.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 leading-17 size-17 pt-10 pb-12 v3">
        <div class="row">
            <div class="column">
                <h2 class="size-48 font-light leading-12">Selected Works</h2>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="text-right">2023 — 2024</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row" style="gap:30px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-100 mb-4" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-a5R1g.jpg" alt="Residential Project" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="size-18 font-medium pt-2">Nordic Residence</h3>
                <p class="size-14 text-gray-500">Architecture, 2023</p>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-100 mb-4" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-ruq9W.jpg" alt="Commercial Project" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="size-18 font-medium pt-2">Urban Office</h3>
                <p class="size-14 text-gray-500">Interior, 2024</p>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-100 mb-4" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-45420.jpg" alt="Public Space" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="size-18 font-medium pt-2">City Gallery</h3>
                <p class="size-14 text-gray-500">Public Space, 2023</p>
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-09.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-color: #ffffff;"></div>
    </div>
    <div class="is-container v3 is-content-760 pb-10">

        <div class="row">
            <div class="column">
                <h1 class="size-96 leading-11 font-light tracking-tight text-center pb-8">Words From<br>The Heart</h1>

                <div class="flex justify-center pb-8">
                    <div style="width: 1px; height: 80px; background-color: #000;"></div>
                </div>

                <p class="text-center uppercase tracking-150 size-13 text-gray-500 pb-2">Curated By</p>
                <p class="text-center size-16 font-medium">Selma Laursen</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row justify-center">
            <div class="column">
                <div style="max-width: 760px; margin: 0 auto;">
                    <p class="size-24 leading-15 text-center font-light text-gray-800">
                        "Architecture is not just about the space we build, but the silence we enclose. It is the language that speaks to our subconscious when words fail."
                    </p>
                </div>
            </div>
        </div>

    </div>
</div>
`
		},
		{
		    'thumbnail': 'preview/simple-16.png',
		    'category': '1',
		    'html': `
<div class="is-section type-system-ui is-section-100 box-space">
    <div class="is-box is-box-5 box-autofit min-height-50">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-Ehzyn.jpg&quot;); opacity: 1; background-position: 29% 60%;" data-bg-lg="background-position: 29% 60%;" data-bg-ori="background-position: 27% 60%;"></div>
        </div>
    </div>
    <div class="is-box is-box-7 min-height-50 box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container size-17 leading-17 v3 is-content-540">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-6">The Studio</p>
                    <h2 class="size-48 font-light leading-12 pb-6">Global vision, <br>personal touch.</h2>
                    <p class="size-17 leading-17 text-gray-400 pb-8 text-justify">
                        We believe that great design is invisible. It serves the user without drawing attention to itself. Our team of strategists, designers, and developers work in unison to create digital products that feel natural, intuitive, and essential.
                    </p>
                    <div class="flex items-center">
                        <div class="pr-8">
                            <p class="size-32 font-light text-black">45+</p>
                            <p class="size-13 text-gray-500 uppercase tracking-wider">Projects</p>
                        </div>
                        <div class="pr-8">
                            <p class="size-32 font-light text-black">12</p>
                            <p class="size-13 text-gray-500 uppercase tracking-wider">Awards</p>
                        </div>
                        <div>
                            <p class="size-32 font-ligh text-black">8</p>
                            <p class="size-13 text-gray-500 uppercase tracking-wider">Years</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
			`
		},

		{
		    'thumbnail': 'preview/simple-12.png',
		    'category': '1',
		    'html': `
<div class="is-section is-section-100 is-box is-align-left box-autofit type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container v2 size-17 leading-17 is-content-1600">
        <div class="row" style="gap:50px">
            <div class="column">
                <h2 class="size-42 font-light leading-12">Selected Works</h2>
            </div>
            <div class="column flex flex-col justify-center">

                <p class="size-14 uppercase tracking-150 text-gray-500 text-right">2023 — 2024</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row relative md-items-2 sm-items-2 xs-items-1">
            <div class="column">
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-normal leading-11">Apex Finance</h3>
                        <p class="size-14 text-gray-500 pt-1 pb-3">Fintech App</p>
                    </div>
                    <p class="size-14 text-gray-400 pt-1">2023</p>
                </div>

                <img src="[%IMAGE_PATH%]images/ai-MY8Qs-edityowY5BP.jpg" alt="">
            </div>
            <div class="column">
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-normal leading-11">Mono Architects</h3>
                        <p class="size-14 text-gray-500 pt-1 pb-3">Web Design</p>
                    </div>
                    <p class="size-14 text-gray-400 pt-1">2023</p>
                </div>

                <img src="[%IMAGE_PATH%]images/ai-SpJ6e.jpg" alt="">
            </div>
            <div class="column">
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-normal leading-11">Venture Travel</h3>
                        <p class="size-14 text-gray-500 pt-1 pb-3">Branding &amp; Identity</p>
                    </div>
                    <p class="size-14 text-gray-400 pt-1">2024</p>
                </div>

                <img src="[%IMAGE_PATH%]images/ai-ePvge-editCYenPje.jpg" alt="">
            </div>
            <div class="column">
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-normal leading-11">Urban Living</h3>
                        <p class="size-14 text-gray-500 pt-1 pb-3">Art Direction</p>
                    </div>
                    <p class="size-14 text-gray-400 pt-1">2024</p>
                </div>

                <img src="[%IMAGE_PATH%]images/ai-fM6zM-editkSgyMGa.jpg" alt="">
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-11.png',
		    'category': '1',
		    'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-4 box-autofit min-height-40">
        <div class="is-overlay" style="background-color: rgb(247, 247, 247);">
        </div>
        <div class="is-container v2 size-17 is-content-480 leading-17">
            <div class="row">
                <div class="column">
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-4 box-autofit min-height-40">
        <div class="is-overlay" style="background-color: rgb(240, 240, 240);">
        </div>
        <div class="is-container v2 size-17 is-content-480 leading-17">
            <div class="row">
                <div class="column">
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-4 is-box box-autofit min-height-40">
        <div class="is-overlay">
        </div>
        <div class="is-container v2 size-17 is-content-480 leading-17">
            <div class="row">
                <div class="column">
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-13.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom hover-zoom">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-4flwC.jpg'); background-position: 50% 50%;">
            <div class="is-overlay-color opacity-10"></div>
        </div>
    </div>
    <div class="is-container is-content-left size-17 leading-17 v3 is-content-920">
        <div class="row">
            <div class="column">
                <p class="size-14 text-white uppercase tracking-widest mb-6">Studio Life</p>
                <h2 class="size-60 text-white font-light">Copenhagen HQ</h2>
            </div>
        </div>
    </div>
</div>
			`
		},

		{
		    'thumbnail': 'preview/simple-15.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 size-17 leading-17 v3 pb-10 pt-8">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-center" style="border-bottom: 1px solid #f0f0f0; padding-bottom: 20px;">
                    <p class="size-14 uppercase tracking-150 text-black font-semibold">The Studio</p>
                    <p class="size-14 uppercase tracking-150 text-gray-500">Est. 2024 — London</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <h1 class="size-96 leading-12 font-normal tracking-tight">
                    We craft <br>
                    <span class="text-gray-400">digital</span> narratives.
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap:40px">
            <div class="column">
                <p class="size-18 leading-16 text-gray-600" style="max-width: 450px;">
                    A multidisciplinary design agency focused on creating immersive visual identities and digital experiences for forward-thinking brands. We believe in the power of minimalism to communicate complex ideas.
                </p>
                <div class="spacer height-40"></div>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-8 size-16 leading-16 border-black hover:bg-black hover:text-white border-current hover:border-transparent" style="color: rgb(0, 0, 0);" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                        View Projects
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-14.png',
		    'category': '1',
		    'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-4">
        <div class="is-overlay"></div>
        <div class="is-container size-17 leading-17 v3 is-content-540">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-6">Philosophy</p>
                    <h1 class="size-60 font-light leading-12 pb-6 text-black">The Art of Reduction</h1>
                    <div class="spacer height-20"></div>
                    <p class="size-18 leading-17 text-gray-600 pb-6">
                        True minimalism is not just about the absence of clutter; it is about the presence of meaning. We strip away the non-essential to reveal the fundamental quality of space, light, and form.
                    </p>
                    <p class="leading-17 text-gray-500 pb-10 size-17">
                        Our approach combines rigorous geometry with organic textures, creating environments that feel both disciplined and deeply human. Every line drawn serves a purpose; every void creates a moment of pause.
                    </p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(240, 240, 241);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(240, 240, 241)" data-hover-bg="rgb(236, 236, 238)">
                            Explore Studio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-8">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-nLkW9.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
			`
		},

		{
		    'thumbnail': 'preview/simple-18.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-auto">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 pt-0 pb-0">
        <div class="row">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:21/9">
                    <img src="assets/minimalist-blocks/images/ai-sFtJP2.jpg" alt="Landscape" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>

<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-10 leading-17 size-17">

        <div class="row" style="gap: 60px; margin-bottom: 60px;">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <h2 class="size-60 font-light leading-12">Fascinating Places,<br>Great Journey.</h2>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="text-gray-500 pb-6" style="max-width: 480px;">
                    Eighty days around the world, we’ll find a pot of gold just sitting where the rainbow’s ending. Time — we’ll fight against the time.
                </p>
                <div style="width: 100%; height: 1px; background-color: rgba(0,0,0,0.1);"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column">
                <div class="pb-4 border-b border-gray-100 mb-4">
                    <p class="size-12 uppercase tracking-150 text-gray-400">01. Departure</p>
                </div>
                <p class="text-gray-700 text-justify">
                    Eighty days around the world, we’ll find a pot of gold just sitting where the rainbow’s ending. Time — we’ll fight against the time, and we’ll fly on the white wings of the wind. The journey begins not with a step, but with a thought, a desire to see beyond the horizon.
                </p>
            </div>
            <div class="column">
                <div class="pb-4 border-b border-gray-100 mb-4">
                    <p class="size-12 uppercase tracking-150 text-gray-400">02. Transit</p>
                </div>
                <p class="text-gray-700 text-justify">
                    Eighty days around the world, no we won’t say a word before the ship is really back. Round, round, all around the world. The rhythm of the rails, the hum of the engines, they become the soundtrack of our transformation. Every mile crossed is a memory gained.
                </p>
            </div>
            <div class="column">
                <div class="pb-4 border-b border-gray-100 mb-4">
                    <p class="size-12 uppercase tracking-150 text-gray-400">03. Arrival</p>
                </div>
                <p class="text-gray-700 text-justify pb-6">
                    We travel not to escape life, but for life not to escape us. In the end, the destination matters less than the person you become along the way. The pot of gold was never the treasure.
                </p>
                <p class="size-14 font-medium italic text-gray-400">
                    — Extract from "The Voyager"
                </p>
            </div>
        </div>
    </div>
</div>
			`
		},

		{
		    'thumbnail': 'preview/simple-19.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 size-17 leading-17 v3 pb-12">
        <div class="row">
            <div class="column">
                <h2 class="size-160 md-size-96 font-light leading-11 tracking-tight mb-12" style="margin-left: -8px;">About:</h2>
            </div>
        </div>

        <div class="row" style="gap:60px">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <p class="size-24 font-normal leading-14 text-black">
                    One for all and all for one, helping everybody. Sharing everything with fun, that’s the way to be.
                </p>
            </div>
            <div class="column">
                <p class="size-16 text-gray-600 leading-17 text-justify">
                    We are a multidisciplinary design studio focused on creating meaningful environments. Our work encompasses architecture, interior design, and product design, all unified by a commitment to clarity and purpose.
                </p>
                <div class="spacer height-40"></div>
                <p class="size-14 uppercase tracking-150 text-black mb-4">Contact</p>
                <p class="size-16 text-gray-600">hello@example.com</p>
                <p class="size-16 text-gray-600">(555) 123-4567</p>
            </div>
            <div class="column">
                <p class="size-16 text-gray-600 leading-17 text-justify">
                    With over a decade of experience, we have built a reputation for delivering projects that stand the test of time. We believe in sustainable practices and materials that age gracefully.
                </p>
                <div class="spacer height-40"></div>
                <p class="size-14 uppercase tracking-150 text-black mb-4">Address</p>
                <p class="size-16 text-gray-600">123 Example Street</p>
                <p class="size-16 text-gray-600">Design City, DC 12345</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
                <div class="w-full h-px bg-gray-200"></div>

            </div>
        </div>
        <div class="row">
            <div class="column">
                <p class="size-12 text-gray-400">© 2025 Your Company. All rights reserved.</p>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="space-x-1 text-right">
                    <a href="#" class="size-12 text-gray-400 no-underline hover:text-black">Instagram</a>
                    <a href="#" class="size-12 text-gray-400 no-underline hover:text-black">LinkedIn</a>
                </p>
            </div>
        </div>
    </div>
</div>
			`
		},
		{
		    'thumbnail': 'preview/simple-17.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom edge-y-4">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="video-background" data-cb-loading="none" data-cb-autoplay="true" data-cb-loop="true" data-cb-muted="true" data-cb-plays-inline="true" data-cb-show-overlay="false" data-cb-overlay-opacity="20" data-cb-overlay-color="#000000" data-cb-show-controls="true" data-cb-controls-position="bottom-right">
                <div class="video-bg-wrapper">
                    <video>
                        <source src="[%IMAGE_PATH%]videos/ai-thhyR.mp4" type="video/mp4">
                    </video>
                    <div class="video-bg-overlay"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-container bg-white leading-17 v3 is-content-left edge-x-4 is-content-400 pb-12 pt-12 size-16">
        <div class="row">
            <div class="column">
                <div>
                    <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">Philosophy</p>
                    <h2 class="size-32 leading-13 font-normal pb-4">Design is intelligence made visible.</h2>
                    <p class="size-16 text-gray-600 leading-17">We strip away the non-essential to reveal the core essence of your brand, creating lasting impact through clarity.</p>
                </div>

            </div>
        </div>
    </div>
</div>
			`
		},

		{
		    'thumbnail': 'preview/simple-21.png',
		    'category': '1',
		    'html': `
<div class="is-section is-section-100 type-system-ui box-space box-space-xxs md-boxes-2 md-boxes-wrap">
    <div class="is-box is-box-4 min-height-40 is-content-bottom edge-y-2 hover-zoom">
        <div class="is-overlay" style="background-color: rgb(247, 247, 247);">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-YnQpF.jpg&quot;);">
                <div class="is-overlay-color opacity-4"></div>
            </div>
        </div>
        <div class="is-container v2 size-17 is-content-480 leading-17 v3">
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="p-12 bg-white">
                        <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">Architecture</p>
                        <h2 class="size-32 leading-13 font-normal pb-4">Urban Silence</h2>
                        <p class="size-16 text-gray-600 leading-17">We strip away the non-essential to reveal the core essence of your brand, creating lasting impact through clarity.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-4 min-height-40 is-content-bottom edge-y-2 hover-zoom">
        <div class="is-overlay" style="background-color: rgb(240, 240, 240);">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-7dhro.jpg&quot;);">
                <div class="is-overlay-color opacity-5"></div>
            </div>
        </div>
        <div class="is-container v2 size-17 is-content-480 leading-17 v3">
            <div class="row">
                <div class="column">
                    <div class="p-12 bg-white">
                        <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">Interior</p>
                        <h2 class="size-32 leading-13 font-normal pb-4">Modern Living</h2>
                        <p class="size-16 text-gray-600 leading-17">We strip away the non-essential to reveal the core essence of your brand, creating lasting impact through clarity.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-4 is-box min-height-40 is-content-bottom edge-y-2 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-rawlE.jpg&quot;);">
                <div class="is-overlay-color opacity-6"></div>
            </div>
        </div>
        <div class="is-container v2 size-17 is-content-480 leading-17 v3">
            <div class="row">
                <div class="column">
                    <div class="p-12 bg-white">
                        <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">Photography</p>
                        <h2 class="size-32 leading-13 font-normal pb-4">Light Studies</h2>
                        <p class="size-16 text-gray-600 leading-17">We strip away the non-essential to reveal the core essence of your brand, creating lasting impact through clarity.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
		    'thumbnail': 'preview/simple-24.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui bg-gray-50 is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-800 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <p class="size-14 uppercase tracking-150 text-gray-400 text-center pb-6">Our Approach</p>
                <h2 class="size-48 leading-13 font-light text-center pb-8">
                    "We don't just build websites. We build digital ecosystems that breathe, evolve, and perform."
                </h2>
                <div class="text-center">
                    <p class="size-16 text-gray-500 font-medium">Helena Rose</p>
                    <p class="size-14 text-gray-400">Creative Director</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

		{
		    'thumbnail': 'preview/simple-25.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui bg-black is-section-60">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <h2 class="size-72 font-light leading-12 pb-8">Let's create something<br>timeless together.</h2>
            </div>
        </div>
        <div class="row" style="border-top: 1px solid #333; padding-top: 40px; gap: 40px;">
            <div class="column">
                <p class="size-12 text-gray-500 uppercase tracking-150">Contact</p>
                <p class="size-16 mt-4">hello@example.com</p>
                <p class="size-16 mt-1">(555) 123-4567</p>
            </div>
            <div class="column">
                <p class="size-12 text-gray-500 uppercase tracking-150">Social</p>
                <div class="mt-4 flex flex-col">
                    <a href="#" class="size-16 no-underline pb-1 opacity-80 hover:opacity-100">Instagram</a>
                    <a href="#" class="size-16 no-underline pb-1 opacity-80 hover:opacity-100">LinkedIn</a>
                    <a href="#" class="size-16 no-underline opacity-80 hover:opacity-100">Behance</a>
                </div>
            </div>
            <div class="column">
                <p class="size-12 text-gray-500 uppercase tracking-150">Studio</p>
                <p class="size-16 mt-4">123 Example Street<br>12345 Paris, France</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
                <p class="size-12 text-gray-600 text-right">© 2025 The Studio. All rights reserved.</p>
            </div>
        </div>
    </div>
</div>
`
		},
		{
		    'thumbnail': 'preview/simple-23.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-auto">
    <div class="is-overlay"></div>
    <div class="is-container size-17 leading-17 is-content-1400 v3 pt-14 pb-14">
        <div class="row">
            <div class="column">
                <div class="pb-8" style="border-bottom: 1px solid #f0f0f0;">
                    <p class="size-14 uppercase tracking-150 text-gray-500">Archive</p>
                </div>
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row" style="gap: 20px; margin-bottom: 40px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:1/1">
                    <img src="[%IMAGE_PATH%]images/ai-obZqc.jpg" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="pt-4">
                    <p class="size-16 font-medium">Nordic Chair</p>
                    <p class="size-14 text-gray-500">Product Design</p>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:1/1">
                    <img src="[%IMAGE_PATH%]images/ai-QUMM5.jpg" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="pt-4">
                    <p class="size-16 font-medium">Stone Vase</p>
                    <p class="size-14 text-gray-500">Ceramics</p>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:1/1">
                    <img src="[%IMAGE_PATH%]images/ai-0gZN7.jpg" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="pt-4">
                    <p class="size-16 font-medium">Abstract Form</p>
                    <p class="size-14 text-gray-500">Art Direction</p>
                </div>
            </div>
        </div>
        <div class="row" style="gap: 20px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:1/1">
                    <img src="[%IMAGE_PATH%]images/ai-EjMa5.jpg" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="pt-4">
                    <p class="size-16 font-medium">Minimal Desk</p>
                    <p class="size-14 text-gray-500">Interior</p>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:1/1">
                    <img src="[%IMAGE_PATH%]images/ai-hVS3h.jpg" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="pt-4">
                    <p class="size-16 font-medium">Glass House</p>
                    <p class="size-14 text-gray-500">Architecture</p>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:1/1">
                    <img src="[%IMAGE_PATH%]images/ai-twTdD.jpg" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="pt-4">
                    <p class="size-16 font-medium">Paper Texture</p>
                    <p class="size-14 text-gray-500">Branding</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},


		{
		    'thumbnail': 'preview/simple-22.png',
		    'category': '1',
		    'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 is-content-top edge-y-2 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-MY8Qs.jpg'); background-position: 50% 43%;">
                <div class="is-overlay-color opacity-30" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0,0,0,0.1) 80%);"></div>
            </div>
        </div>
        <div class="is-container is-content-540 pl-8 pb-10 v3 is-content-left edge-x-2 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-14 uppercase tracking-150 text-white opacity-80 pb-3">Featured Project</p>
                    <h3 class="size-42 text-white font-normal pb-2 leading-11">The Green House</h3>
                    <p class="text-gray-200">Residential architecture in Copenhagen.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 is-content-top edge-y-2 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-A696B.jpg'); background-position: 50% 50%;">
                <div class="is-overlay-color opacity-30" style="background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 80%);"></div>
            </div>
        </div>
        <div class="is-container is-content-540 pl-8 pb-10 v3 is-content-left edge-x-2 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-14 uppercase tracking-150 text-white opacity-80 pb-3">Featured Project</p>
                    <h3 class="size-42 text-white font-normal pb-2 leading-11">Ceramic Studio</h3>
                    <p class="text-gray-200">Brand identity for a local artisan.</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},
		
		{
		    'thumbnail': 'preview/simple-26.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-100 size-17 leading-17 v3 pb-12">
        <div class="row">
            <div class="column">
                <h2 class="size-60 font-light leading-12 mb-12">Our Approach</h2>
            </div>
        </div>

        <div class="row py-8" style="border-top: 1px solid #e5e5e5;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <p class="size-14 text-gray-400" style="font-family: monospace;">01</p>
            </div>
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <h3 class="size-24 font-normal">Strategic Vision</h3>
            </div>
            <div class="column">
                <p class="size-16 text-gray-600 leading-17">Our innovative approach revolutionizes the industry by combining data-driven insights with creative intuition.</p>
            </div>
        </div>

        <div class="row py-8" style="border-top: 1px solid #e5e5e5;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <p class="size-14 text-gray-400" style="font-family: monospace;">02</p>
            </div>
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <h3 class="size-24 font-normal">Global Reach</h3>
            </div>
            <div class="column">
                <p class="size-16 text-gray-600 leading-17">We redefine the standards of quality and excellence, operating across borders to bring world-class design to local contexts.</p>
            </div>
        </div>

        <div class="row py-8" style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <p class="size-14 text-gray-400" style="font-family: monospace;">03</p>
            </div>
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <h3 class="size-24 font-normal">Sustainable Design</h3>
            </div>
            <div class="column">
                <p class="size-16 text-gray-600 leading-17">Our cutting-edge technology sets us apart, ensuring that every project minimizes environmental impact while maximizing utility.</p>
            </div>
        </div>
    </div>
</div>
`
		},
		
		{
		    'thumbnail': 'preview/simple-20.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v3 pt-14 pb-10 leading-17 size-17">
        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 35%; flex: 0 0 auto;">
                <h2 class="size-60 font-light pb-4 leading-11">FAQ</h2>
                <p class="text-gray-600">Common questions about our process and services.</p>
            </div>
            <div class="column">
                <!-- Q1 -->
                <div class="pb-6 mb-6" style="border-bottom: 1px solid #eee;">
                    <h3 class="font-normal pb-2">How do we get started?</h3>
                    <p class="text-gray-600">We begin with a discovery phase to understand your goals. Contact us to schedule an initial consultation call.</p>
                </div>
                <!-- Q2 -->
                <div class="pb-6 mb-6" style="border-bottom: 1px solid #eee;">
                    <h3 class="font-normal pb-2">What is your typical timeline?</h3>
                    <p class="text-gray-600">Most branding and web projects take between 4-8 weeks, depending on complexity and scope.</p>
                </div>
                <!-- Q3 -->
                <div class="pb-6 mb-6" style="border-bottom: 1px solid #eee;">
                    <h3 class="font-normal pb-2">Do you offer maintenance?</h3>
                    <p class="text-gray-600">Yes, we offer ongoing support packages to ensure your digital products remain secure and up-to-date.</p>
                </div>
            </div>
        </div>
    </div>
</div>
			`
		},
		{
		    'thumbnail': 'preview/simple-27.png',
		    'category': '1',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom">
    <div class="is-overlay">
        <div class="is-overlay-bg"></div>
    </div>
    <div class="is-container is-content-1400 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-6" style="border-bottom: 1px solid #000;">
                    <p class="size-14 uppercase tracking-150 text-black">Est. 2025</p>
                    <p class="size-14 uppercase tracking-150 text-black">Copenhagen, DK</p>
                </div>
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap:40px">
            <div class="column" style="width: 55%; flex: 0 0 auto;">
                <h1 class="size-96 leading-12 font-light tracking-tight text-black">
                    Form<br>Follows<br>Function.
                </h1>
                <div class="spacer height-40"></div>
                <div class="button-group">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-solid mt-2 mb-1 py-3 px-8 size-15 leading-14 rounded-full border-black hover:text-white text-black font-normal tracking-wide border-current border-2 hover:border-transparent" style="background-color: transparent;" data-hover-bg="rgba(0, 0, 0, 1)" data-bg="transparent" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">View Projects</a>
                </div>

            </div>
            <div class="column flex flex-col justify-end">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 4/5;">
                    <img src="[%IMAGE_PATH%]images/ai-paqI3-editIt0eaYf.jpg" alt="Modern Architecture" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="spacer height-20"></div>
                <p class="size-14 text-gray-600 text-right">Architecture &amp; Interior Design</p>
            </div>
        </div>
    </div>
</div>
`
		},
		
	
		/* SLIDER */

		{
		    'thumbnail': 'preview/slider-01.png',
		    'category': '6',
            'type': 'glide',
		    'html': `
			<div class="is-section is-section-100 is-box is-align-left type-poppins is-light-text box-autofit min-height-60">
				<div class="is-overlay">
					<div class="is-overlay-content content-selectable" data-dialog-width="1200px" data-dialog-height="900px" data-module="slider-box" data-module-desc="Slider" data-html="${encodeURIComponent(`
						<div id="{id}" class="glide cover" style="display:none">
							<div data-glide-el="track" class="glide__track">
								<ul class="glide__slides">
									<li class="glide__slide">
										<div><img src="[%IMAGE_PATH%]images/ai-SgghV.jpg" alt=""></div>
									</li>
									<li class="glide__slide">
										<div><img src="[%IMAGE_PATH%]images/ai-iB5kH.jpg" alt=""></div>
									</li>
								</ul>
							</div>
							<div class="glide__arrows" data-glide-el="controls">
								<button class="glide__arrow glide__arrow--left" data-glide-dir="<">
									<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
										<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>
									</svg>
								</button>
								<button class="glide__arrow glide__arrow--right" data-glide-dir=">">
									<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
										<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
									</svg>
								</button>
							</div>
						</div>
						<script>
							var svgDef = '<svg width="0" height="0" style="position:absolute;display:none;">' +
								'<defs>' +
									'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-left">' +
										'<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>' +
									'</symbol>' +
									'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-right">' +
										'<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>' +
									'</symbol>' +
								'</defs>' +
							'</svg>';
							var pre = document.querySelector('#ion-ios-arrow-left');
							if(!pre) {
								document.body.insertAdjacentHTML('beforeend', svgDef);
							}
							
							var docReady = function(fn) {
								var stateCheck = setInterval(function() {
									//if (typeof Glide === 'undefined') return;
									var waitSlider = false;
									if(typeof Glide !== 'undefined') {
										if((new Glide).mount) {
											// Do Nothing 
										}  else {
											waitSlider = true;
										}
									} else {
										waitSlider = true;
									}
									if(waitSlider) return;
		
									clearInterval(stateCheck);

										fn();
                                        
								}, 1);
							};
							docReady(function() {
								const glideSlide = document.querySelector("#{id}");
								if(!glideSlide) return;
								glideSlide.style.display="";

								var _{id} = new Glide("#{id}", {
									type: "carousel",
									autoplay: false,
									animationDuration: 1000,
									gap: 0,
									perView: 1,
									hoverpause: false,
									arrow: true,
									dots: false,
									breakpoints: {
										970: {
											perView: 1,
											gap: 0
										}
									},
								}).mount();

								const glideElement = {id};
								let isSliderRunning = false;
								const manageSliderVisibility = (entries) => {
									if (entries[0].isIntersecting) {
										if (!isSliderRunning) {
											_{id}.update({ autoplay: 3000 });
											isSliderRunning = true;
										}
									} else {
										if (isSliderRunning) {
											_{id}.update({ autoplay: false }); 
											isSliderRunning = false;
										}
									}
								}
								const observer = new IntersectionObserver(manageSliderVisibility, { threshold: 0.5 });
								observer.observe(glideElement);
								
							});
						</script>
					`)}" data-settings="${encodeURIComponent(`
						{
							"type": "carousel",
							"autoplay": 3000,
							"animationDuration":1000,
							"gap":0,
							"perView":1,
							"hoverpause": false,
							"arrow":true,
							"dots":false,
							"fit":"cover",
							"images":
								[
									{
										"src": "[%IMAGE_PATH%]images/ai-SgghV.jpg", 
										"caption": "", "style": ""
									},
									{
										"src": "[%IMAGE_PATH%]images/ai-iB5kH.jpg", 
										"caption": "", "style": ""
									}
								]
						}
					`)}">
						
					</div>
				</div>
				<div class="is-container v2 size-17 leading-13 is-content-960 is-content-left edge-x-4">

					<div class="row">
						<div class="column">
							<h1 class="text-center font-normal leading-11 size-72">We Create Simple and Effective Designs</h1>
						</div>

					</div>
					<div class="row">
						<div class="column">
							<div class="spacer height-40"></div>
						</div>

					</div>
					<div class="row">
						<div class="column">
							<div class="text-center button-group">
								<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed tracking-wide rounded-full" title="" style="color: rgb(255, 255, 255);">Our Works</a>
								<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-9 font-normal leading-relaxed border-transparent rounded-full size-18 tracking-wide hover:border-transparent" title="" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Get in Touch</a>
							</div>
						</div>

					</div>
				</div>
			</div>
`
		},
		{
		    'thumbnail': 'preview/slider-02.png',
		    'category': '6',
            'type': 'glide',
		    'html': `
<div class="is-section is-section-100 type-poppins">
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-660">

			<div class="row">
				<div class="column">
					<h1 class="font-normal leading-11 text-left size-72">We Create Simple and Effective Designs</h1>
				</div>

			</div>
			<div class="row">
				<div class="column">
					<div class="spacer height-40"></div>
				</div>

			</div>

			<div class="row">
				<div class="column">
					<div class="button-group text-left">
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
					</div>
				</div>

			</div>

		</div>
	</div>
	<div class="is-box-6 is-box is-align-left is-light-text is-content-top box-autofit min-height-60">
		<div class="is-overlay">
			<div class="is-overlay-content content-selectable" data-dialog-width="1200px" data-dialog-height="900px" data-module="slider-box" data-module-desc="Slider" data-html="${encodeURIComponent(`
				<div id="{id}" class="glide cover" style="display:none">
					<div data-glide-el="track" class="glide__track">
						<ul class="glide__slides">
							<li class="glide__slide">
								<div><img src="[%IMAGE_PATH%]images/ai-ZRZ1o.jpg" alt=""></div>
							</li>
							<li class="glide__slide">
								<div><img src="[%IMAGE_PATH%]images/ai-ivza1.jpg" alt=""></div>
							</li>
						</ul>
					</div>
					<div class="glide__arrows" data-glide-el="controls">
						<button class="glide__arrow glide__arrow--left" data-glide-dir="<">
							<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>
							</svg>
						</button>
						<button class="glide__arrow glide__arrow--right" data-glide-dir=">">
							<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
							</svg>
						</button>
					</div>
				</div>
				<script>
					var svgDef = '<svg width="0" height="0" style="position:absolute;display:none;">' +
						'<defs>' +
							'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-left">' +
								'<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>' +
							'</symbol>' +
							'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-right">' +
								'<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>' +
							'</symbol>' +
						'</defs>' +
					'</svg>';
					var pre = document.querySelector('#ion-ios-arrow-left');
					if(!pre) {
						document.body.insertAdjacentHTML('beforeend', svgDef);
					}
					
					var docReady = function(fn) {
						var stateCheck = setInterval(function() {
							//if (typeof Glide === 'undefined') return;
							var waitSlider = false;
							if(typeof Glide !== 'undefined') {
								if((new Glide).mount) {
									// Do Nothing 
								}  else {
									waitSlider = true;
								}
							} else {
								waitSlider = true;
							}
							if(waitSlider) return;

							clearInterval(stateCheck);

								fn();

						}, 1);
					};
					docReady(function() {
						const glideSlide = document.querySelector("#{id}");
						if(!glideSlide) return;
						glideSlide.style.display="";

						var _{id} = new Glide("#{id}", {
							type: "carousel",
							autoplay: false,
							animationDuration: 1000,
							gap: 0,
							perView: 1,
							hoverpause: false,
							arrow: true,
							dots: false,
							breakpoints: {
								970: {
									perView: 1,
									gap: 0
								}
							},
						}).mount();

						const glideElement = {id};
						let isSliderRunning = false;
						const manageSliderVisibility = (entries) => {
							if (entries[0].isIntersecting) {
								if (!isSliderRunning) {
									_{id}.update({ autoplay: 3000 });
									isSliderRunning = true;
								}
							} else {
								if (isSliderRunning) {
									_{id}.update({ autoplay: false }); 
									isSliderRunning = false;
								}
							}
						}
						const observer = new IntersectionObserver(manageSliderVisibility, { threshold: 0.5 });
						observer.observe(glideElement);

					});
				</script>
			`)}" data-settings="${encodeURIComponent(`
				{
					"type": "carousel",
					"autoplay": 3000,
					"animationDuration":1000,
					"gap":0,
					"perView":1,
					"hoverpause": false,
					"arrow":true,
					"dots":false,
					"fit":"cover",
					"images":
						[
							{
								"src": "[%IMAGE_PATH%]images/ai-ZRZ1o.jpg", 
								"caption": "", "style": ""
							},
							{
								"src": "[%IMAGE_PATH%]images/ai-ivza1.jpg", 
								"caption": "", "style": ""
							}
						]
				}
			`)}">
				
			</div>
		</div>
	</div>
			</div>
`
		},

		{
		    'thumbnail': 'preview/slider-03.png',
		    'category': '6',
            'type': 'glide',
		    'html': `
<div class="is-section is-section-100 type-poppins">
	<div class="is-box-6 is-box is-align-left is-light-text is-content-top box-autofit min-height-60">
		<div class="is-overlay">
			<div class="is-overlay-content content-selectable" data-dialog-width="1200px" data-dialog-height="900px" data-module="slider-box" data-module-desc="Slider" data-html="${encodeURIComponent(`
				<div id="{id}" class="glide cover" style="display:none">
					<div data-glide-el="track" class="glide__track">
						<ul class="glide__slides">
							<li class="glide__slide">
								<div><img src="[%IMAGE_PATH%]images/ai-piemS.jpg" alt=""></div>
							</li>
							<li class="glide__slide">
								<div><img src="[%IMAGE_PATH%]images/ai-ZRZ1o.jpg" alt=""></div>
							</li>
						</ul>
					</div>
					<div class="glide__arrows" data-glide-el="controls">
						<button class="glide__arrow glide__arrow--left" data-glide-dir="<">
							<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>
							</svg>
						</button>
						<button class="glide__arrow glide__arrow--right" data-glide-dir=">">
							<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
							</svg>
						</button>
					</div>
				</div>
				<script>
					var svgDef = '<svg width="0" height="0" style="position:absolute;display:none;">' +
						'<defs>' +
							'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-left">' +
								'<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>' +
							'</symbol>' +
							'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-right">' +
								'<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>' +
							'</symbol>' +
						'</defs>' +
					'</svg>';
					var pre = document.querySelector('#ion-ios-arrow-left');
					if(!pre) {
						document.body.insertAdjacentHTML('beforeend', svgDef);
					}
					
					var docReady = function(fn) {
						var stateCheck = setInterval(function() {
							//if (typeof Glide === 'undefined') return;
							var waitSlider = false;
							if(typeof Glide !== 'undefined') {
								if((new Glide).mount) {
									// Do Nothing 
								}  else {
									waitSlider = true;
								}
							} else {
								waitSlider = true;
							}
							if(waitSlider) return;

							clearInterval(stateCheck);

								fn();

						}, 1);
					};
					docReady(function() {
						const glideSlide = document.querySelector("#{id}");
						if(!glideSlide) return;
						glideSlide.style.display="";

						var _{id} = new Glide("#{id}", {
							type: "carousel",
							autoplay: false,
							animationDuration: 1000,
							gap: 0,
							perView: 1,
							hoverpause: false,
							arrow: true,
							dots: false,
							breakpoints: {
								970: {
									perView: 1,
									gap: 0
								}
							},
						}).mount();

						const glideElement = {id};
						let isSliderRunning = false;
						const manageSliderVisibility = (entries) => {
							if (entries[0].isIntersecting) {
								if (!isSliderRunning) {
									_{id}.update({ autoplay: 3000 });
									isSliderRunning = true;
								}
							} else {
								if (isSliderRunning) {
									_{id}.update({ autoplay: false }); 
									isSliderRunning = false;
								}
							}
						}
						const observer = new IntersectionObserver(manageSliderVisibility, { threshold: 0.5 });
						observer.observe(glideElement);

					});
				</script>
			`)}" data-settings="${encodeURIComponent(`
				{
					"type": "carousel",
					"autoplay": 3000,
					"animationDuration":1000,
					"gap":0,
					"perView":1,
					"hoverpause": false,
					"arrow":true,
					"dots":false,
					"fit":"cover",
					"images":
						[
							{
								"src": "[%IMAGE_PATH%]images/ai-piemS.jpg", 
								"caption": "", "style": ""
							},
							{
								"src": "[%IMAGE_PATH%]images/ai-ZRZ1o.jpg", 
								"caption": "", "style": ""
							}
						]
				}
			`)}">
				
			</div>
		</div>
	</div>
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-660">

			<div class="row">
				<div class="column">
					<h1 class="font-normal leading-11 text-left size-72">We Create Simple and Effective Designs</h1>
				</div>

			</div>
			<div class="row">
				<div class="column">
					<div class="spacer height-40"></div>
				</div>

			</div>

			<div class="row">
				<div class="column">
					<div class="button-group text-left">
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
					</div>
				</div>

			</div>

		</div>
	</div>
</div>
`
		},

		{
		    'thumbnail': 'preview/slider-04.png',
		    'category': '6',
            'type': 'glide',
		    'html': `
<div class="is-section is-box is-align-left is-light-text type-opensans is-section-70">
	<div class="is-overlay">
		<div class="is-overlay-content content-selectable" data-dialog-width="1200px" data-dialog-height="900px" data-module="slider-box" data-module-desc="Slider" data-html="${encodeURIComponent(`
			<div id="{id}" class="glide cover" style="display:none">
				<div data-glide-el="track" class="glide__track">
					<ul class="glide__slides">
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-12lpz.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-SxNd4.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-3n6en.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-iB5kH.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-yUTa6.jpg" alt=""></div>
						</li>
					</ul>
				</div>
				<div class="glide__arrows" data-glide-el="controls">
					<button class="glide__arrow glide__arrow--left" data-glide-dir="<">
						<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
							<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>
						</svg>
					</button>
					<button class="glide__arrow glide__arrow--right" data-glide-dir=">">
						<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
							<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
						</svg>
					</button>
				</div>
			</div>
			<script>
				var svgDef = '<svg width="0" height="0" style="position:absolute;display:none;">' +
					'<defs>' +
						'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-left">' +
							'<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>' +
						'</symbol>' +
						'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-right">' +
							'<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>' +
						'</symbol>' +
					'</defs>' +
				'</svg>';
				var pre = document.querySelector('#ion-ios-arrow-left');
				if(!pre) {
					document.body.insertAdjacentHTML('beforeend', svgDef);
				}
				
				var docReady = function(fn) {
					var stateCheck = setInterval(function() {
						//if (typeof Glide === 'undefined') return;
						var waitSlider = false;
						if(typeof Glide !== 'undefined') {
							if((new Glide).mount) {
								// Do Nothing 
							}  else {
								waitSlider = true;
							}
						} else {
							waitSlider = true;
						}
						if(waitSlider) return;

						clearInterval(stateCheck);

							fn();

					}, 1);
				};
				docReady(function() {
					const glideSlide = document.querySelector("#{id}");
					if(!glideSlide) return;
					glideSlide.style.display="";

					var _{id} = new Glide("#{id}", {
						type: "carousel",
						autoplay: false,
						animationDuration: 1000,
						gap: 0,
						perView: 3,
						hoverpause: false,
						arrow: true,
						dots: false,
						breakpoints: {
							970: {
								perView: 1,
								gap: 0
							}
						},
					}).mount();

					const glideElement = {id};
					let isSliderRunning = false;
					const manageSliderVisibility = (entries) => {
						if (entries[0].isIntersecting) {
							if (!isSliderRunning) {
								_{id}.update({ autoplay: 3000 });
								isSliderRunning = true;
							}
						} else {
							if (isSliderRunning) {
								_{id}.update({ autoplay: false }); 
								isSliderRunning = false;
							}
						}
					}
					const observer = new IntersectionObserver(manageSliderVisibility, { threshold: 0.5 });
					observer.observe(glideElement);

				});
			</script>
		`)}" data-settings="${encodeURIComponent(`
			{
				"type": "carousel",
				"autoplay": 3000,
				"animationDuration":1000,
				"gap":0,
				"perView":3,
				"hoverpause": false,
				"arrow":true,
				"dots":false,
				"fit":"cover",
				"images":
					[
						{
							"src": "[%IMAGE_PATH%]images/ai-12lpz.jpg", 
							"caption": "", "style": ""
						},
						{
							"src": "[%IMAGE_PATH%]images/ai-SxNd4.jpg", 
							"caption": "", "style": ""
						},
						{
							"src": "[%IMAGE_PATH%]images/ai-3n6en.jpg", 
							"caption": "", "style": ""
						},
						{
							"src": "[%IMAGE_PATH%]images/ai-iB5kH.jpg", 
							"caption": "", "style": ""
						},
						{
							"src": "[%IMAGE_PATH%]images/ai-yUTa6.jpg", 
							"caption": "", "style": ""
						}
					]
			}
		`)}">
			
		</div>
	</div>
</div>
`
		},
		
		{
		    'thumbnail': 'preview/slider-05.png',
		    'category': '6',
            'type': 'glide',
		    'html': `
<div class="is-section is-box type-poppins is-section-50 box-autofit">
	<div class="is-overlay"></div>
	<div class="is-container v2 is-content-700 leading-14 size-18">
		<div class="row">
			<div class="column">
				<h1 class="normal-case font-light size-48 text-center">Designing and building highly-crafted brands and websites.</h1>
			</div>
		</div>
		<div class="row">
			<div class="column">
				<div class="spacer height-20"></div>
			</div>
		</div>
		<div class="row">
			<div class="column">
				<div class="text-center button-group">
					<a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 uppercase py-2 size-14 px-8 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-125">Read More</a>
					<a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 uppercase py-2 size-14 px-8 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-125" style="background-color: rgb(240, 240, 240);">Get Started</a>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="is-section is-section-50 is-box is-align-left type-poppins is-light-text section-flow">
	<div class="is-overlay">
		<div class="is-overlay-content content-selectable" data-dialog-width="1200px" data-dialog-height="900px" data-module="coverflow-box" data-module-desc="Coverflow" data-html="${encodeURIComponent(`
			<div id="{id}" class="glide cover coverflow" style="display:none">
				<div data-glide-el="track" class="glide__track">
					<ul class="glide__slides">
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-iB5kH.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-yUTa6.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-3P8gX.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-1iAIm.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-ZRZ1o.jpg" alt=""></div>
						</li>
						<li class="glide__slide">
							<div><img src="[%IMAGE_PATH%]images/ai-M6QMW.jpg" alt=""></div>
						</li>
					</ul>
				</div>
				<div class="glide__arrows" data-glide-el="controls">
					<button class="glide__arrow glide__arrow--left" data-glide-dir="<">
						<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
							<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>
						</svg>
					</button>
					<button class="glide__arrow glide__arrow--right" data-glide-dir=">">
						<svg style="width:4.3vw;height:4.3vw;" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
							<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
						</svg>
					</button>
				</div>
			</div>
			<script>
				var svgDef = '<svg width="0" height="0" style="position:absolute;display:none;">' +
					'<defs>' +
						'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-left">' +
							'<path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path>' +
						'</symbol>' +
						'<symbol viewBox="0 0 512 512" id="ion-ios-arrow-right">' +
							'<path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>' +
						'</symbol>' +
					'</defs>' +
				'</svg>';
				var pre = document.querySelector('#ion-ios-arrow-left');
				if(!pre) {
					document.body.insertAdjacentHTML('beforeend', svgDef);
				}
				
				var docReady = function(fn) {
					var stateCheck = setInterval(function() {
						//if (typeof Glide === 'undefined') return;
						var waitSlider = false;
						if(typeof Glide !== 'undefined') {
							if((new Glide).mount) {
								// Do Nothing 
							}  else {
								waitSlider = true;
							}
						} else {
							waitSlider = true;
						}
						if(waitSlider) return;

						clearInterval(stateCheck);

							fn();

					}, 1);
				};
				docReady(function() {
					const glideSlide = document.querySelector("#{id}");
					if(!glideSlide) return;
					glideSlide.style.display="";

					const glideSlides = document.querySelectorAll('#{id} .glide__slide');

					const perView = 3;

					glideSlides.forEach(slide=>{
						let video = slide.querySelector('video');
						if(video) changeVideo(video);
					});

					window.addEventListener('resize', ()=>{
						glideSlides.forEach(slide=>{
							let video = slide.querySelector('video');
							if(video) changeVideo(video);
						});
					});

					function changeVideo(video) {
						if(!video) return;
						let changed=false;
						let source = video.querySelector('source');
						let vidDefault = source.getAttribute('data-default');
						let vid240 = source.getAttribute('data-240');
						let vid360 = source.getAttribute('data-360');
						let vid480 = source.getAttribute('data-480');
						let vid540 = source.getAttribute('data-540');
						let vid720 = source.getAttribute('data-720');
						let vid1080 = source.getAttribute('data-1080');
						let vid1440 = source.getAttribute('data-1440');
						let vid2160 = source.getAttribute('data-2160');
						let vW = window.innerWidth;
						if(vW<=426) {
							if(vid240) {
								if(source.getAttribute('src')!==vid240) {
									source.setAttribute('src', vid240);changed=true;
								} else return;
							}
							else if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (426<vW && vW<=640) {
							if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (640<vW && vW<=854) {
							if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (854<vW && vW<=960) {
							if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (vW>960 && vW<=1280) {
							if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (1280<vW && vW<=1920) {
							if(vid1080) {
								if(source.getAttribute('src')!==vid1080) {
									source.setAttribute('src', vid1080);changed=true;
								} else return;
							}
						} else if (1920<vW && vW<=2560) {
							if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						} else if (2560<vW) {
							if(vid2160) {
								if(source.getAttribute('src')!==vid2160) {
									source.setAttribute('src', vid2160);changed=true;
								} else return;
							}
							else if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						}
						
						if(changed) {
							video.pause();
							video.currentTime = 0;
							video.load();
							if(video.closest('.play')) {
								video.play();
							}
						} else {
							if(source.getAttribute('src')!==vidDefault) {
								video.pause();
								video.currentTime = 0;
								source.setAttribute('src', vidDefault);
								video.load();
							} 
						}
					}

					function stopVideo(slide) {
						const video = slide.querySelector('video');
						if(video) {
							video.pause();
							video.currentTime = 0;
						}
						slide.classList.remove('active');
						slide.classList.remove('play');
					}

					function playVideo(slide) {
						let video = slide.querySelector('video');
						if(video) {
							video.play();
						}
						slide.classList.add('play');
					}
					
					function coverflow(index) {
						let activeSlide = glideSlides[index];
						let nextSlide = activeSlide.nextElementSibling;
						let next2Slide;
						if(nextSlide) next2Slide = nextSlide.nextElementSibling;
						let next3Slide;
						if(next2Slide) next3Slide = next2Slide.nextElementSibling;

						activeSlide.classList.remove('glide__slide--previous');
						activeSlide.classList.remove('glide__slide--following');

						if(activeSlide.nextElementSibling) {
							activeSlide.nextElementSibling.classList.remove('glide__slide--previous');
							activeSlide.nextElementSibling.classList.remove('glide__slide--following');
							activeSlide.nextElementSibling.classList.add('glide__slide--following');
						}

						if(activeSlide.previousElementSibling) {
							activeSlide.previousElementSibling.classList.remove('glide__slide--previous');
							activeSlide.previousElementSibling.classList.remove('glide__slide--following');
							activeSlide.previousElementSibling.classList.add('glide__slide--previous');
						}

						playVideo(activeSlide);

						activeSlide.classList.add('active');

						let elms = activeSlide.parentNode.querySelectorAll('.glide__slide');
						elms.forEach(elm=>{
							if(elm===activeSlide) return;

							stopVideo(elm);
						});

						const slider = activeSlide.closest('.glide');
						slider.classList.add('running');
					}
					
					let myslider = document.querySelector("#{id}");
					let _{id} = new Glide(myslider, {
						type: "slider",
						autoplay: false,
						animationDuration: 600,
						gap: 0,
						perView: 3,
						startAt: 1,
						hoverpause: false,
						arrow: true,
						dots: false,
						breakpoints: {
							575: {
								perView: 1,
								peek: 50
							},

							414: {
								perView: 1,
								peek: 40
							},

							360: {
								perView: 1,
								peek: 30
							}
						},
						focusAt: "center",
					});


					_{id}.on('mount.after', function () {
						coverflow(_{id}.index, true);
					});

					_{id}.on('run', function (event) {
						coverflow(_{id}.index);
					});

					_{id}.mount();

					const glideElement = {id};
					let isSliderRunning = false;
					const manageSliderVisibility = (entries) => {
						if (entries[0].isIntersecting) {
							if (!isSliderRunning) {
								_{id}.update({ autoplay: 3000 });
								isSliderRunning = true;
							}
						} else {
							if (isSliderRunning) {
								_{id}.update({ autoplay: false }); 
								isSliderRunning = false;
							}
						}
					}
					const observer = new IntersectionObserver(manageSliderVisibility, { threshold: 0.5 });
					observer.observe(glideElement);

				});
			</script>
		`)}" data-settings="${encodeURIComponent(`
			{
				"type": "slider",
				"autoplay": 3000,
				"animationDuration":600,
				"gap":0,
				"perView":3,
				"hoverpause": false,
				"arrow":true,
				"dots":false,
				"fit":"cover",
				"images":
				[
					{
						"src": "[%IMAGE_PATH%]images/ai-iB5kH.jpg", 
						"caption": "", "style": ""
					},
					{
						"src": "[%IMAGE_PATH%]images/ai-yUTa6.jpg", 
						"caption": "", "style": ""
					},
					{
						"src": "[%IMAGE_PATH%]images/ai-3P8gX.jpg", 
						"caption": "", "style": ""
					},
					{
						"src": "[%IMAGE_PATH%]images/ai-1iAIm.jpg", 
						"caption": "", "style": ""
					},
					{
						"src": "[%IMAGE_PATH%]images/ai-ZRZ1o.jpg", 
						"caption": "", "style": ""
					},
					{
						"src": "[%IMAGE_PATH%]images/ai-M6QMW.jpg", 
						"caption": "", "style": ""
					}
				]
			}
		`)}">
			
		</div>
	</div>
</div>
`
		},

        /* SLICK SLIDER */

		{
		    'thumbnail': 'preview/slider-01.png',
		    'category': '6',
			'type': 'slick',
		    'html': `
<div class="is-section is-section-100 is-box is-align-left type-poppins is-light-text">
	<div class="is-overlay">
		<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="${encodeURIComponent(`
			<div id="{id}" class="slider-on-box" style="width:100%;height:100%;">
				<div class="is-boxes slider-image" style="background-image: url('[%IMAGE_PATH%]images/ai-SgghV.jpg');">
				</div>
				<div class="is-boxes slider-image" style="background-image: url('[%IMAGE_PATH%]images/ai-iB5kH.jpg');">
				</div>
			</div>

			<script>
				var docReady = function (fn) {
					var stateCheck = setInterval(function () {
						if (document.readyState !== "complete") return;
						clearInterval(stateCheck);
						fn()
					}, 1);
				};
				docReady(function () {
					jQuery("#{id}").slick({
						dots: false,
						arrows: true,
						infinite: true,
						speed: 500,
						cssEase: "linear",
						slidesToShow: 1,
						autoplay: true,
						autoplaySpeed: 3000,
						fade: false,
						adaptiveHeight: true
					});
				});
			</script>
			`)}" data-settings="${encodeURIComponent(`[{
			"auto":true,
			"arrow":true,
			"dots":false,
			"fade":false,
			"images":
				[
					{
						"src": "[%IMAGE_PATH%]images/ai-SgghV.jpg", 
						"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"
					},
					{
						"src": "[%IMAGE_PATH%]images/ai-iB5kH.jpg", 
						"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"
					}
				]
		}]`)}">
		</div>
	</div>
	<div class="is-container v2 size-17 leading-13 is-content-960 is-content-left edge-x-4" style="transition: all 0.3s ease-out 0s;">
		<div class="row">
			<div class="column">
				<h1 class="text-center font-normal leading-11 size-72">We Create Simple and Effective Designs</h1>
			</div>

		</div>
		<div class="row">
			<div class="column">
				<div class="spacer height-40"></div>
			</div>

		</div>
		<div class="row">
			<div class="column">
				<div class="text-center button-group">
					<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed tracking-wide rounded-full" title="" style="color: rgb(255, 255, 255);">Our Works</a>
					<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-9 font-normal leading-relaxed border-transparent rounded-full size-18 tracking-wide hover:border-transparent" title="" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Get in Touch</a>
				</div>
			</div>

		</div>
	</div>
</div>
`
		},

		{
			'thumbnail': 'preview/slider-02.png',
			'category': '6',
			'googleFonts': [],
			'type': 'slick',
			'html': `
<div class="is-section is-section-100 type-poppins">
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-660">
			<div class="row">
				<div class="column">
					<h1 class="font-normal leading-11 text-left size-72">We Create Simple and Effective Designs</h1>
				</div>
			</div>
			<div class="row">
				<div class="column">
					<div class="spacer height-40"></div>
				</div>
			</div>
			<div class="row">
				<div class="column">
					<div class="button-group text-left">
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="is-box-6 is-box is-align-left is-light-text is-content-top">
		<div class="is-overlay">
			<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="${encodeURIComponent(`
				<div id="{id}" class="slider-on-box" style="width:100%;height:100%;">
					<div class="is-boxes slider-image" style="background-image: url('[%IMAGE_PATH%]images/ai-ZRZ1o.jpg');">
					</div>
					<div class="is-boxes slider-image" style="background-image: url('[%IMAGE_PATH%]images/ai-ivza1.jpg');">
					</div>
				</div>
				<script>
					var docReady = function (fn) {
						var stateCheck = setInterval(function () {
							if (document.readyState !== "complete") return;
							clearInterval(stateCheck);
						fn()
						}, 1);
					};
					docReady(function () {
						jQuery("#{id}").slick({
							dots: false,
							arrows: true,
							infinite: true,
							speed: 500,
							cssEase: "linear",
							slidesToShow: 1,
							autoplay: true,
							autoplaySpeed: 3000,
							fade: false,
							adaptiveHeight: true
						});
					});
				</script>
				`)}" data-settings="${encodeURIComponent(`[{
				"auto":true,
				"arrow":true,
				"dots":false,
				"fade":false,
				"images":
					[
						{
							"src": "[%IMAGE_PATH%]images/ai-ZRZ1o.jpg", 
							"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"
						},
						{
							"src": "[%IMAGE_PATH%]images/ai-ivza1.jpg", 
							"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"
						}
					]
			}]`)}">
			</div>
		</div>
	</div>
</div>
`
		},
	
		{
		    'thumbnail': 'preview/slider-03.png',
		    'category': '6',
            'type': 'slick',
		    'html': `
<div class="is-section is-section-100 type-poppins">
	<div class="is-box-6 is-box is-align-left is-content-top is-light-text">
		<div class="is-overlay">
			<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="${encodeURIComponent(`
				<div id="{id}" class="slider-on-box" style="width:100%;height:100%;">
					<div class="is-boxes slider-image" style="background-image: url('[%IMAGE_PATH%]images/ai-piemS.jpg');">
					</div>
					<div class="is-boxes slider-image" style="background-image: url('[%IMAGE_PATH%]images/ai-ZRZ1o.jpg');">
					</div>
				</div>

				<script>
					var docReady = function (fn) {
						var stateCheck = setInterval(function () {
							if (document.readyState !== "complete") return;
							clearInterval(stateCheck);
						fn()
						}, 1);
					};
					docReady(function () {
						jQuery("#{id}").slick({
							dots: false,
							arrows: true,
							infinite: true,
							speed: 500,
							cssEase: "linear",
							slidesToShow: 1,
							autoplay: true,
							autoplaySpeed: 3000,
							fade: false,
							adaptiveHeight: true
						});
					});
				</script>
				`)}" data-settings="${encodeURIComponent(`[{
				"auto":true,
				"arrow":true,
				"dots":false,
				"fade":false,
				"images":
					[
						{
							"src": "[%IMAGE_PATH%]images/ai-piemS.jpg", 
							"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"
						},
						{
							"src": "[%IMAGE_PATH%]images/ai-ZRZ1o.jpg", 
							"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"
						}
					]
			}]`)}">
			</div>
		</div>
	</div>
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-660">

			<div class="row">
				<div class="column">
					<h1 class="font-normal leading-11 text-left size-72">We Create Simple and Effective Designs</h1>
				</div>

			</div>
			<div class="row">
				<div class="column">
					<div class="spacer height-40"></div>
				</div>

			</div>

			<div class="row">
				<div class="column">
					<div class="button-group text-left">
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
					</div>
				</div>

			</div>

		</div>
	</div>
</div>
`
		},
			
		/* VIDEO */

		{
		    'thumbnail': 'preview/video-01.webp',
		    'category': '6',
		    'html': `
			<div class="is-section is-section-100 is-box is-light-text type-poppins box-autofit min-height-60">
				<div class="is-overlay">
					<div class="is-overlay-content content-selectable" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="600px" data-html="${encodeURIComponent(`
			<video id="{id}" class="is-video-bg" muted loop playsinline autoplay>
                <source src="[%IMAGE_PATH%]videos/blank.mp4" data-default="[%IMAGE_PATH%]videos/beach1.mp4">
            </video>
            <div class="is-overlay-video" style="opacity:0.05"></div>
            <script>
			var docReady = function(fn) {
				var stateCheck = setInterval(function() {
					if (document.readyState === "interactive" || document.readyState === "complete") {
						clearInterval(stateCheck);
						try {
							fn()
						} catch (e) {}
					} 
				}, 1);
			};

			docReady(function() {
				
				let video = document.querySelector('#{id}');

				const changeVideo = (video) => {
					if(!video) return;
					let currentlyPlaying;
					if (video.paused) {
						currentlyPlaying = false;
					} else {
						currentlyPlaying = true;
					}
					let changed=false;
					let source = video.querySelector('source');
					let vidDefault = source.getAttribute('data-default');
					let vid240 = source.getAttribute('data-240');
					let vid360 = source.getAttribute('data-360');
					let vid480 = source.getAttribute('data-480');
					let vid540 = source.getAttribute('data-540');
					let vid720 = source.getAttribute('data-720');
					let vid1080 = source.getAttribute('data-1080');
					let vid1440 = source.getAttribute('data-1440');
					let vid2160 = source.getAttribute('data-2160');
					let vW = window.innerWidth;
					if(vW<=426) {
						if(vid240) {
							if(source.getAttribute('src')!==vid240) {
								source.setAttribute('src', vid240);changed=true;
							} else return;
						}
						else if(vid360) {
							if(source.getAttribute('src')!==vid360) {
								source.setAttribute('src', vid360);changed=true;
							} else return;
						}
						else if(vid480) {
							if(source.getAttribute('src')!==vid480) {
								source.setAttribute('src', vid480);changed=true;
							} else return;
						}
						else if(vid540) {
							if(source.getAttribute('src')!==vid540) {
								source.setAttribute('src', vid540);changed=true;
							} else return;
						}
						else if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (426<vW && vW<=640) {
						if(vid360) {
							if(source.getAttribute('src')!==vid360) {
								source.setAttribute('src', vid360);changed=true;
							} else return;
						}
						else if(vid480) {
							if(source.getAttribute('src')!==vid480) {
								source.setAttribute('src', vid480);changed=true;
							} else return;
						}
						else if(vid540) {
							if(source.getAttribute('src')!==vid540) {
								source.setAttribute('src', vid540);changed=true;
							} else return;
						}
						else if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (640<vW && vW<=854) {
						if(vid480) {
							if(source.getAttribute('src')!==vid480) {
								source.setAttribute('src', vid480);changed=true;
							} else return;
						}
						else if(vid540) {
							if(source.getAttribute('src')!==vid540) {
								source.setAttribute('src', vid540);changed=true;
							} else return;
						}
						else if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (854<vW && vW<=960) {
						if(vid540) {
							if(source.getAttribute('src')!==vid540) {
								source.setAttribute('src', vid540);changed=true;
							} else return;
						}
						else if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (vW>960 && vW<=1280) {
						if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (1280<vW && vW<=1920) {
						if(vid1080) {
							if(source.getAttribute('src')!==vid1080) {
								source.setAttribute('src', vid1080);changed=true;
							} else return;
						}
					} else if (1920<vW && vW<=2560) {
						if(vid1440) {
							if(source.getAttribute('src')!==vid1440) {
								source.setAttribute('src', vid1440);changed=true;
							} else return;
						}
					} else if (2560<vW) {
						if(vid2160) {
							if(source.getAttribute('src')!==vid2160) {
								source.setAttribute('src', vid2160);changed=true;
							} else return;
						}
						else if(vid1440) {
							if(source.getAttribute('src')!==vid1440) {
								source.setAttribute('src', vid1440);changed=true;
							} else return;
						}
					}
					
					let videoLoad = false;
					if(changed) {
						video.pause();
						video.currentTime = 0;
						video.load();
						videoLoad = true;
					} else {
						if(source.getAttribute('src')!==vidDefault) {
							video.pause();
							video.currentTime = 0;
							source.setAttribute('src', vidDefault);
							video.load();
							videoLoad = true;
						} 
					}

					if(!video) return;

					if(videoLoad) if(video.autoplay) {
						video.pause();
						video.currentTime = 0;
						// video.play();
						let overlay = video.closest('.is-box');
						let btnPlay = overlay.querySelector('.video-bg-play');
						btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
						let btnAudio = overlay.querySelector('.video-audio-play');
						btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
					}

					if(videoLoad) if(currentlyPlaying) {
						video.play();
					}
				};
				
				changeVideo(video);

				let debounce = (func) => {
					var timer;
					return function(event){
						if(timer) clearTimeout(timer);
						timer = setTimeout(func,100,event);
					};
				}
				let viewportWidth = window.innerWidth;
				window.addEventListener('resize',debounce(function(e){
					if (window.innerWidth != viewportWidth) {

						viewportWidth = window.innerWidth;

						if(video) changeVideo(video);
					}
				}));

				let overlay = video.closest('.is-box');
				let btnPlay = overlay.querySelector('.video-bg-play');
				btnPlay.addEventListener('click', (e)=>{
					if (video.paused) {
						video.play();
						btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
					} else {
						video.pause();
						btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-play"></use></svg>';
					}
					e.preventDefault();
					e.stopImmediatePropagation();
				});
				let btnAudio = overlay.querySelector('.video-audio-play');
				btnAudio.addEventListener('click', (e)=>{
					if (video.muted) {
						video.muted = false;
						btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume"></use></svg>';
					} else {
						video.muted = true;
						btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
					}
					e.preventDefault();
					e.stopImmediatePropagation();
				});
			});
            </script>
			
					`)}" data-settings="${encodeURIComponent(`
						[{ "mp4": "[%IMAGE_PATH%]videos/beach1.mp4", "poster": "", "overlay": 0.05}]
						`)}">

					</div>
				</div>
				
			</div>
`
		},

		{
		    'thumbnail': 'preview/video-02.webp',
		    'category': '6',
		    'html': `
			<div class="is-section is-section-100 is-box is-light-text type-poppins box-autofit min-height-60">
				<div class="is-overlay">
					<div class="is-overlay-content content-selectable" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="600px" data-html="${encodeURIComponent(`
			
			<video id="{id}" class="is-video-bg" muted loop playsinline autoplay>
                <source src="[%IMAGE_PATH%]videos/blank.mp4" data-default="[%IMAGE_PATH%]videos/ai-DIhYA.mp4">
            </video>
            <div class="is-overlay-video" style="opacity:0.15"></div>
            <script>
			var docReady = function(fn) {
				var stateCheck = setInterval(function() {
					if (document.readyState === "interactive" || document.readyState === "complete") {
						clearInterval(stateCheck);
						try {
							fn()
						} catch (e) {}
					} 
				}, 1);
			};

			docReady(function() {
				
				let video = document.querySelector('#{id}');

				const changeVideo = (video) => {
					if(!video) return;
					let currentlyPlaying;
					if (video.paused) {
						currentlyPlaying = false;
					} else {
						currentlyPlaying = true;
					}
					let changed=false;
					let source = video.querySelector('source');
					let vidDefault = source.getAttribute('data-default');
					let vid240 = source.getAttribute('data-240');
					let vid360 = source.getAttribute('data-360');
					let vid480 = source.getAttribute('data-480');
					let vid540 = source.getAttribute('data-540');
					let vid720 = source.getAttribute('data-720');
					let vid1080 = source.getAttribute('data-1080');
					let vid1440 = source.getAttribute('data-1440');
					let vid2160 = source.getAttribute('data-2160');
					let vW = window.innerWidth;
					if(vW<=426) {
						if(vid240) {
							if(source.getAttribute('src')!==vid240) {
								source.setAttribute('src', vid240);changed=true;
							} else return;
						}
						else if(vid360) {
							if(source.getAttribute('src')!==vid360) {
								source.setAttribute('src', vid360);changed=true;
							} else return;
						}
						else if(vid480) {
							if(source.getAttribute('src')!==vid480) {
								source.setAttribute('src', vid480);changed=true;
							} else return;
						}
						else if(vid540) {
							if(source.getAttribute('src')!==vid540) {
								source.setAttribute('src', vid540);changed=true;
							} else return;
						}
						else if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (426<vW && vW<=640) {
						if(vid360) {
							if(source.getAttribute('src')!==vid360) {
								source.setAttribute('src', vid360);changed=true;
							} else return;
						}
						else if(vid480) {
							if(source.getAttribute('src')!==vid480) {
								source.setAttribute('src', vid480);changed=true;
							} else return;
						}
						else if(vid540) {
							if(source.getAttribute('src')!==vid540) {
								source.setAttribute('src', vid540);changed=true;
							} else return;
						}
						else if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (640<vW && vW<=854) {
						if(vid480) {
							if(source.getAttribute('src')!==vid480) {
								source.setAttribute('src', vid480);changed=true;
							} else return;
						}
						else if(vid540) {
							if(source.getAttribute('src')!==vid540) {
								source.setAttribute('src', vid540);changed=true;
							} else return;
						}
						else if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (854<vW && vW<=960) {
						if(vid540) {
							if(source.getAttribute('src')!==vid540) {
								source.setAttribute('src', vid540);changed=true;
							} else return;
						}
						else if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (vW>960 && vW<=1280) {
						if(vid720) {
							if(source.getAttribute('src')!==vid720) {
								source.setAttribute('src', vid720);changed=true;
							} else return;
						}
					} else if (1280<vW && vW<=1920) {
						if(vid1080) {
							if(source.getAttribute('src')!==vid1080) {
								source.setAttribute('src', vid1080);changed=true;
							} else return;
						}
					} else if (1920<vW && vW<=2560) {
						if(vid1440) {
							if(source.getAttribute('src')!==vid1440) {
								source.setAttribute('src', vid1440);changed=true;
							} else return;
						}
					} else if (2560<vW) {
						if(vid2160) {
							if(source.getAttribute('src')!==vid2160) {
								source.setAttribute('src', vid2160);changed=true;
							} else return;
						}
						else if(vid1440) {
							if(source.getAttribute('src')!==vid1440) {
								source.setAttribute('src', vid1440);changed=true;
							} else return;
						}
					}
					
					let videoLoad = false;
					if(changed) {
						video.pause();
						video.currentTime = 0;
						video.load();
						videoLoad = true;
					} else {
						if(source.getAttribute('src')!==vidDefault) {
							video.pause();
							video.currentTime = 0;
							source.setAttribute('src', vidDefault);
							video.load();
							videoLoad = true;
						} 
					}

					if(!video) return;

					if(videoLoad) if(video.autoplay) {
						video.pause();
						video.currentTime = 0;
						// video.play();
						let overlay = video.closest('.is-box');
						let btnPlay = overlay.querySelector('.video-bg-play');
						btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
						let btnAudio = overlay.querySelector('.video-audio-play');
						btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
					}

					if(videoLoad) if(currentlyPlaying) {
						video.play();
					}
				};
				
				changeVideo(video);

				let debounce = (func) => {
					var timer;
					return function(event){
						if(timer) clearTimeout(timer);
						timer = setTimeout(func,100,event);
					};
				}
				let viewportWidth = window.innerWidth;
				window.addEventListener('resize',debounce(function(e){
					if (window.innerWidth != viewportWidth) {

						viewportWidth = window.innerWidth;

						if(video) changeVideo(video);
					}
				}));

				let overlay = video.closest('.is-box');
				let btnPlay = overlay.querySelector('.video-bg-play');
				btnPlay.addEventListener('click', (e)=>{
					if (video.paused) {
						video.play();
						btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
					} else {
						video.pause();
						btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-play"></use></svg>';
					}
					e.preventDefault();
					e.stopImmediatePropagation();
				});
				let btnAudio = overlay.querySelector('.video-audio-play');
				btnAudio.addEventListener('click', (e)=>{
					if (video.muted) {
						video.muted = false;
						btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume"></use></svg>';
					} else {
						video.muted = true;
						btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
					}
					e.preventDefault();
					e.stopImmediatePropagation();
				});
			});
            </script>
			
					`)}" data-settings="${encodeURIComponent(`
						[{ "mp4": "[%IMAGE_PATH%]videos/ai-DIhYA.mp4", "poster": "", "overlay": 0.15}]
						`)}">

					</div>
				</div>
				<div class="is-container v2 leading-13 is-content-1100 size-18">
                    <div class="row">
                        <div class="column">
                            <h1 class="text-center font-normal leading-11 size-72">We Create Simple and Effective Designs</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <div class="spacer height-40"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="column">
                            <div class="text-center button-group">
                                <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-7 font-normal leading-14 border-transparent rounded-full tracking-wide hover:border-transparent" title="" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Our Works</a>
                                <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-7 font-normal leading-14 border-transparent rounded-full tracking-wide hover:border-transparent" title="" style="color: rgb(255, 255, 255); background-color: rgb(255, 127, 0);">Get in Touch</a>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
`
		},

		{
		    'thumbnail': 'preview/video-03.webp',
		    'category': '6',
		    'html': `
<div class="is-section is-section-100 type-poppins">
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-620">
			<div class="row">
				<div class="column">
					<h1 class="font-normal leading-11 text-left size-72">We Create Simple and Effective Designs</h1>
				</div>

			</div>

			<div class="row">
				<div class="column">
					<div class="spacer height-40"></div>
				</div>

			</div>
			<div class="row">
				<div class="column">
					<div class="button-group text-left">
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
					</div>
				</div>

			</div>
		</div>
	</div>
	<div class="is-box-6 is-box is-light-text box-autofit min-height-50">
		<div class="is-overlay">
			<div class="is-overlay-content content-selectable" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="600px" data-html="${encodeURIComponent(`
				
				<video id="{id}" class="is-video-bg" muted loop playsinline autoplay>
					<source src="[%IMAGE_PATH%]videos/blank.mp4" data-default="[%IMAGE_PATH%]videos/ai-thhyR.mp4">
				</video>
				<div class="is-overlay-video" style="opacity:0.05"></div>
				<script>
				var docReady = function(fn) {
					var stateCheck = setInterval(function() {
						if (document.readyState === "interactive" || document.readyState === "complete") {
							clearInterval(stateCheck);
							try {
								fn()
							} catch (e) {}
						} 
					}, 1);
				};

				docReady(function() {
					
					let video = document.querySelector('#{id}');

					const changeVideo = (video) => {
						if(!video) return;
						let currentlyPlaying;
						if (video.paused) {
							currentlyPlaying = false;
						} else {
							currentlyPlaying = true;
						}
						let changed=false;
						let source = video.querySelector('source');
						let vidDefault = source.getAttribute('data-default');
						let vid240 = source.getAttribute('data-240');
						let vid360 = source.getAttribute('data-360');
						let vid480 = source.getAttribute('data-480');
						let vid540 = source.getAttribute('data-540');
						let vid720 = source.getAttribute('data-720');
						let vid1080 = source.getAttribute('data-1080');
						let vid1440 = source.getAttribute('data-1440');
						let vid2160 = source.getAttribute('data-2160');
						let vW = window.innerWidth;
						if(vW<=426) {
							if(vid240) {
								if(source.getAttribute('src')!==vid240) {
									source.setAttribute('src', vid240);changed=true;
								} else return;
							}
							else if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (426<vW && vW<=640) {
							if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (640<vW && vW<=854) {
							if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (854<vW && vW<=960) {
							if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (vW>960 && vW<=1280) {
							if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (1280<vW && vW<=1920) {
							if(vid1080) {
								if(source.getAttribute('src')!==vid1080) {
									source.setAttribute('src', vid1080);changed=true;
								} else return;
							}
						} else if (1920<vW && vW<=2560) {
							if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						} else if (2560<vW) {
							if(vid2160) {
								if(source.getAttribute('src')!==vid2160) {
									source.setAttribute('src', vid2160);changed=true;
								} else return;
							}
							else if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						}
						
						let videoLoad = false;
						if(changed) {
							video.pause();
							video.currentTime = 0;
							video.load();
							videoLoad = true;
						} else {
							if(source.getAttribute('src')!==vidDefault) {
								video.pause();
								video.currentTime = 0;
								source.setAttribute('src', vidDefault);
								video.load();
								videoLoad = true;
							} 
						}

						if(!video) return;

						if(videoLoad) if(video.autoplay) {
							video.pause();
							video.currentTime = 0;
							// video.play();
							let overlay = video.closest('.is-box');
							let btnPlay = overlay.querySelector('.video-bg-play');
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
							let btnAudio = overlay.querySelector('.video-audio-play');
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
						}

						if(videoLoad) if(currentlyPlaying) {
							video.play();
						}
					};
					
					changeVideo(video);

					let debounce = (func) => {
						var timer;
						return function(event){
							if(timer) clearTimeout(timer);
							timer = setTimeout(func,100,event);
						};
					}
					let viewportWidth = window.innerWidth;
					window.addEventListener('resize',debounce(function(e){
						if (window.innerWidth != viewportWidth) {

							viewportWidth = window.innerWidth;

							if(video) changeVideo(video);
						}
					}));

					let overlay = video.closest('.is-box');
					let btnPlay = overlay.querySelector('.video-bg-play');
					btnPlay.addEventListener('click', (e)=>{
						if (video.paused) {
							video.play();
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
						} else {
							video.pause();
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-play"></use></svg>';
						}
						e.preventDefault();
						e.stopImmediatePropagation();
					});
					let btnAudio = overlay.querySelector('.video-audio-play');
					btnAudio.addEventListener('click', (e)=>{
						if (video.muted) {
							video.muted = false;
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume"></use></svg>';
						} else {
							video.muted = true;
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
						}
						e.preventDefault();
						e.stopImmediatePropagation();
					});
				});
				</script>

			`)}" data-settings="${encodeURIComponent(`
				[{ "mp4": "[%IMAGE_PATH%]videos/ai-thhyR.mp4", "poster": "", "overlay": 0.05}]
				`)}">
			</div>
		</div>
	</div>
</div>
`
		},

		{
		    'thumbnail': 'preview/video-04.webp',
		    'category': '6',
		    'html': `
<div class="is-section is-section-100 type-poppins">
	<div class="is-box-6 is-box is-light-text box-autofit min-height-50">
		<div class="is-overlay">
			<div class="is-overlay-content content-selectable" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="600px" data-html="${encodeURIComponent(`
				
				<video id="{id}" class="is-video-bg" muted loop playsinline autoplay>
					<source src="[%IMAGE_PATH%]videos/blank.mp4" data-default="[%IMAGE_PATH%]videos/ai-xuSq2.mp4">
				</video>
				<div class="is-overlay-video" style="opacity:0.05"></div>
				<script>
				var docReady = function(fn) {
					var stateCheck = setInterval(function() {
						if (document.readyState === "interactive" || document.readyState === "complete") {
							clearInterval(stateCheck);
							try {
								fn()
							} catch (e) {}
						} 
					}, 1);
				};

				docReady(function() {
					
					let video = document.querySelector('#{id}');

					const changeVideo = (video) => {
						if(!video) return;
						let currentlyPlaying;
						if (video.paused) {
							currentlyPlaying = false;
						} else {
							currentlyPlaying = true;
						}
						let changed=false;
						let source = video.querySelector('source');
						let vidDefault = source.getAttribute('data-default');
						let vid240 = source.getAttribute('data-240');
						let vid360 = source.getAttribute('data-360');
						let vid480 = source.getAttribute('data-480');
						let vid540 = source.getAttribute('data-540');
						let vid720 = source.getAttribute('data-720');
						let vid1080 = source.getAttribute('data-1080');
						let vid1440 = source.getAttribute('data-1440');
						let vid2160 = source.getAttribute('data-2160');
						let vW = window.innerWidth;
						if(vW<=426) {
							if(vid240) {
								if(source.getAttribute('src')!==vid240) {
									source.setAttribute('src', vid240);changed=true;
								} else return;
							}
							else if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (426<vW && vW<=640) {
							if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (640<vW && vW<=854) {
							if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (854<vW && vW<=960) {
							if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (vW>960 && vW<=1280) {
							if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (1280<vW && vW<=1920) {
							if(vid1080) {
								if(source.getAttribute('src')!==vid1080) {
									source.setAttribute('src', vid1080);changed=true;
								} else return;
							}
						} else if (1920<vW && vW<=2560) {
							if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						} else if (2560<vW) {
							if(vid2160) {
								if(source.getAttribute('src')!==vid2160) {
									source.setAttribute('src', vid2160);changed=true;
								} else return;
							}
							else if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						}
						
						let videoLoad = false;
						if(changed) {
							video.pause();
							video.currentTime = 0;
							video.load();
							videoLoad = true;
						} else {
							if(source.getAttribute('src')!==vidDefault) {
								video.pause();
								video.currentTime = 0;
								source.setAttribute('src', vidDefault);
								video.load();
								videoLoad = true;
							} 
						}

						if(!video) return;

						if(videoLoad) if(video.autoplay) {
							video.pause();
							video.currentTime = 0;
							// video.play();
							let overlay = video.closest('.is-box');
							let btnPlay = overlay.querySelector('.video-bg-play');
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
							let btnAudio = overlay.querySelector('.video-audio-play');
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
						}

						if(videoLoad) if(currentlyPlaying) {
							video.play();
						}
					};
					
					changeVideo(video);

					let debounce = (func) => {
						var timer;
						return function(event){
							if(timer) clearTimeout(timer);
							timer = setTimeout(func,100,event);
						};
					}
					let viewportWidth = window.innerWidth;
					window.addEventListener('resize',debounce(function(e){
						if (window.innerWidth != viewportWidth) {

							viewportWidth = window.innerWidth;

							if(video) changeVideo(video);
						}
					}));

					let overlay = video.closest('.is-box');
					let btnPlay = overlay.querySelector('.video-bg-play');
					btnPlay.addEventListener('click', (e)=>{
						if (video.paused) {
							video.play();
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
						} else {
							video.pause();
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-play"></use></svg>';
						}
						e.preventDefault();
						e.stopImmediatePropagation();
					});
					let btnAudio = overlay.querySelector('.video-audio-play');
					btnAudio.addEventListener('click', (e)=>{
						if (video.muted) {
							video.muted = false;
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume"></use></svg>';
						} else {
							video.muted = true;
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
						}
						e.preventDefault();
						e.stopImmediatePropagation();
					});
				});
				</script>

			`)}" data-settings="${encodeURIComponent(`
				[{ "mp4": "[%IMAGE_PATH%]videos/ai-xuSq2.mp4", "poster": "", "overlay": 0.05}]
				`)}">
			</div>
		</div>
		
	</div>
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-620">
			<div class="row">
				<div class="column">
					<h1 class="font-normal leading-11 text-left size-72">We Create Simple and Effective Designs</h1>
				</div>

			</div>

			<div class="row">
				<div class="column">
					<div class="spacer height-40"></div>
				</div>

			</div>
			<div class="row">
				<div class="column">
					<div class="button-group text-left">
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
						<a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>
`
		},

		
		{
		    'thumbnail': 'preview/video-05.webp',
		    'category': '6',
		    'html': `
<div class="is-section type-poppins is-section-80">
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-500">
			<div class="row">
				<div class="column" style="min-height: 54px;">
					<h3 class="font-light text-center">Item Two</h3>
					<p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
					<div class="text-center button-group">
						<a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 mt-1 uppercase py-2 px-8 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-125 size-13" style="background-color: rgb(240, 240, 240);">Read More</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="is-box-6 is-box is-light-text box-autofit min-height-50">
		<div class="is-overlay">
			<div class="is-overlay-content content-selectable" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="600px" data-html="${encodeURIComponent(`

				<video id="{id}" class="is-video-bg" muted loop playsinline autoplay>
					<source src="[%IMAGE_PATH%]videos/blank.mp4" data-default="[%IMAGE_PATH%]videos/ai-EZe2u.mp4">
				</video>
				<div class="is-overlay-video" style="opacity:0.05"></div>
				<script>
				var docReady = function(fn) {
					var stateCheck = setInterval(function() {
						if (document.readyState === "interactive" || document.readyState === "complete") {
							clearInterval(stateCheck);
							try {
								fn()
							} catch (e) {}
						} 
					}, 1);
				};

				docReady(function() {
					
					let video = document.querySelector('#{id}');

					const changeVideo = (video) => {
						if(!video) return;
						let currentlyPlaying;
						if (video.paused) {
							currentlyPlaying = false;
						} else {
							currentlyPlaying = true;
						}
						let changed=false;
						let source = video.querySelector('source');
						let vidDefault = source.getAttribute('data-default');
						let vid240 = source.getAttribute('data-240');
						let vid360 = source.getAttribute('data-360');
						let vid480 = source.getAttribute('data-480');
						let vid540 = source.getAttribute('data-540');
						let vid720 = source.getAttribute('data-720');
						let vid1080 = source.getAttribute('data-1080');
						let vid1440 = source.getAttribute('data-1440');
						let vid2160 = source.getAttribute('data-2160');
						let vW = window.innerWidth;
						if(vW<=426) {
							if(vid240) {
								if(source.getAttribute('src')!==vid240) {
									source.setAttribute('src', vid240);changed=true;
								} else return;
							}
							else if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (426<vW && vW<=640) {
							if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (640<vW && vW<=854) {
							if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (854<vW && vW<=960) {
							if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (vW>960 && vW<=1280) {
							if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (1280<vW && vW<=1920) {
							if(vid1080) {
								if(source.getAttribute('src')!==vid1080) {
									source.setAttribute('src', vid1080);changed=true;
								} else return;
							}
						} else if (1920<vW && vW<=2560) {
							if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						} else if (2560<vW) {
							if(vid2160) {
								if(source.getAttribute('src')!==vid2160) {
									source.setAttribute('src', vid2160);changed=true;
								} else return;
							}
							else if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						}
						
						let videoLoad = false;
						if(changed) {
							video.pause();
							video.currentTime = 0;
							video.load();
							videoLoad = true;
						} else {
							if(source.getAttribute('src')!==vidDefault) {
								video.pause();
								video.currentTime = 0;
								source.setAttribute('src', vidDefault);
								video.load();
								videoLoad = true;
							} 
						}

						if(!video) return;

						if(videoLoad) if(video.autoplay) {
							video.pause();
							video.currentTime = 0;
							// video.play();
							let overlay = video.closest('.is-box');
							let btnPlay = overlay.querySelector('.video-bg-play');
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
							let btnAudio = overlay.querySelector('.video-audio-play');
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
						}

						if(videoLoad) if(currentlyPlaying) {
							video.play();
						}
					};
					
					changeVideo(video);

					let debounce = (func) => {
						var timer;
						return function(event){
							if(timer) clearTimeout(timer);
							timer = setTimeout(func,100,event);
						};
					}
					let viewportWidth = window.innerWidth;
					window.addEventListener('resize',debounce(function(e){
						if (window.innerWidth != viewportWidth) {

							viewportWidth = window.innerWidth;

							if(video) changeVideo(video);
						}
					}));

					let overlay = video.closest('.is-box');
					let btnPlay = overlay.querySelector('.video-bg-play');
					btnPlay.addEventListener('click', (e)=>{
						if (video.paused) {
							video.play();
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
						} else {
							video.pause();
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-play"></use></svg>';
						}
						e.preventDefault();
						e.stopImmediatePropagation();
					});
					let btnAudio = overlay.querySelector('.video-audio-play');
					btnAudio.addEventListener('click', (e)=>{
						if (video.muted) {
							video.muted = false;
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume"></use></svg>';
						} else {
							video.muted = true;
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
						}
						e.preventDefault();
						e.stopImmediatePropagation();
					});
				});
				</script>

			`)}" data-settings="${encodeURIComponent(`
				[{ "mp4": "[%IMAGE_PATH%]videos/ai-EZe2u.mp4", "poster": "", "overlay": 0.05}]
				`)}">
			</div>
		</div>
		<div class="is-container v2 size-17 leading-13 is-content-500">
			<div class="row">
				<div class="column" style="min-height: 54px;">
					<h3 class="font-light text-center">Item One</h3>
					<p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
					<div class="text-center button-group">
						<a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 py-2 px-8 font-normal leading-relaxed border-transparent rounded-full ml-0 mt-1 tracking-125 hover:border-transparent uppercase size-13" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Read More</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
		`},

		{
		    'thumbnail': 'preview/video-06.webp',
		    'category': '6',
		    'html': `
<div class="is-section type-poppins is-section-80">
	<div class="is-box-6 is-box is-light-text box-autofit min-height-50">
		<div class="is-overlay">
			<div class="is-overlay-content content-selectable" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="600px" data-html="${encodeURIComponent(`

				<video id="{id}" class="is-video-bg" muted loop playsinline autoplay>
					<source src="[%IMAGE_PATH%]videos/blank.mp4" data-default="[%IMAGE_PATH%]videos/ai-qJYAE.mp4">
				</video>
				<div class="is-overlay-video" style="opacity:0.05"></div>
				<script>
				var docReady = function(fn) {
					var stateCheck = setInterval(function() {
						if (document.readyState === "interactive" || document.readyState === "complete") {
							clearInterval(stateCheck);
							try {
								fn()
							} catch (e) {}
						} 
					}, 1);
				};

				docReady(function() {
					
					let video = document.querySelector('#{id}');

					const changeVideo = (video) => {
						if(!video) return;
						let currentlyPlaying;
						if (video.paused) {
							currentlyPlaying = false;
						} else {
							currentlyPlaying = true;
						}
						let changed=false;
						let source = video.querySelector('source');
						let vidDefault = source.getAttribute('data-default');
						let vid240 = source.getAttribute('data-240');
						let vid360 = source.getAttribute('data-360');
						let vid480 = source.getAttribute('data-480');
						let vid540 = source.getAttribute('data-540');
						let vid720 = source.getAttribute('data-720');
						let vid1080 = source.getAttribute('data-1080');
						let vid1440 = source.getAttribute('data-1440');
						let vid2160 = source.getAttribute('data-2160');
						let vW = window.innerWidth;
						if(vW<=426) {
							if(vid240) {
								if(source.getAttribute('src')!==vid240) {
									source.setAttribute('src', vid240);changed=true;
								} else return;
							}
							else if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (426<vW && vW<=640) {
							if(vid360) {
								if(source.getAttribute('src')!==vid360) {
									source.setAttribute('src', vid360);changed=true;
								} else return;
							}
							else if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (640<vW && vW<=854) {
							if(vid480) {
								if(source.getAttribute('src')!==vid480) {
									source.setAttribute('src', vid480);changed=true;
								} else return;
							}
							else if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (854<vW && vW<=960) {
							if(vid540) {
								if(source.getAttribute('src')!==vid540) {
									source.setAttribute('src', vid540);changed=true;
								} else return;
							}
							else if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (vW>960 && vW<=1280) {
							if(vid720) {
								if(source.getAttribute('src')!==vid720) {
									source.setAttribute('src', vid720);changed=true;
								} else return;
							}
						} else if (1280<vW && vW<=1920) {
							if(vid1080) {
								if(source.getAttribute('src')!==vid1080) {
									source.setAttribute('src', vid1080);changed=true;
								} else return;
							}
						} else if (1920<vW && vW<=2560) {
							if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						} else if (2560<vW) {
							if(vid2160) {
								if(source.getAttribute('src')!==vid2160) {
									source.setAttribute('src', vid2160);changed=true;
								} else return;
							}
							else if(vid1440) {
								if(source.getAttribute('src')!==vid1440) {
									source.setAttribute('src', vid1440);changed=true;
								} else return;
							}
						}
						
						let videoLoad = false;
						if(changed) {
							video.pause();
							video.currentTime = 0;
							video.load();
							videoLoad = true;
						} else {
							if(source.getAttribute('src')!==vidDefault) {
								video.pause();
								video.currentTime = 0;
								source.setAttribute('src', vidDefault);
								video.load();
								videoLoad = true;
							} 
						}

						if(!video) return;

						if(videoLoad) if(video.autoplay) {
							video.pause();
							video.currentTime = 0;
							// video.play();
							let overlay = video.closest('.is-box');
							let btnPlay = overlay.querySelector('.video-bg-play');
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
							let btnAudio = overlay.querySelector('.video-audio-play');
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
						}

						if(videoLoad) if(currentlyPlaying) {
							video.play();
						}
					};
					
					changeVideo(video);

					let debounce = (func) => {
						var timer;
						return function(event){
							if(timer) clearTimeout(timer);
							timer = setTimeout(func,100,event);
						};
					}
					let viewportWidth = window.innerWidth;
					window.addEventListener('resize',debounce(function(e){
						if (window.innerWidth != viewportWidth) {

							viewportWidth = window.innerWidth;

							if(video) changeVideo(video);
						}
					}));

					let overlay = video.closest('.is-box');
					let btnPlay = overlay.querySelector('.video-bg-play');
					btnPlay.addEventListener('click', (e)=>{
						if (video.paused) {
							video.play();
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-pause"></use></svg>';
						} else {
							video.pause();
							btnPlay.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-play"></use></svg>';
						}
						e.preventDefault();
						e.stopImmediatePropagation();
					});
					let btnAudio = overlay.querySelector('.video-audio-play');
					btnAudio.addEventListener('click', (e)=>{
						if (video.muted) {
							video.muted = false;
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume"></use></svg>';
						} else {
							video.muted = true;
							btnAudio.innerHTML = '<svg class="is-icon-flex"><use xlink:href="#__icon-volume-off"></use></svg>';
						}
						e.preventDefault();
						e.stopImmediatePropagation();
					});
				});
				</script>

			`)}" data-settings="${encodeURIComponent(`
				[{ "mp4": "[%IMAGE_PATH%]videos/ai-qJYAE.mp4", "poster": "", "overlay": 0.05}]
				`)}">
			</div>
		</div>
		<div class="is-container v2 size-17 leading-13 is-content-500">
			<div class="row">
				<div class="column" style="min-height: 54px;">
					<h3 class="font-light text-center">Item One</h3>
					<p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
					<div class="text-center button-group">
						<a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 py-2 px-8 font-normal leading-relaxed border-transparent rounded-full ml-0 mt-1 tracking-125 hover:border-transparent uppercase size-13" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Read More</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-500">
			<div class="row">
				<div class="column" style="min-height: 54px;">
					<h3 class="font-light text-center">Item Two</h3>
					<p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
					<div class="text-center button-group">
						<a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 mt-1 uppercase py-2 px-8 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-125 size-13" style="background-color: rgb(240, 240, 240);">Read More</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
			`
		},
		
		/* CUSTOM */

		{
		    'thumbnail': 'preview/custom-01.png',
		    'category': '6',
		    'html': `
			<div class="is-section is-box type-poppins is-light-text is-section-100 min-height-60 box-autofit">

			<div class="is-overlay">
				<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="${encodeURIComponent(`
				<style>
					.animate-text-wrapper {
						overflow-x: hidden;
						width: 100%;
						height: 100vh;
						display: flex;
						align-items: center;
						line-height: 1.7;
						color: #fff;
						transform: skewY(-5deg);
					}

					.bg-text-container {
						transform: translateX(-50%);
						left: 50%;
						position: absolute;
						z-index: -999;
					}

					@keyframes text-scrolling {
						0% {
							transform: translate3d(-100%, 0, 0);
						}

						100% {
							transform: translate3d(0%, 0, 0);
						}
					}

					.animate-text {
						animation: text-scrolling 20s linear infinite;
						will-change: transform;
						display: block;
						position: relative;
						white-space: nowrap;
					}

					.animate-text.left {
						animation-direction: reverse;
					}

					.animate-text span {
						font-size: 280px;
						color: transparent !important;
						-webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
						text-transform: uppercase;
						display: inline-block;
						line-height: 0.75;
						min-width: auto;
						font-weight: 800;
					}
				</style>

				<div class="animate-text-wrapper">
					<div class="bg-text-container">
						<div class="animate-text">
							<span>Driven Better&nbsp;</span>
							<span>Driven Better&nbsp;</span>
						</div>
						<div style="height:20vw">

						</div>
						<div class="animate-text left">
							<span>Driven Better&nbsp;</span>
							<span>Driven Better&nbsp;</span>
						</div>
					</div>
				</div>

				<script>
					(function() {
						/* Set width of all animated text to match */
						let parent = document.querySelectorAll('.animate-text');
						for (let i = 0; i < parent.length; i++) {
							parent[i].style.width = parent[i].children[0].clientWidth + "px";
						};
					}).call(this);
				</script>				
				`)}" style="z-index: 1;">
					
				</div>

                <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-4nmPk.jpg&quot;); background-position: 50% 60%;">
                    <div class="is-overlay-color opacity-20"></div>
                </div>
            </div>
			<div class="is-container v2 leading-13 size-17 is-content-1100">
                <div class="row">
                    <div class="column">
                        <h1 class="text-center font-normal leading-11 size-72">We Create Simple and Effective Designs</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <div class="spacer height-40"></div>
                    </div>
                </div>

                <div class="row">
                    <div class="column">
                        <div class="text-center button-group">
                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-9 font-normal leading-relaxed border-transparent rounded-full size-18 tracking-wide hover:border-transparent" title="" style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Our Works</a>
                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
                        </div>
                    </div>
                </div>
            </div>
		</div>
		`
		},
		{
		    'thumbnail': 'preview/custom-02.png',
		    'category': '6',
		    'html': `
<div class="is-section is-section-100 type-poppins">
	<div class="is-box-6 is-box is-dark-text box-autofit">
		<div class="is-overlay"></div>
		<div class="is-container v2 size-17 leading-13 is-content-620">
            <div class="row">
                <div class="column">
                    <h1 class="font-normal leading-11 size-72 text-left">We Create Simple and Effective Designs</h1>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="button-group text-left">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-wide" title="" style="background-color: rgb(240, 240, 240);">Our Works</a>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 size-18 px-9 border-current hover:border-current font-normal leading-relaxed rounded-full tracking-wide" title="">Get in Touch</a>
                    </div>
                </div>
            </div>

        </div>
	</div>
	<div class="is-box-6 is-box is-dark-text box-autofit min-height-50">
		<div class="is-overlay">
			<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript "  data-html="${encodeURIComponent(`
			<style>
				.animate-text-wrapper {
					overflow-x: hidden;
					width: 100%;
					height: 100vh;
					display: flex;
					align-items: center;
					line-height: 1.7;
					color: #fff;
					transform: skewY(-5deg);
				}

				.bg-text-container {
					transform: translateX(-50%);
					left: 50%;
					position: absolute;
					z-index: -999;
				}

				@keyframes text-scrolling {
					0% {
						transform: translate3d(-100%, 0, 0);
					}

					100% {
						transform: translate3d(0%, 0, 0);
					}
				}

				.animate-text {
					animation: text-scrolling 20s linear infinite;
					will-change: transform;
					display: block;
					position: relative;
					white-space: nowrap;
				}

				.animate-text.left {
					animation-direction: reverse;
				}

				.animate-text span {
					font-size: 280px;
                    color: transparent !important;
					-webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
					text-transform: uppercase;
					display: inline-block;
					line-height: 0.75;
					min-width: auto;
					font-weight: 800;
				}
			</style>

			<div class="animate-text-wrapper">
				<div class="bg-text-container">
					<div class="animate-text">
						<span>Driven Better&nbsp;</span>
						<span>Driven Better&nbsp;</span>
					</div>
					<div style="height:20vw">

					</div>
					<div class="animate-text left">
						<span>Driven Better&nbsp;</span>
						<span>Driven Better&nbsp;</span>
					</div>
				</div>
			</div>

			<script>
				(function() {
					/* Set width of all animated text to match */
					let parent = document.querySelectorAll('.animate-text');
					for (let i = 0; i < parent.length; i++) {
						parent[i].style.width = parent[i].children[0].clientWidth + "px";
					};
				}).call(this);
			</script>						
			`)}" style="z-index: 1;">
				
			</div>

            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-SXlsm.jpg&quot;); background-position: 50% 60%;">
                <div class="is-overlay-color opacity-0"></div>
            </div>
        </div>
	</div>
</div>
`
		},
/*
		{
		    'thumbnail': 'preview/custom-03.png',
		    'category': '6',
		    'html': `
		<div class="is-section is-section-100 is-box type-poppins" data-box="box-bIXHIFt">
			<div class="is-overlay">
				<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="${encodeURIComponent(`
				
				<script id="script-GTfz4Ji">
					var scriptReady = function(fn) {
						var stateCheck = setInterval(function() {
							if (typeof skrollrr === 'undefined') return; // To check if required library (skrollrr) is loaded.
							if (typeof skrollrr.lax === 'undefined') return;
							clearInterval(stateCheck);
							try {
								fn()
							} catch (e) {}
						}, 1);
					};

					scriptReady(function() {

						// Your custom code here
						let section = document.querySelector('#script-GTfz4Ji').closest('.is-section'); // Get the current section
						let box = document.querySelector('#script-GTfz4Ji').closest('.is-box'); // Get the current box
						let container = box.querySelector('.is-container'); // Get the current container

						// Prepare rounded clip
						let clip = box.querySelector('.is-boxes');
						clip.style.overflow = 'hidden';
						clip.style.borderRadius = '50%';
						clip.style.background = '#fff';
						clip.style.position = 'relative';
						clip.style.flex = 'none';
						clip.style.width = '0%';
						clip.style.height = '0%';

						// Make text container centered
						container.style.width = '100vw';
						container.style.width = container.offsetWidth + 'px';
						container.style.position = 'absolute';
						container.style.left = 'calc(50% - ' + container.offsetWidth / 2 + 'px)';

						// Apply scroll animation
						box.setAttribute('data-box', 'box-GTfz4Ji');
						skrollrr.lax.addElements('[data-box=box-GTfz4Ji]', {
							scrollY: {
								scale: [
									['elInY+200', 'elCenterY'],
									[0, 100], {
										cssFn: function(val, domElement) {
											clip.style.width = val - 6 + 'vh';
											clip.style.height = val - 6 + 'vh';
										}
									}
								],
							},
						});

						skrollrr.refresh();
					});
				</script>
				
				`)}" style="z-index: 1;">
					
				</div>
				<div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/img-035.jpg&quot;); background-position: 50% 60%;">
					<div class="is-overlay-color opacity-0"></div>
				</div>
			</div>
			<div class="is-boxes" style="position: relative; overflow: hidden; width: 1.875vh; height: 1.875vh; flex: 0 0 auto; background: rgb(255, 255, 255); border-radius: 50%;">
				<div class="is-box-centered" data-clip="clip-JeRaoyg" style="overflow: hidden; width: 100%; height: 95%;">
					<div class="is-container v2 size-17 leading-13 is-content-1000" style="left: calc(50% - 521px); position: absolute; width: 1042px;">
						<div class="row">
							<div class="column">
								<p class="text-center uppercase size-14 tracking-400">Hello, This is Company-Name</p>
							</div>
		
						</div>
						<div class="row">
							<div class="column">
								<div class="spacer height-60"></div>
							</div>
		
						</div>
						<div class="row">
							<div class="column">
								<h1 class="text-center leading-09 size-88">We create simple and effective designs.</h1>
							</div>
		
						</div>
						<div class="row">
							<div class="column">
								<div class="spacer height-40"></div>
							</div>
		
						</div>
						<div class="row">
							<div class="column">
								<div class="spacer height-20"></div>
							</div>
							<div style="width: 57.5435%; flex: 0 0 auto;" class="column">
								<p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
									Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
									when an unknown printer took a galley of type.</p>
							</div>
							<div class="column">
								<div class="spacer height-20"></div>
							</div>
		
						</div>
						<div class="row">
							<div class="column">
								<div class="spacer height-40"></div>
							</div>
		
						</div>
						<div class="row">
							<div class="column">
								<div class="text-center">
									<a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 uppercase py-2 size-14 px-8 border-current hover:border-current font-normal leading-relaxed ml-0 rounded-full tracking-125" title="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''" style="color: rgb(0, 0, 0);">How We Work</a>
									<a href="#" role="button" class="transition-all inline-block cursor-pointer no-underline border-2 border-solid mr-1 mt-2 mb-2 uppercase py-2 size-14 px-8 text-black leading-relaxed rounded-full border-transparent hover:border-transparent font-normal tracking-125" title="" style="background-color: rgb(240, 240, 240);">Get in Touch</a>
								</div>
							</div>
		
						</div>
					</div>
				</div>
			</div>
		</div>
`
		},
*/
		{
		    'thumbnail': 'preview/custom-04.png',
		    'category': '6',
		    'html': `
			<div class="is-section is-box is-section-100 box-autofit min-height-70 type-poppins is-content-top edge-y-3" style="transform: translate3d(1e-05px, 1e-05px, 1e-05px);">
    <div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="${encodeURIComponent(`
		<div class="section-{id}"></div>

		<script>
			var skrollrrReady = function(fn) {
				var stateCheck = setInterval(function() {
					if (typeof skrollrr === 'undefined') return; // To check if required library (skrollrr) is loaded.
					if (typeof skrollrr.lax === 'undefined') return;
					clearInterval(stateCheck);
					try {
						fn()
					} catch (e) {}
				}, 1);
			};
			skrollrrReady(function() {
		
				let se = document.querySelector('.section-{id}').closest('.is-section');
				se.setAttribute('data-section', 'section-{id}');
				let overlay = se.querySelector('.is-overlay');
				overlay.style.transform = '';
		
				let wrapper = document.querySelector('.is-wrapper');
				const clientHeight = se.clientHeight;
				skrollrr.lax.addElements('[data-section=section-{id}]', {
		
				}, {
					onUpdate: function(driverValues, domElement) {
		
						//let adj = wrapper.getBoundingClientRect().top + window.pageYOffset;
						let offsetTop = se.offsetTop; // - adj;
		
						const scrollY = driverValues.scrollY[0];
		
						if (scrollY >= offsetTop && scrollY <= offsetTop + clientHeight) {
							let n = (scrollY - offsetTop);
							let percentage = n / clientHeight;
							overlay.style.transform = 'translateY(' + n + 'px) scale(' + (1 + percentage / 2) + ')';
						} else {
							overlay.style.transform = 'translateY(0) scale(1)';
						}
					}
				});
		
				skrollrr.refresh();
			});
		</script>
	
	`)}" style="z-index: 1;">
        

    </div>
    <div class="is-overlay" style="transform: translateY(0px) scale(1);">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-iB5kH.jpg&quot;); background-position: 50% 60%;" data-bg-ori="background-position: 50% 0%;">
            <div class="is-overlay-color opacity-0"></div>
        </div>
    </div>
	<div class="is-container v2 leading-14 is-content-1400 size-18">
        <div class="row">
            <div class="column text-center" style="overflow: hidden; min-height: 54px;">
                <h1 class="size-124 leading-none font-medium" data-bottom-top="transform: translateY(125px);" data-center="transform: translateY(0px);" data-top="transform: scale(1);" data-top-bottom="transform: scale(1.2);">
                    <div class="size-60 leading-12">Good things that come in small packages.</div>
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="text-center column" style="overflow: hidden; min-height: 54px;">
                <p data-bottom-top="transform: translateY(125px);" data-center="transform: translateY(0px);" data-center-bottom="transform: scale(1);" data-top-bottom="transform: scale(1.2);">We design stunning websites that really work.</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row">
            <div class="column text-center">
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-9 font-normal leading-relaxed border-transparent rounded-full size-18 tracking-wide hover:border-transparent" title="" style="color: rgb(255, 255, 255); background-color: rgb(255, 127, 0);">Get Started</a>
                </div>
            </div>
        </div>
    </div>
</div>
			
		`},

		{
		    'thumbnail': 'preview/custom-05.png',
		    'category': '6',
		    'html': `
			<div class="is-section is-box is-section-100 is-dark-text type-poppins box-autofit min-height-70" style="background-color: rgb(247, 247, 247);">
    
    <div class="is-overlay" style="background-color: rgb(247, 247, 247); inset: unset; width: 0px; height: 0px; border-radius: 400px;">
        <div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="${encodeURIComponent(`
		<div class="section-{id}"></div>
			<script>
				var skrollrrReady = function(fn) {
					var stateCheck = setInterval(function() {
						if (typeof skrollrr === 'undefined') return;
						if (typeof skrollrr.lax === 'undefined') return;
						clearInterval(stateCheck);
						try {
							fn()
						} catch (e) {}
					}, 1);
				};
				skrollrrReady(function() {
			
					let se = document.querySelector('.section-{id}').closest('.is-section');
					se.setAttribute('data-section', 'section-{id}');
					let overlay = se.querySelector('.is-overlay');
			
					overlay.style.top = 'unset';
					overlay.style.bottom = 'unset';
					overlay.style.left = 'unset';
					overlay.style.right = 'unset';
			
					let wrapper = document.querySelector('.is-wrapper');
					const clientHeight = se.clientHeight;
					const clientWidth = se.clientWidth;
					skrollrr.lax.addElements('[data-section=section-{id}]', {
						scrollY: {
							scale: [
								['elInY', 'elCenterY'],
								[0, 100], {
									cssFn: function(val, domElement) {
										overlay.style.width = (val / 100) * clientWidth + 'px';
										overlay.style.height = (val / 100) * clientHeight + 'px';
										overlay.style.borderRadius = (400 - val * 4) + 'px';
										se.style.backgroundColor = overlay.style.backgroundColor;
									}
								}
							],
						},
					});
			
					skrollrr.refresh();
				});
			</script>
		`)}" style="z-index: 1;">
             
        </div>
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-tICrV.jpg&quot;); background-position: 50% 60%;">
            <div class="is-overlay-color opacity-0"></div>
        </div>
    </div>
    <div class="is-container v2 size-17 leading-12 is-content-right edge-x-0-5 is-content-740">
        <div class="row">
            <div class="column">
                <p class="font-medium leading-12 size-38" data-bottom-top="transform: translateX(50%);" data-center="transform: translateX(0px);" data-center-bottom="transform: scale(1);" data-top-bottom="transform: scale(0.7);">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
    </div>

</div>
			`
		},
	]
};

try {
    template_list.push(data_templates);
} catch(e) {
    //
}