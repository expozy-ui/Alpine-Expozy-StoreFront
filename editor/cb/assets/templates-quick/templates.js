var data_templates = {
    name: 'Quick Start',
    categories: [
        { id: 1, name: 'Hero' }, 
        { id: 2, name: 'Article' }, 
        { id: 3, name: 'Photos' }, 
        { id: 4, name: 'List' },  
        { id: 5, name: 'Quotes' }, 
        { id: 6, name: 'FAQ' }, 
        { id: 7, name: 'Call to Action' }, 
        { id: 8, name: 'Logo List' }, 
        { id: 9, name: 'Pricing' }, 
        { id: 10, name: 'Shop' }, 
        { id: 11, name: 'Profile' }, 
        { id: 12, name: 'Contact' }, 
        { id: 14, name: 'Footer' }, 
    ],
    designs: [

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
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-10 border-current hover:text-white hover:border-transparent" style="color: rgb(0, 0, 0);" data-bg="" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">
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
		    'thumbnail': 'preview/simple-07.png',
		    'category': '11',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-10 size-17 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-48 leading-12 font-light text-center">Meet Our Team</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column flex flex-col items-center">
                <div class="w-4/5 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-jfsPW-edituyLp21J.jpg" alt="Freja E. Andersen" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex flex-col">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-2 text-center">Strategic Director</p>
                    <h3 class="size-24 font-normal leading-13 mb-3 text-center">Freja E. Andersen</h3>
                    <p class="leading-17 text-gray-600 size-16 text-center">Driving vision through data-informed design strategies that transform business objectives into visual reality.</p>
                </div>
            </div>
            <div class="column flex flex-col items-center">
                <div class="w-4/5 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-9cR8u-editLCvSqI3.jpg" alt="Nathan Williams" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex flex-col">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-2 text-center">Design Lead</p>
                    <h3 class="size-24 font-normal leading-13 mb-3 text-center">Nathan Williams</h3>
                    <p class="leading-17 text-gray-600 size-16 text-center">Crafting intuitive digital experiences with a focus on typography, grid systems, and user interaction.</p>
                </div>
            </div>
            <div class="column flex flex-col items-center">
                <div class="w-4/5 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-FhJeD-editapwdgHV.jpg" alt="Vincent Nelson" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex flex-col">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-2 text-center">Technical Director</p>
                    <h3 class="size-24 font-normal leading-13 mb-3 text-center">Vincent Nelson</h3>
                    <p class="leading-17 text-gray-600 size-16 text-center">Bridging the gap between creative vision and robust engineering to deliver seamless performance.</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

		
		/* Hero */
		{
			'thumbnail': 'preview/hero-05.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3">
        <div class="row items-center" style="gap: 60px;">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="pb-6 mb-6" style="border-bottom: 1px solid #e5e5e5;">
                    <div class="flex justify-between items-center">
                        <p class="size-12 uppercase tracking-150 text-gray-400">Issue 01</p>
                        <p class="size-12 uppercase tracking-150 text-gray-400">Editorial</p>
                    </div>
                </div>
                <h1 class="size-60 leading-11 font-light pb-6 text-black">Where Light, Form, and Intention Create Poetry.</h1>
                <p class="size-17 leading-17 text-gray-600 pb-8">Captured in the calm of the everyday — our aesthetic lives in the details: a curve, a fabric, a quiet gesture. This is living, styled with care.</p>

                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-8 size-15 leading-14 border-black hover:bg-black hover:text-white hover:border-transparent border-current" style="color: rgb(0, 0, 0);" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                        Read The Story
                    </a>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-Ds2Yc2.jpg" alt="Interior Detail" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between pt-3">
                    <p class="size-12 text-gray-400">Fig 1.1 — The Living Space</p>
                    <p class="size-12 text-gray-400">2024</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/hero-01.png',
			'category': '1',
			'html': `
<div class="is-section is-section-100 is-box is-dark-text type-quicksand-kalam">
    <div class="is-overlay">
    </div>
    <div class="is-container v2 size-17 v3 is-content-1420 leading-17">
        <div class="row clearfix relative sm-items-1 sm-autofit">
            <div class="flex justify-center flex-col column" style="width: 32.2059%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">The Collection</p>
                <h1 class="font-normal pb-6 size-64 leading-11">Keep Everything Simple.</h1>
                <p class="text-gray-600 pb-8 size-17">We believe in the power of subtraction. Removing the unnecessary to reveal the essential beauty of objects, spaces, and moments.</p>
                <div class="space-x-2">
                    <a href="#preview" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-15 border-black hover:bg-black hover:text-white border-current hover:border-transparent" style="color: rgb(0, 0, 0);" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                        Explore
                    </a>
                </div>
            </div>
            <div class="flex justify-center flex-col column xs-hidden sm-hidden" style="width: 12.7206%; flex: 0 0 auto;">
                <div class="spacer height-80"></div>
            </div>
            <div style="position: relative; min-height: 30vh; width: 51.4164%; flex: 0 0 auto;" class="flex flex-col justify-center items-center column">
                <div class="is-dock" style="margin:50px 0">
                    <div style="width: 120%;left: 20%;top: 4%;">
                        <img alt="" data-noresize="" src="[%IMAGE_PATH%]images/ai-8Sdl0.jpg" style="width: 100%; border-radius: 12px;" data-filename="img-127.jpg" data-bottom-top="transform: translateX(130px);" data-center="transform: translateX(0px);">
                    </div>
                    <div style="width: 58%;left: -13%;top: 56%;">
                        <img alt="" data-noresize="" src="[%IMAGE_PATH%]images/ai-1l5Xy.jpg" style="width: 100%; box-shadow: rgba(22, 22, 22, 0.2) 3em 3em 5em; border-radius: 12px;" data-filename="ai-8Kf7V-editWfaGx5c.jpg" data-bottom-top="transform: translateX(75px);" data-center-top="transform: translateX(0px);" data-center-bottom="transform: translateX(0px);" data-top-bottom="transform: translateX(75px);">
                    </div>
                    <div style="width: 58%;left: 69%;top: 56%;">
                        <img alt="" data-noresize="" src="[%IMAGE_PATH%]images/ai-rrX2F.jpg" style="width: 100%; box-shadow: rgba(22, 22, 22, 0.2) 3em 3em 5em; border-radius: 12px;" data-filename="ai-KavPn-editUkrc1t9.jpg" data-bottom-top="transform: translateX(125px);" data-center-top="transform: translateX(0px);" data-center-bottom="transform: translateX(0px);" data-top-bottom="transform: translateX(100px);">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/hero-02.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-color: #fcfcfc;"></div>
    </div>
    <div class="is-container size-18 leading-17 is-content-1400 v3">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-center" style="border-bottom: 1px solid #e5e5e5; padding-bottom: 20px;">
                    <p class="size-12 uppercase tracking-150 text-gray-500">Platform v2.0</p>
                    <p class="size-12 uppercase tracking-150 text-gray-500">System Architecture</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <h1 class="size-72 leading-11 font-medium tracking-tight pb-6">Build anything beautifully.</h1>
                <p class="size-18 leading-17 text-gray-600 pb-8" style="max-width: 480px;">
                    The complete toolkit for modern interface design. Create scalable, pixel-perfect experiences with our advanced component library and real-time collaboration engine.
                </p>
                <div class="space-x-2">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(250, 250, 250); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)">
                        Start Building
                    </a>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-gray-200 hover:border-black text-black">
                        View Documentation
                    </a>
                </div>
                <div class="spacer height-60"></div>
                <div class="flex items-center" style="gap: 40px;">
                    <div>
                        <p class="size-32 font-semibold">40k+</p>
                        <p class="size-13 text-gray-500 uppercase tracking-wide">Developers</p>
                    </div>
                    <div>
                        <p class="size-32 font-semibold">99.9%</p>
                        <p class="size-13 text-gray-500 uppercase tracking-wide">Uptime</p>
                    </div>
                </div>
            </div>
            <div class="column relative">
                <div class="relative w-full h-full" style="min-height: 500px;">
                    <div style="position: absolute; top: 0; right: 0; width: 85%; z-index: 1;">
                        <div class="w-full overflow-hidden relative bg-gray-50 shadow-lg rounded-lg" style="aspect-ratio: 16/10;">
                            <img src="[%IMAGE_PATH%]images/ai-jbNaF.jpg" alt="Dashboard Interface" class="w-full h-full object-cover" data-bottom-top="transform: translateX(130px);" data-center="transform: translateX(0px);" data-50-top="transform: translateX(0px);" data-top-bottom="transform: translateX(125px);">
                        </div>
                    </div>
                    <div style="position: absolute; bottom: 40px; left: 0; width: 50%; z-index: 2;">
                        <div class="w-full overflow-hidden relative bg-gray-50 shadow-2xl rounded-lg" style="aspect-ratio: 1/1;">
                            <img src="[%IMAGE_PATH%]images/ai-rSrk1.jpg" alt="Mobile Analytics" class="w-full h-full object-cover" data-bottom-top="transform: translateX(125px);" data-center-top="transform: translateX(0px);" data-50-top="transform: translateX(0px);" data-top-bottom="transform: translateX(125px);">
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
			'thumbnail': 'preview/hero-03.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v3 size-17 leading-15 is-content-1320">
        <div class="row">
            <div class="column">
                <h1 class="leading-09 font-medium tracking-tighter size-164" style="margin-left: -8px;">VISUAL<br class="size-164"><span class="text-gray-400 size-164">SYSTEMS</span></h1>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column flex flex-col justify-end" style="width: 34.7059%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/5;">
                    <img src="[%IMAGE_PATH%]images/ai-COxe1.jpg" alt="Creative Process" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pt-4 flex justify-between">
                    <p class="size-13 uppercase tracking-150 text-gray-500">Fig. 01</p>
                    <p class="size-13 uppercase tracking-150 text-gray-500">Concept</p>
                </div>
            </div>

            <div class="column flex flex-col pb-12 justify-end">
                <p class="size-24 font-light text-gray-600 pb-8" style="max-width: 600px;">
                    We craft digital identities that resonate. Our approach combines rigorous strategic thinking with pure artistic intuition.
                </p>
                <div class="pb-8">
                    <a href="#" class="size-15 uppercase tracking-widest pb-1 hover:text-gray-600 transition-colors underline-offset-4">Explore Projects</a>
                </div>
            </div>

            <div class="column flex flex-col justify-end" style="width: 29.6324%; flex: 0 0 auto;">

                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-4643D-editCYD2oho.jpg" alt="Design Detail" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pt-4 flex justify-between">
                    <p class="size-13 uppercase tracking-150 text-gray-500">Fig. 02</p>
                    <p class="size-13 uppercase tracking-150 text-gray-500">Execution</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/hero-06.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 bg-white flex flex-col justify-center">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 v3 leading-17 size-17">
            <div class="row">
                <div class="column">
                    <h1 class="size-96 leading-09 font-light pb-2 text-gray-200">03</h1>
                    <h2 class="size-60 font-normal pb-6 leading-12">Less Stuff,<br>More Compassion.</h2>
                    <div class="spacer height-40"></div>
                    <div class="flex" style="gap: 40px; border-top: 1px solid #f0f0f0; padding-top: 30px;">
                        <div style="flex: 1;">
                            <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Mission</p>
                            <p class="size-15 text-gray-600">To reduce clutter and increase clarity in modern living spaces.</p>
                        </div>
                        <div style="flex: 1;">
                            <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Vision</p>
                            <p class="size-15 text-gray-600">A world where design serves humanity, not the other way around.</p>
                        </div>
                    </div>
                    <div class="spacer height-60"></div>
                    <a href="#" class="size-15 uppercase tracking-150 text-black underline underline-offset-4 hover:text-gray-600">Read Manifesto</a>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-2NLCe.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/hero-04.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom edge-y-0 bg-gray-50">
    <div class="is-overlay"></div>
    <div class="is-container v3 is-content-1660 size-17 leading-17">
        <div class="row">
            <div class="column text-center">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">The Portfolio</p>
                <h1 class="size-60 font-light pb-6 leading-12">Ultimate Experiences.</h1>
                <p class="text-gray-600 pb-6" style="max-width: 600px; margin: 0 auto;">Crafting stories through emotion, purpose, and visual excellence.</p>
                <div class="pb-20">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(240, 240, 241);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(240, 240, 241)" data-hover-bg="rgb(236, 236, 238)">Read More</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row flex justify-center items-end" style="gap: 20px; padding-bottom: 60px;">
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden shadow-lg bg-white" style="aspect-ratio: 3/4; transform: translateY(0px);">
                    <img src="[%IMAGE_PATH%]images/ai-0lgaO.jpg" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1500">
                </div>
            </div>
            <div class="column" style="width: 18%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden shadow-lg bg-white" style="aspect-ratio: 3/4; transform: translateY(-30px);">
                    <img src="[%IMAGE_PATH%]images/ai-OJVXh-editXkt2Obv.jpg" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1500">
                </div>
            </div>
            <div class="column" style="width: 24%; flex: 0 0 auto; z-index: 10;">
                <div class="w-full overflow-hidden shadow-2xl bg-white" style="aspect-ratio: 3/4; transform: translateY(-60px) scale(1.05);">
                    <img src="[%IMAGE_PATH%]images/ai-lL6tp.jpg" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1500">
                </div>
            </div>
            <div class="column" style="width: 18%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden shadow-lg bg-white" style="aspect-ratio: 3/4; transform: translateY(-30px);">
                    <img src="[%IMAGE_PATH%]images/ai-twTdD-editVMTGCH7.jpg" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1500">
                </div>
            </div>
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden shadow-lg bg-white" style="aspect-ratio: 3/4; transform: translateY(0px);">
                    <img src="[%IMAGE_PATH%]images/ai-vmkz6-editZc0oaCp.jpg" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1500">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/hero-07.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 h-full flex flex-col justify-between py-12 v3 pb-20 pt-10 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <h1 class="size-156 leading-09 font-bold tracking-tighter text-black">D.</h1>
                    <p class="size-14 uppercase tracking-150 text-gray-400 pl-2">Dave Mercer Studio</p>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                    <h2 class="size-42 font-light pb-6 leading-12">Framing light, texture, and emotion into timeless images.</h2>
                    <p class="text-gray-600 pb-8">Minimalist, calm, and human — crafted with intention for modern campaigns, personal brands, and creative thinkers.</p>

                    <div class="pt-6 border-t border-gray-100">
                        <a href="#" class="size-14 uppercase tracking-widest text-black font-semibold underline-offset-4 hover:text-gray-600 transition-colors">Get in Touch →</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-7">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-tjPUP.jpg'); background-position: 67% 60%;"></div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/hero-10.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 bg-white flex flex-col justify-center">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <div class="w-12 h-1 bg-black mb-8"></div>
                    <h1 class="size-72 font-light pb-6 leading-11">Creative &amp;<br>Inspiring.</h1>
                    <p class="text-gray-600 pb-10">Making ideas come alive through rigorous process and playful experimentation.</p>

                    <div class="flex flex-col" style="gap: 20px;">
                        <div class="flex items-center pb-4 border-b border-gray-100">
                            <span class="size-14 font-bold mr-4">01</span>
                            <span class="text-gray-800">Concept Development</span>
                        </div>
                        <div class="flex items-center pb-4 border-b border-gray-100">
                            <span class="size-14 font-bold mr-4">02</span>
                            <span class="text-gray-800">Visual Strategy</span>
                        </div>
                        <div class="flex items-center pb-4 border-b border-gray-100">
                            <span class="size-14 font-bold mr-4">03</span>
                            <span class="text-gray-800">Execution &amp; Delivery</span>
                        </div>
                    </div>

                    <div class="spacer height-60"></div>
                    <a href="#" class="size-15 font-semibold text-black hover:opacity-70 transition-opacity">Start a Project</a>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 is-content-bottom edge-y-2 hover-zoom">
        <div class="is-overlay" style="background-color: #f5f5f5;">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-L1ncu.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/hero-09.png',
			'category': '1',
			'html': `
<div class="is-section is-box is-section-100 is-light-text min-height-60 hover-zoom type-poppins-lekton">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-CDSif.jpg&quot;); background-position: 50% 60%;">
            <div class="is-overlay-color opacity-40" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0,0,0,0.15) 80%);"></div>
        </div>
    </div>
    <div class="is-container v2 size-17 leading-17 is-content-1760">
        <div class="row">
            <div class="column" style="width: 100%;">
                <div class="spacer height-40"></div>
            </div>
            <div class="column" style="width: 45.1348%; flex: 0 0 auto;">
                <div class="display">
                    <h1 class="text-left uppercase font-light leading-none size-112">A style that never gets old.</h1>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-120"></div>
            </div>
        </div>
        <div class="row sm-autofit">
            <div class="column" style="width: 25%; flex: 0 0 auto;">
                <div class="pb-8">
                    <span class="inline-block px-3 py-1 border border-white/30 rounded text-white size-12 uppercase tracking-150">Classic</span>
                </div>
                <p class="size-17">True elegance is found in the refusal to compromise on quality. We build things that last, stories that resonate, and designs that endure.</p>
            </div>
            <div class="column">
                <div class="spacer height-40"></div>
            </div>
            <div class="column sm-hidden">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="space-x-1 text-right">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal py-2 px-6 size-15 leading-14 border-current hover:border-transparent" title="" style="color: rgb(250, 250, 250); background-color: transparent; --cb-hover-bg: #fff; --cb-hover-color: rgb(0, 0, 0);" data-cb-hover="bg color">Contact</a>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal py-2 px-6 size-15 leading-14 border-transparent hover:border-transparent" title="" style="color: rgb(24, 24, 27); background-color: #fff; --cb-hover-bg: rgba(248, 248, 250, 1);" data-cb-hover="bg">Shop Collection</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

       {
			'thumbnail': 'preview/hero-13.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay" style="background-color: #ffffff;"></div>
        <div class="is-container is-content-540 v3 size-16 leading-17">
            <div class="row">
                <div class="column">
                    <div class="flex justify-between items-end pb-8" style="border-bottom: 1px solid #000;">
                        <p class="size-12 font-bold uppercase tracking-widest text-black">Manifesto</p>
                        <p class="size-12 font-normal text-black">01 — 06</p>
                    </div>
                    <div class="spacer height-60"></div>
                    <h1 class="size-64 leading-11 font-medium tracking-tight pb-6 text-black">
                        Form follows <br><span class="text-gray-400">function.</span>
                    </h1>
                    <p class="size-18 leading-17 text-gray-600 pb-10" style="max-width: 400px;">
                        We create spaces that inspire, connect, and endure. A multidisciplinary approach to modern living that strips away the non-essential.
                    </p>

                    <div class="flex items-center" style="gap: 30px;">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-8 size-15 leading-14 border-black hover:bg-black hover:text-white" style="color: #000000;">
                            View Projects
                        </a>
                        <a href="#" class="size-15 text-gray-500 uppercase tracking-widest inline-flex items-center no-underline hover:text-black transition-colors">
                            Studio Profile
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-7 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-2EkuF.jpg'); background-position: center center;"></div>
        </div>
    </div>
</div>
`
}, 
       {
			'thumbnail': 'preview/hero-14.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-HaOCF.jpg'); background-position: 50% 100%;"></div>
        </div>
    </div>
    <div class="is-box is-box-6">
        <div class="is-overlay"></div>
        <div class="is-container is-content-540 is-content-left v3 size-16 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 font-bold uppercase tracking-widest text-gray-400 mb-6">Philosophy</p>
                    <h2 class="size-60 leading-12 font-normal text-black pb-8" style="margin-left: -2px;">
                        Organic<br>Harmony
                    </h2>

                    <div class="row" style="gap: 40px; border-top: 1px solid #e0e0e0; padding-top: 30px; margin-bottom: 30px;">
                        <div class="column" style="width: 45%; flex: 0 0 auto;">
                            <p class="size-12 text-gray-500 uppercase tracking-widest mb-2">Sustainability</p>
                            <p class="size-32 font-light">98%</p>
                        </div>
                        <div class="column">
                            <p class="size-18 leading-16 text-gray-600">
                                Inspired by the natural world, we design sustainable ecosystems that thrive.
                            </p>
                        </div>
                    </div>

                    <div class="row" style="gap: 40px; border-top: 1px solid #e0e0e0; padding-top: 30px; margin-bottom: 40px;">
                        <div class="column" style="width: 45%; flex: 0 0 auto;">
                            <p class="size-12 text-gray-500 uppercase tracking-widest mb-2">Impact</p>
                            <p class="size-32 font-light">Zero</p>
                        </div>
                        <div class="column">
                            <p class="size-18 leading-16 text-gray-600">
                                Bringing the outdoors in through biophilic design principles and carbon-neutral materials.
                            </p>
                        </div>
                    </div>

                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-10 size-15 leading-14 border-transparent bg-black text-white hover:opacity-80" style="color: #ffffff; background-color: #000000;">
                            Read More
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
`
}, 
       {
			'thumbnail': 'preview/hero-15.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 hover-zoom is-content-bottom edge-y-4">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-4flwC.jpg'); background-size: cover; opacity: 1;"></div>
    </div>
    <div class="is-container is-content-right v3 size-16 leading-15 is-content-540 edge-x-4">
        <div class="row">
            <div class="column">
                <div class="bg-white p-12 hover-lift" style="box-shadow: 0 30px 60px rgba(0,0,0,0.05);">
                    <div class="flex justify-between mb-8 pb-8" style="border-bottom: 1px solid #f0f0f0;">
                        <div>
                            <p class="size-12 font-bold uppercase tracking-widest text-black mb-1">Featured</p>
                            <p class="size-12 text-gray-400">Residential</p>
                        </div>
                        <p class="size-12 text-gray-400">01 / 05</p>
                    </div>
                    <h2 class="size-42 leading-12 font-normal text-black pb-6">
                        The Art of <br>Modern Living
                    </h2>
                    <p class="size-16 leading-17 text-gray-600 pb-10">
                        Discover how we blend contemporary art with functional living spaces to create unique environments.
                    </p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <span class="size-11 text-gray-400 uppercase tracking-widest">Client</span>
                            <span class="size-14 text-black pl-2">Apex Group</span>
                        </div>
                        <a href="#" class="size-24 text-black transition-transform hover:translate-x-2 inline-block"><i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
}, 
       {
			'thumbnail': 'preview/hero-17.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 hover-zoom is-content-bottom edge-y-2">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-tGsPn2-edituVDMpm6.jpg'); background-position: center center;">
            <div class="is-overlay-color opacity-12" style="background-color: #000;"></div>
        </div>
    </div>
    <div class="is-container v3 size-18 leading-17 is-content-left edge-x-2 is-content-1000">
        <div class="row" style="gap: 0px;">
            <div class="column">
                <div class="p-10 box-border bg-black text-white h-full flex flex-col justify-between">
                    <div>
                        <p class="size-12 uppercase tracking-widest text-gray-400 mb-2">Est. 2024</p>
                        <h1 class="size-60 leading-12 font-light text-white mb-6">
                            Cultivating<br><span class="serif-font italic">Elegance.</span>
                        </h1>
                    </div>
                    <div style="width: 60px; height: 1px; background-color: #fff;"></div>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border bg-white h-full flex flex-col justify-between bg-opacity-95" style="background-color: rgba(255,255,255,0.95);">
                    <p class="size-16 leading-17 text-gray-800">
                        A curated approach to lifestyle and design, focusing on the essential, the timeless, and the sophisticated details that matter.
                    </p>
                    <a href="#" class="size-14 font-bold uppercase tracking-widest text-black no-underline mt-8 hover:text-gray-600 transition-colors">
                        Explore Collection <i class="bi bi-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
`
}, 
       {
			'thumbnail': 'preview/hero-16.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 hover-zoom is-content-bottom edge-y-2">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-2EkuF.jpg'); background-position: center center; opacity: 1;"></div>
    </div>
    <div class="is-container v3 size-16 leading-15 is-content-500 is-content-left edge-x-2" style="margin-left: 5%;">
        <div class="row">
            <div class="column">
                <div class="bg-white p-10 hover-lift mb-0" style="border-top: 4px solid #000;">
                    <div class="flex justify-between items-center mb-6">
                        <p class="size-11 font-bold uppercase tracking-widest text-black">Latest Work</p>
                        <p class="size-11 text-gray-400">2024</p>
                    </div>
                    <h2 class="size-32 leading-13 font-medium text-black pb-4">
                        Nordic Light House
                    </h2>
                    <p class="size-15 leading-16 text-gray-600 pb-8">
                        A study in light, shadow, and material honesty.
                    </p>
                    <div>
                        <a href="#" class="size-13 font-bold uppercase tracking-widest text-black no-underline pb-1" style="border-bottom: 2px solid #000;">View Case Study</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
}, 
       {
			'thumbnail': 'preview/hero-18.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay"></div>
        <div class="is-container is-content-540 v3 size-18 leading-17">
            <div class="row">
                <div class="column">
                    <div class="flex items-center justify-between pb-12" style="border-bottom: 1px solid #000;">
                        <p class="size-14 font-bold uppercase tracking-widest">The Studio</p>
                        <p class="size-14 text-gray-500">Est. 2024</p>
                    </div>
                    <div class="spacer height-60"></div>
                    <h1 class="size-72 leading-12 font-medium tracking-tight pb-6">
                        Design that defines the future.
                    </h1>
                    <p class="size-18 leading-16 text-gray-600 pb-8" style="max-width: 400px;">
                        We are a multidisciplinary branding consultancy crafting digital experiences for forward-thinking companies.
                    </p>
                    <div>
                        <a href="#contact" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-8 size-15 leading-14 border-black hover:bg-black hover:text-white" style="color: #000000;">
                            Start a Project
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                    <div class="flex" style="gap: 40px;">
                        <div>
                            <p class="size-32 font-light">150+</p>
                            <p class="size-12 text-gray-400 uppercase tracking-widest mt-1">Projects</p>
                        </div>
                        <div>
                            <p class="size-32 font-light">12</p>
                            <p class="size-12 text-gray-400 uppercase tracking-widest mt-1">Awards</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-7 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-iIR7x.jpg&quot;); background-position: 65% 50%;" data-bg-lg="background-position: 65% 50%;" data-bg-ori="background-position: 65% 50%;">
                <div class="is-overlay-color opacity-0"></div>
            </div>
            <div class="is-overlay-color opacity-10" style="background-color: #000;"></div>
        </div>
    </div>
</div>
`
}, 
		{
			'thumbnail': 'preview/hero-12.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui min-height-60 is-section-40">
    <div class="is-overlay">
    </div>
    <div class="is-container is-content-1400 v3">
        <div class="row">
            <div class="column">
                <p class="size-14 uppercase tracking-widest mb-4">Est. 2024 — Global Architecture</p>
                <h1 class="size-96 leading-12 font-light tracking-tight mb-0">THE STUDIO.</h1>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-20"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <h3 class="size-16 font-bold uppercase tracking-widest mb-2">01. Architecture</h3>
                <p class="size-15 text-gray-600 leading-16">Sustainable structures that blend seamlessly with their environment.</p>
            </div>
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <h3 class="size-16 font-bold uppercase tracking-widest mb-2">02. Interiors</h3>
                <p class="size-15 text-gray-600 leading-16">Curated spaces designed for clarity, comfort, and purpose.</p>
            </div>
            <div class="column">
                <div class="flex flex-col justify-end items-end h-full">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 hover:text-white border-current hover:border-transparent" data-bg="" data-hover-bg="rgba(0, 0, 0, 1)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                        View Projects
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="is-section is-box type-system-ui is-content-bottom hover-zoom is-section-60">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-2ANoV.jpg&quot;); background-position: 50% 50%;">
            <div class="is-overlay-color opacity-10"></div>
        </div>
    </div>
    <div class="is-container is-content-left size-17 leading-17 v3 is-content-920">
        <div class="row">
            <div class="column">
                <p class="size-14 text-white uppercase tracking-widest mb-6">The Studio</p>
                <h2 class="size-60 text-white font-light">Copenhagen HQ</h2>
            </div>
        </div>
    </div>
</div>
</div>
		`
		},

		/* Showcase */

		{
			'thumbnail': 'preview/showcase-01.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 size-16 is-content-1400 v3 leading-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-6" style="border-bottom: 1px solid #e5e5e5;">
                    <h2 class="size-60 font-light tracking-tight">Selected Works</h2>
                    <p class="size-14 uppercase tracking-150 text-gray-500 pb-2">2023 — 2024 Collection</p>
                </div>
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3 / 2;">
                    <img src="[%IMAGE_PATH%]images/ai-b4di1.jpg" alt="Minimalist Interior" class="w-full h-full object-cover transition-transform hover:scale-105 duration-1000">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-normal mb-1">Nordic Residence</h3>
                        <p class="size-14 text-gray-500">Copenhagen, Denmark</p>
                    </div>
                    <p class="size-14 text-gray-400">01</p>
                </div>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3 / 2;">
                    <img src="[%IMAGE_PATH%]images/ai-EjMa5-editTiWcFjJ.jpg" alt="Urban Loft" class="w-full h-full object-cover transition-transform hover:scale-105 duration-1000">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-normal mb-1">Aoyama Studio</h3>
                        <p class="size-14 text-gray-500">Tokyo, Japan</p>
                    </div>
                    <p class="size-14 text-gray-400">02</p>
                </div>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3 / 2;">
                    <img src="[%IMAGE_PATH%]images/ai-ePvge-editmFwuCJ6.jpg" alt="Modern Office" class="w-full h-full object-cover transition-transform hover:scale-105 duration-1000">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-normal mb-1">Berlin Headquarters</h3>
                        <p class="size-14 text-gray-500">Berlin, Germany</p>
                    </div>
                    <p class="size-14 text-gray-400">03</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/showcase-02.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui bg-gray-50 is-section-100">
    <div class="is-overlay" style="background-color: rgb(250, 250, 250);"></div>
    <div class="is-container v2 size-16 is-content-1400 pt-11 pb-14 v3 leading-17">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 text-center mb-4">Case Studies</p>
                <h2 class="size-48 font-light text-center">Recent Architecture</h2>
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column bg-white p-0 overflow-hidden">
                <div class="w-full overflow-hidden relative bg-gray-100" style="aspect-ratio:4/3">
                    <img src="[%IMAGE_PATH%]images/ai-b4di1.jpg" alt="Project One" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="p-8">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-3">Residential</p>
                    <h3 class="size-24 font-normal mb-4 leading-12">The Glass House</h3>
                    <p class="size-15 text-gray-600 mb-6">A transparent living space that merges seamlessly with the surrounding forest landscape.</p>
                    <div class="border-t border-gray-100 pt-4">
                        <a href="#" class="size-14 text-black no-underline hover:text-gray-600 transition-colors flex items-center">
                            View Case Study <span class="pl-2">→</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="column bg-white p-0 overflow-hidden">
                <div class="w-full overflow-hidden relative bg-gray-100" style="aspect-ratio:4/3">
                    <img src="[%IMAGE_PATH%]images/ai-EjMa5-editTiWcFjJ.jpg" alt="Project Two" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="p-8">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-3">Commercial</p>
                    <h3 class="size-24 font-normal mb-4 leading-12">Tech Hub Five</h3>
                    <p class="size-15 text-gray-600 mb-6">Sustainable office complex focused on collaborative spaces and natural light.</p>
                    <div class="border-t border-gray-100 pt-4">
                        <a href="#" class="size-14 text-black no-underline hover:text-gray-600 transition-colors flex items-center">
                            View Case Study <span class="pl-2">→</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="column bg-white p-0 overflow-hidden">
                <div class="w-full overflow-hidden relative bg-gray-100" style="aspect-ratio:4/3">
                    <img src="[%IMAGE_PATH%]images/ai-ePvge-editmFwuCJ6.jpg" alt="Project Three" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="p-8">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-3">Cultural</p>
                    <h3 class="size-24 font-normal mb-4 leading-12">Modern Art Museum</h3>
                    <p class="size-15 text-gray-600 mb-6">Revitalizing the city center with a bold, sculptural concrete form.</p>
                    <div class="border-t border-gray-100 pt-4">
                        <a href="#" class="size-14 text-black no-underline hover:text-gray-600 transition-colors flex items-center">
                            View Case Study <span class="pl-2">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/showcase-04.png',
			'category': '3',
			'html': `
<div class="is-section is-box is-section-auto type-system-ui">
    <div class="is-overlay" style="background-color: rgba(250, 250, 250, 1);"></div>
    <div class="is-container is-content-1200 content-py-80 v3">

        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 text-center pb-6">Featured Work</p>
                <h2 class="size-54 font-bold leading-12 text-center pb-6">Recent Projects</h2>
                <p class="size-17 leading-17 text-gray-500 text-center pb-12">A selection of our latest work, showcasing our approach to design, strategy, and creative problem-solving.</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
            </div>
        </div>

        <div class="row" style="gap: 30px;">

            <div class="column pb-8">
                <div class="bg-white p-6 box-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style="border-radius: 12px;">
                    <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 4/3;">
                        <img src="[%IMAGE_PATH%]images/ai-45420-editoV0UxhJ.jpg" alt="Story" class="w-full h-full object-cover duration-1500">
                    </div>
                    <p class="size-14 uppercase tracking-150 text-gray-400 pb-3">Brand Identity</p>
                    <h3 class="size-24 font-bold leading-13 pb-3">The Studio</h3>
                    <p class="size-15 leading-17 text-gray-500 pb-4">A comprehensive rebrand for a forward-thinking technology company, establishing a new visual identity system.</p>
                    <p class="size-16">→</p>
                </div>
            </div>

            <div class="column pb-8">
                <div class="bg-white p-6 box-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style="border-radius: 12px;">

                    <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 4/3;">
                        <img src="[%IMAGE_PATH%]images/ai-MY8Qs-editiFL8KER.jpg" alt="Story" class="w-full h-full object-cover duration-1500">
                    </div>
                    <p class="size-14 uppercase tracking-150 text-gray-400 pb-3">Digital Product</p>
                    <h3 class="size-24 font-bold leading-13 pb-3">Flow Platform</h3>
                    <p class="size-15 leading-17 text-gray-500 pb-4">End-to-end design and development of a SaaS platform focused on team collaboration and productivity.</p>
                    <p class="size-16">→</p>
                </div>
            </div>
        </div>

    </div>
</div>
`
		},
		{
			'thumbnail': 'preview/showcase-05.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-auto">
    <div class="is-overlay"></div>
    <div class="is-container is-content-960 content-py-60 v3">

        <div class="row">
            <div class="column">
                <p class="size-14 text-gray-400 pb-6">
                    <span>2025</span>
                    <span class="px-3">|</span>
                    <span>Brand Identity</span>
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <h1 class="size-60 font-bold leading-12 pb-6">Kinetic Systems</h1>
            </div>
        </div>

        <div class="row">
            <div class="column" style="width: 70%; flex: 0 0 auto;">
                <p class="size-18 leading-17 text-gray-600 pb-12">A comprehensive brand identity for a next-generation robotics company, exploring the intersection of precision engineering and human-centered design through a refined visual language.</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 16/9;margin-bottom: 16px; box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 20px;">
                    <img src="[%IMAGE_PATH%]images/ai-4NlMQ.jpg" alt="Visual Storytelling" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-14 text-gray-500 pb-12">Visual identity system featuring custom typography and motion principles</p>
            </div>
        </div>

        
        <div class="row">
            <div class="column">
                <p class="size-11 uppercase tracking-150 text-gray-400 pb-2 size-14">Client</p>
                <p class="size-15 font-medium">Kinetic Systems Inc.</p>
            </div>
            <div class="column" style="width: 50%; flex: 0 0 auto;">
                <p class="size-11 uppercase tracking-150 text-gray-400 pb-2 size-14">Services</p>
                <p class="size-15 font-medium">Brand Strategy, Identity Design, Guidelines</p>
            </div>
            <div class="column">
                <p class="size-11 uppercase tracking-150 text-gray-400 pb-2 size-14">Year</p>
                <p class="size-15 font-medium">2025</p>
            </div>
        </div>

    </div>
</div>
`
		},
		{
			'thumbnail': 'preview/showcase-03.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 v3 pt-12 pb-12 size-17 leading-17 is-content-1540">
        <div class="row">
            <div class="column">
                <h2 class="size-42 font-light text-left mb-2">Featured Projects</h2>
                <div class="w-full bg-gray-200 mb-12" style="height: 1px;"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 60px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3 / 2;">
                    <img src="[%IMAGE_PATH%]images/ai-0gZN7-editwZUObME.jpg" alt="Interior Detail" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pr-12">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-2">Interior</p>
                    <h3 class="size-28 font-normal mb-3">The Minimalist Kitchen</h3>
                    <p class="text-gray-600">A study in reduction. Removing the non-essential to reveal the beauty of raw materials and light.</p>
                </div>
            </div>

            <div class="column">
                <div class="spacer height-80"></div>
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3 / 2;">
                    <img src="[%IMAGE_PATH%]images/ai-VxvbO-editmeXkBlg.jpg" alt="Living Space" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pr-12">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-2">Living</p>
                    <h3 class="size-28 font-normal mb-3">Open Plan Living</h3>
                    <p class="text-gray-600">Connecting spaces through fluid architecture. The boundaries between inside and outside dissolve.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		/* List */
		{
			'thumbnail': 'preview/list-01.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-100 v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <p class="uppercase tracking-150 size-12 text-gray-400 pb-4">Why Choose Us</p>
                <h2 class="size-60 font-light text-black leading-12">We craft digital experiences with<br>precision and purpose.</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column pb-8" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 30px;">
                <p class="size-14 font-semibold tracking-150 text-gray-300 pb-6">01</p>
                <h3 class="size-24 font-normal pb-4">Strategic Innovation</h3>
                <p class="text-gray-600">We don't just build; we strategize. Every pixel serves a purpose, driving measurable growth for your business through data-backed design decisions.</p>
            </div>
            <div class="column pb-8" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 30px;">
                <p class="size-14 font-semibold tracking-150 text-gray-300 pb-6">02</p>
                <h3 class="size-24 font-normal pb-4">Technical Excellence</h3>
                <p class="text-gray-600">Our code is as clean as our designs. We utilize cutting-edge frameworks to ensure your digital presence is fast, secure, and scalable.</p>
            </div>
            <div class="column pb-8" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 30px;">
                <p class="size-14 font-semibold tracking-150 text-gray-300 pb-6">03</p>
                <h3 class="size-24 font-normal pb-4">Human-Centric</h3>
                <p class="text-gray-600">We design for people first. By prioritizing user experience and accessibility, we create products that are intuitive and delightful to use.</p>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/list-07.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container size-17 leading-17 v3 pt-16 pb-12 is-content-1300">
        <div class="row" style="gap: 60px;">
            <div class="column flex flex-col justify-end">
                <p class="uppercase tracking-150 size-12 text-gray-400 mb-4">Distinctions</p>
                <h2 class="size-48 leading-12 font-light text-black">Why leading brands choose us.</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column">
                <div class="flex pb-10 mb-10 transition-transform duration-300 ease-out hover:translate-x-2" style="border-bottom: 1px solid #e0e0e0;">
                    <div class="pr-6 pt-5">
                        <i class="bi bi-globe size-24 text-black"></i>
                    </div>
                    <div>
                        <h3 class="size-24 font-normal mb-3">Global Perspective</h3>
                        <p class="size-16 leading-17 text-gray-600">
                            Our team spans three continents, bringing diverse cultural insights to every project. We design experiences that transcend borders while respecting local nuances, ensuring your brand resonates globally.
                        </p>
                    </div>
                </div>
                <div class="flex pb-10 mb-10 transition-transform duration-300 ease-out hover:translate-x-2" style="border-bottom: 1px solid #e0e0e0;">
                    <div class="pr-6 pt-5">
                        <i class="bi bi-graph-up-arrow size-24 text-black"></i>
                    </div>
                    <div>
                        <h3 class="size-24 font-normal mb-3">Data-Driven Design</h3>
                        <p class="size-16 leading-17 text-gray-600">
                            We move beyond intuition. Every design decision is backed by rigorous analytics and user testing. We continuously monitor performance metrics to optimize engagement and conversion rates.
                        </p>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="flex pb-10 mb-10 transition-transform duration-300 ease-out hover:translate-x-2" style="border-bottom: 1px solid #e0e0e0;">
                    <div class="pr-6 pt-5">
                        <i class="bi bi-cpu size-24 text-black"></i>
                    </div>
                    <div>
                        <h3 class="size-24 font-normal mb-3">
                            Future-Proof Tech</h3>
                        <p class="size-16 leading-17 text-gray-600">
                            Utilizing the latest frameworks and headless architecture, we build platforms designed for longevity. Our code is modular, scalable, and ready to integrate with tomorrow's technologies.
                        </p>
                    </div>
                </div>
                <div class="flex pb-10 mb-10 transition-transform duration-300 ease-out hover:translate-x-2" style="border-bottom: 1px solid #e0e0e0;">
                    <div class="pr-6 pt-5">
                        <i class="bi bi-flower1 size-24 text-black"></i>
                    </div>
                    <div>
                        <h3 class="size-24 font-normal mb-3">Sustainable Digital</h3>
                        <p class="size-16 leading-17 text-gray-600">
                            We prioritize low-carbon coding practices and efficient asset delivery. Our digital solutions are optimized for energy efficiency, reducing your brand's digital carbon footprint.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

		{
			'thumbnail': 'preview/item-237c.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui bg-gray-50 is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1200 content-py-100 pt-11 pb-16 v3 leading-17 size-17">
        <div class="row">
            <div class="column">
                <h2 class="size-48 font-light">The Methodology</h2>

            </div>
            <div class="column flex flex-col justify-center">

                <p class="uppercase tracking-150 size-12 text-gray-500 text-right hidden-mobile">Why Choose Us</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row pt-8 pb-8" style="border-top: 1px solid #e5e5e5;">
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <p class="size-14 font-bold text-black tracking-widest pt-2">01</p>
            </div>
            <div class="column" style="width: 35%; flex: 0 0 auto;">
                <h3 class="size-24 font-normal">Flexible Engagement</h3>
            </div>
            <div class="column">
                <p class="text-gray-600">
                    We adapt to your workflow. Whether you need a dedicated team or project-based support, our engagement models are designed to fit your specific business requirements.
                </p>
            </div>
        </div>

        <div class="row pt-8 pb-8" style="border-top: 1px solid #e5e5e5;">
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <p class="size-14 font-bold text-black tracking-widest pt-2">02</p>
            </div>
            <div class="column" style="width: 35%; flex: 0 0 auto;">
                <h3 class="size-24 font-normal">Senior Expertise</h3>
            </div>
            <div class="column">
                <p class="text-gray-600">
                    Direct access to experienced leads. We don't hand off your project to juniors; our senior partners are involved in every step of the creative and technical process.
                </p>
            </div>
        </div>

        <div class="row pt-8 pb-8" style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <p class="size-14 font-bold text-black tracking-widest pt-2">03</p>
            </div>
            <div class="column" style="width: 35%; flex: 0 0 auto;">
                <h3 class="size-24 font-normal">Long-term Support</h3>
            </div>
            <div class="column">
                <p class="text-gray-600">
                    We build for the future. Our relationship doesn't end at launch; we provide ongoing maintenance, optimization, and strategic guidance to ensure continued growth.
                </p>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-230c.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1400 v3 leading-17 size-17">
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="uppercase tracking-150 size-12 text-gray-400 text-center pb-6">Digital Creative Studio</p>
                <h1 class="text-center font-light size-72 pb-6 leading-12">Design with a spark<br>of intelligence.</h1>
                <p class="text-center text-gray-600" style="max-width: 600px; margin: 0 auto;">
                    We combine aesthetic precision with technical excellence to build brands that stand the test of time.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column" style="border-top: 1px solid rgb(238, 238, 238);">
                <div class="spacer height-20"></div>
                <div class="pb-6">
                    <p class="size-12 font-bold text-black">01</p>
                </div>
                <h3 class="font-medium size-24 pb-4">Full Stack</h3>
                <p class="text-gray-600">
                    Scalable architectures and robust backend solutions built for performance and security.
                </p>
            </div>

            <div class="column" style="border-top: 1px solid rgb(238, 238, 238);">
                <div class="spacer height-20"></div>
                <div class="pb-6">
                    <p class="size-12 font-bold text-black">02</p>
                </div>
                <h3 class="font-medium size-24 pb-4">UI/UX Design</h3>
                <p class="text-gray-600">
                    User-centric interfaces that blend intuitive functionality with stunning visual design.
                </p>
            </div>

            <div class="column" style="border-top: 1px solid rgb(238, 238, 238);">
                <div class="spacer height-20"></div>
                <div class="pb-6">
                    <p class="size-12 font-bold text-black">03</p>
                </div>
                <h3 class="font-medium size-24 pb-4">Illustration</h3>
                <p class="text-gray-600">
                    Bespoke visual assets and iconography that give your brand a unique voice.
                </p>
            </div>

            <div class="column" style="border-top: 1px solid #eeeeee;">
                <div class="spacer height-20"></div>
                <div class="pb-6">
                    <p class="size-12 font-bold text-black">04</p>
                </div>
                <h3 class="font-medium size-24 pb-4">Branding</h3>
                <p class="text-gray-600">
                    Comprehensive identity systems that communicate your values across all touchpoints.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/list-02.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay" style="background-color: #fafafa;"></div>
    <div class="is-container is-content-1200 content-py-100 v3 pt-10 pb-16 size-17 leading-15">
        <div class="row">
            <div class="column text-center">
                <h2 class="size-42 font-light pb-4">Our Capabilities</h2>
                <p class="text-gray-600 font-light">Comprehensive solutions for the modern web.</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="p-10 box-border h-full bg-white transition-transform duration-300 ease-out hover:-translate-y-2">
                    <i class=" bi bi-lightbulb size-32 text-gray-700 mb-6 inline-block"></i>
                    <h3 class="font-medium pb-3 size-24">Creative Direction</h3>
                    <p class="size-15 text-gray-600">Establishing a unique visual language that resonates with your target audience and elevates your brand.</p>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border h-full bg-white transition-transform duration-300 ease-out hover:-translate-y-2">
                    <i class=" bi bi-gear size-32 text-gray-700 mb-6 inline-block"></i>
                    <h3 class="font-medium pb-3 size-24">System Architecture</h3>
                    <p class="size-15 text-gray-600">Building robust, scalable back-end systems that power your applications with reliability and speed.</p>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border h-full bg-white transition-transform duration-300 ease-out hover:-translate-y-2">
                    <i class="bi bi-camera size-32 text-gray-700 mb-6 inline-block"></i>
                    <h3 class="font-medium pb-3 size-24">Visual Content</h3>
                    <p class="size-15 text-gray-600">High-end photography and videography production to tell your story with cinematic quality.</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-30"></div>
            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="p-10 box-border h-full bg-white transition-transform duration-300 ease-out hover:-translate-y-2">
                    <i class="bi bi-phone size-32 text-gray-700 mb-6 inline-block"></i>
                    <h3 class="font-medium pb-3 size-24">Mobile First</h3>
                    <p class="size-15 text-gray-600">Responsive designs that provide a seamless experience across all devices, from desktop to mobile.</p>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border h-full bg-white transition-transform duration-300 ease-out hover:-translate-y-2">
                    <i class="bi bi-file-earmark-text size-32 text-gray-700 mb-6 inline-block"></i>
                    <h3 class="font-medium pb-3 size-24">Content Strategy</h3>
                    <p class="size-15 text-gray-600">Crafting compelling narratives and copy that engage visitors and drive conversions.</p>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border h-full bg-white transition-transform duration-300 ease-out hover:-translate-y-2">
                    <i class="bi bi-clock size-32 text-gray-700 mb-6 inline-block"></i>
                    <h3 class="font-medium pb-3 size-24">Rapid Deployment</h3>
                    <p class="size-15 text-gray-600">Agile methodologies that ensure quick turnaround times without compromising on quality.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/list-03.png',
			'category': '4',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay" style="background-color: #ffffff;"></div>
        <div class="is-container is-content-600 content-py-80 v3 size-17 leading-15">
            <div class="row">
                <div class="column">
                    <p class="uppercase tracking-150 size-12 text-gray-400 pb-4">Our Expertise</p>
                    <h2 class="size-48 font-light pb-8">Services We Provide</h2>

                    <div class="pb-6 mb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="flex justify-between items-center pb-2">
                            <span class="size-24 font-light text-gray-300">01</span>
                            <h3 class="font-normal size-21">Web Development</h3>
                        </div>
                        <p class="text-gray-600 pl-12 size-17">Custom frontend and backend solutions tailored to your specific business needs.</p>
                    </div>

                    <div class="pb-6 mb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="flex justify-between items-center pb-2">
                            <span class="size-24 font-light text-gray-300">02</span>
                            <h3 class="font-normal size-21">Brand &amp; Identity</h3>
                        </div>
                        <p class="text-gray-600 pl-12 size-17">Logo design, typography systems, and brand guidelines that define your market position.</p>
                    </div>

                    <div class="pb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="flex justify-between items-center pb-2">
                            <span class="size-24 font-light text-gray-300">03</span>
                            <h3 class="font-normal size-21">Digital Marketing</h3>
                        </div>
                        <p class="text-gray-600 pl-12 size-17">SEO, content marketing, and paid strategies to increase visibility and ROI.</p>
                    </div>

                    <div class="spacer height-40"></div>

                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-15 border-black hover:bg-black hover:text-white text-black bg-transparent border-current hover:border-transparent" data-hover-bg="rgb(0, 0, 0)" data-bg="rgba(0, 0, 0, 0)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''" style="background-color: rgba(0, 0, 0, 0);">
                            View All Services
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-7">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-K89cM.jpg'); 
                        background-position: 100% 60%; 
                        transition: transform 1.5s ease;">
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/list-04.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay" style="background-color: rgb(250, 250, 250);"></div>
    <div class="is-container is-content-1400 content-py-80 size-17 leading-17 v3">
        <div class="row">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Our Process</p>
                <h2 class="size-54 font-light leading-12 pb-6">How we bring ideas to life.</h2>
                <p class="size-16 leading-17 text-gray-600">A proven methodology refined over hundreds of successful projects, designed to minimize risk and maximize results.</p>
            </div>
            <div class="column">
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row">
            <div class="column pb-6">
                <div class="p-8 box-border bg-white h-full transition-transform duration-300 ease-out hover:-translate-y-2" style="border-bottom: 2px solid #18181b;">
                    <div class="flex justify-between pb-6">
                        <p class="size-48 font-light text-gray-300">01</p>
                        <p class="size-12 uppercase tracking-150 text-gray-400">Week 1-2</p>
                    </div>
                    <h3 class="size-21 font-medium pb-4">Discovery &amp; Strategy</h3>
                    <p class="size-15 leading-17 text-gray-600">Deep dive into your business objectives, user needs, and market landscape. We define success metrics and create a strategic roadmap.</p>
                </div>
            </div>
            <div class="column pb-6">
                <div class="p-8 box-border bg-white h-full transition-transform duration-300 ease-out hover:-translate-y-2" style="border-bottom: 2px solid #18181b;">
                    <div class="flex justify-between pb-6">
                        <p class="size-48 font-light text-gray-300">02</p>
                        <p class="size-12 uppercase tracking-150 text-gray-400">Week 3-4</p>
                    </div>
                    <h3 class="size-21 font-medium pb-4">Design &amp; Prototype</h3>
                    <p class="size-15 leading-17 text-gray-600">Transform insights into interactive prototypes. Rapid iteration with stakeholder feedback ensures alignment before development begins.</p>
                </div>
            </div>
            <div class="column pb-6">
                <div class="p-8 box-border bg-white h-full transition-transform duration-300 ease-out hover:-translate-y-2" style="border-bottom: 2px solid #18181b;">
                    <div class="flex justify-between pb-6">
                        <p class="size-48 font-light text-gray-300">03</p>
                        <p class="size-12 uppercase tracking-150 text-gray-400">Week 5-10</p>
                    </div>
                    <h3 class="size-21 font-medium pb-4">Build &amp; Iterate</h3>
                    <p class="size-15 leading-17 text-gray-600">Agile development with bi-weekly demos. Continuous integration ensures quality while maintaining flexibility for refinements.</p>
                </div>
            </div>
            <div class="column pb-6">
                <div class="p-8 box-border bg-white h-full transition-transform duration-300 ease-out hover:-translate-y-2" style="border-bottom: 2px solid #18181b;">
                    <div class="flex justify-between pb-6">
                        <p class="size-48 font-light text-gray-300">04</p>
                        <p class="size-12 uppercase tracking-150 text-gray-400">Week 11-12</p>
                    </div>
                    <h3 class="size-21 font-medium pb-4">Launch &amp; Optimize</h3>
                    <p class="size-15 leading-17 text-gray-600">Strategic rollout with performance monitoring. Post-launch analytics drive continuous optimization and growth.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/list-05.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-80 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 text-center pb-4">By The Numbers</p>
                <h2 class="size-48 font-light leading-12 text-center pb-2">Results that speak for themselves.</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column pb-8">
                <div class="p-10 bg-white box-border h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg" style="border: 1px solid #e5e5e5;">
                    <p class="size-72 font-light leading-12 text-center pb-4" style="color: #18181b;">847</p>
                    <div style="width: 40px; height: 1px; background: #d4d4d4; margin: 0 auto 20px;"></div>
                    <h3 class="size-14 uppercase tracking-150 font-medium text-center pb-3">Projects Delivered</h3>
                    <p class="size-14 leading-16 text-gray-500 text-center">Successful launches across web, mobile, and enterprise platforms since 2018.</p>
                </div>
            </div>
            <div class="column pb-8">
                <div class="p-10 bg-white box-border h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg" style="border: 1px solid #e5e5e5;">
                    <p class="size-72 font-light leading-12 text-center pb-4" style="color: #18181b;">98<span class="size-42">%</span></p>
                    <div style="width: 40px; height: 1px; background: #d4d4d4; margin: 0 auto 20px;"></div>
                    <h3 class="size-14 uppercase tracking-150 font-medium text-center pb-3">Client Retention</h3>
                    <p class="size-14 leading-16 text-gray-500 text-center">Long-term partnerships built on trust, transparency, and exceptional results.</p>
                </div>
            </div>
            <div class="column pb-8">
                <div class="p-10 bg-white box-border h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg" style="border: 1px solid #e5e5e5;">
                    <p class="size-72 font-light leading-12 text-center pb-4" style="color: #18181b;">42</p>
                    <div style="width: 40px; height: 1px; background: #d4d4d4; margin: 0 auto 20px;"></div>
                    <h3 class="size-14 uppercase tracking-150 font-medium text-center pb-3">Countries Reached</h3>
                    <p class="size-14 leading-16 text-gray-500 text-center">Global presence serving clients from startups to Fortune 500 companies.</p>
                </div>
            </div>
            <div class="column pb-8">
                <div class="p-10 bg-white box-border h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg" style="border: 1px solid #e5e5e5;">
                    <p class="size-72 font-light leading-12 text-center pb-4" style="color: #18181b;">24<span class="size-42">h</span></p>
                    <div style="width: 40px; height: 1px; background: #d4d4d4; margin: 0 auto 20px;"></div>
                    <h3 class="size-14 uppercase tracking-150 font-medium text-center pb-3">Response Time</h3>
                    <p class="size-14 leading-16 text-gray-500 text-center">Dedicated support with guaranteed response within one business day.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		

		{
			'thumbnail': 'preview/logolist-02.png',
			'category': '8',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 size-17 leading-17">
        <div class="row">
            <div class="column text-center">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Trusted Globally</p>
                <h2 class="size-42 leading-13 font-normal text-black pb-8">Industry Leaders</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row flex justify-center items-center" style="gap: 60px;">
            <div class="column flex-none flex flex-col items-center">
                <img src="[%IMAGE_PATH%]images/creative.png" alt="Creative" class="logo-grayscale" style="height: 60px; width: auto;">
            </div>
            <div class="column flex-none flex flex-col items-center">
                <img src="[%IMAGE_PATH%]images/light-studio.png" alt="Light Studio" class="logo-grayscale" style="height: 60px; width: auto;">
            </div>
            <div class="column flex-none flex flex-col items-center">
                <img src="[%IMAGE_PATH%]images/infinitech.png" alt="Infinitech" class="logo-grayscale" style="height: 60px; width: auto;">
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/logolist-03.png',
			'category': '8',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 size-18 leading-17">
        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <div class="sticky top-0 pt-12">
                    <h2 class="size-60 leading-12 font-light pb-6">Our Partners</h2>
                    <div style="width: 40px; height: 2px; background-color: #000;" class="mb-6"></div>
                    <p class="size-18 leading-17 text-gray-600">
                        We are globally recognized and trusted by the world's most innovative companies. Together, we define the digital landscape.
                    </p>
                    <div class="spacer height-40"></div>
                    <a href="#" class="size-14 uppercase tracking-150 font-semibold text-black border-b-2 border-black pb-1 no-underline hover:text-gray-600 hover:border-gray-600 transition-colors">
                        Become a Partner
                    </a>
                </div>
            </div>
            <div class="column flex flex-col justify-end">
                <div class="row" style="gap: 20px;">
                    <div class="column p-10 bg-gray-50 flex justify-center items-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
                        <img src="[%IMAGE_PATH%]images/infinitech.png" alt="Infinitech" style="max-height: 70px;">
                    </div>
                    <div class="column p-10 bg-gray-50 flex justify-center items-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
                        <img src="[%IMAGE_PATH%]images/light-studio.png" alt="Light Studio" style="max-height: 70px;">
                    </div>
                </div>
                <div class="spacer height-20"></div>
                <div class="row" style="gap: 20px;">
                    <div class="column p-10 bg-gray-50 flex justify-center items-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
                        <img src="[%IMAGE_PATH%]images/steady.png" alt="Steady" style="max-height: 70px;">
                    </div>
                    <div class="column p-10 bg-gray-50 flex justify-center items-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
                        <img src="[%IMAGE_PATH%]images/sitepro.png" alt="SitePro" style="max-height: 70px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/logolist-04.png',
			'category': '8',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container v3 is-content-1280 size-16 leading-17">
        <div class="row">
            <div class="column">
                <p class="uppercase tracking-150 size-12 text-gray-500 font-medium">01 — Relationships</p>
                <div class="spacer height-20"></div>
                <h2 class="size-60 leading-12 font-light text-black">Selected Clientele</h2>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="size-16 leading-17 text-gray-600 pl-4" style="border-left: 1px solid #e5e5e5; max-width: 400px;">
                    We collaborate with ambitious brands and people; we’d love to build something great together.
                </p>
                <div class="spacer height-10"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="border-top: 1px solid #eee; border-left: 1px solid #eee;">
            <div class="column flex justify-center items-center py-4 px-3" style="border-right: 1px solid #eee; border-bottom: 1px solid #eee;">
                <img src="[%IMAGE_PATH%]images/creative.png" alt="Creative" style="max-height: 70px;">
            </div>
            <div class="column flex justify-center items-center py-4 px-3" style="border-right: 1px solid rgb(238, 238, 238); border-bottom: 1px solid rgb(238, 238, 238);">
                <img src="[%IMAGE_PATH%]images/steady.png" alt="Steady" style="max-height: 70px;">
            </div>
            <div class="column flex justify-center items-center py-4 px-3" style="border-right: 1px solid rgb(238, 238, 238); border-bottom: 1px solid rgb(238, 238, 238);">
                <img src="[%IMAGE_PATH%]images/light-studio.png" alt="Light Studio" style="max-height: 70px;">
            </div>
        </div>
        <div class="row" style="border-left: 1px solid #eee;">
            <div class="column flex justify-center items-center py-4 px-3" style="border-right: 1px solid rgb(238, 238, 238); border-bottom: 1px solid rgb(238, 238, 238);">
                <img src="[%IMAGE_PATH%]images/infinitech.png" alt="Infinitech" style="max-height: 70px;">
            </div>
            <div class="column flex justify-center items-center py-4 px-3" style="border-right: 1px solid rgb(238, 238, 238); border-bottom: 1px solid rgb(238, 238, 238);">
                <img src="[%IMAGE_PATH%]images/design-firm.png" alt="Design Firm" style="max-height: 70px;">
            </div>
            <div class="column flex justify-center items-center py-4 px-3" style="border-right: 1px solid rgb(238, 238, 238); border-bottom: 1px solid rgb(238, 238, 238);">
                <img src="[%IMAGE_PATH%]images/sitepro.png" alt="SitePro" style="max-height: 70px;">
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/logolist-06.png',
			'category': '8',
			'html': `
<div class="is-section is-box type-system-ui is-section-70 is-content-bottom edge-y-2 is-light-text hover-zoom">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-Dv3Cv.jpg'); background-position: 50% 50%;"></div>
        <div class="is-overlay-color opacity-10" style="background-color: #000;"></div>
    </div>
    <div class="is-container is-content-left is-content-1400 v3">
        <div class="row">
            <div class="column">
                <p class="text-white size-14 uppercase tracking-150 mb-2">Case Study</p>
                <h2 class="text-white size-48 font-light">Redefining Architecture</h2>
            </div>
        </div>
    </div>
</div>
<div class="is-section is-box type-system-ui is-section-30">
    <div class="is-overlay" style="background-color: #fff;"></div>
    <div class="is-container v3 is-content-1240 size-17 leading-17">
        <div class="row items-center">
            <div class="column" style="width: 25%; flex: 0 0 auto; border-right: 1px solid #eee;">
                <p class="size-12 uppercase tracking-150 text-gray-500">As Featured In</p>
            </div>
            <div class="column pl-12">
                <div class="flex justify-between items-center" style="gap: 40px;">
                    <img src="[%IMAGE_PATH%]images/onesight.png" alt="Onesight" style="max-height: 70px;">
                    <img src="[%IMAGE_PATH%]images/mmedia.png" alt="MMedia" style="max-height: 70px;">
                    <img src="[%IMAGE_PATH%]images/digitalmag.png" alt="Digital Mag" style="max-height: 70px;">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/logolist-07.png',
			'category': '8',
			'html': `
<div class="is-section type-system-ui is-section-80">
    <div class="is-box is-box-5 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-9r9Ri.jpg'); background-position: center;"></div>
        </div>
    </div>

    <div class="is-box is-box-7" style="background-color: #fff;">
        <div class="is-overlay"></div>
        <div class="is-container is-content-800 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Press</p>
                    <h2 class="size-48 font-light leading-12 pb-12">Recognition</h2>
                </div>
            </div>

            <div class="row" style="gap: 1px; background-color: #eee; border: 1px solid #eee;">
                <div class="column bg-white p-8 flex justify-center items-center">
                    <img src="[%IMAGE_PATH%]images/upclick.png" alt="Upclick" class="logo-grayscale" style="max-height: 70px;">
                </div>
                <div class="column bg-white p-8 flex justify-center items-center">
                    <img src="[%IMAGE_PATH%]images/digitalmag.png" alt="DigitalMag" class="logo-grayscale" style="max-height: 70px;">
                </div>
                <div class="column bg-white p-8 flex justify-center items-center">
                    <img src="[%IMAGE_PATH%]images/mmedia.png" alt="MMedia" class="logo-grayscale" style="max-height: 70px;">
                </div>
            </div>
            <div class="row" style="gap: 1px; background-color: #eee; border-left: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee;">
                <div class="column bg-white p-8 flex justify-center items-center">
                    <img src="[%IMAGE_PATH%]images/prosource.png" alt="ProSource" class="logo-grayscale" style="max-height: 70px;">
                </div>
                <div class="column bg-white p-8 flex justify-center items-center">
                    <img src="[%IMAGE_PATH%]images/nett.png" alt="Nett" class="logo-grayscale" style="max-height: 70px;">
                </div>
                <div class="column bg-white p-8 flex justify-center items-center">
                    <img src="[%IMAGE_PATH%]images/worldwide.png" alt="Worldwide" class="logo-grayscale" style="max-height: 70px;">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/logolist-08.png',
			'category': '8',
			'html': `
<div class="is-section is-box type-system-ui is-section-80">
    <div class="is-overlay" style="background-color: #f9f9f9;"></div>
    <div class="is-container v3 is-content-1340 size-16 leading-17">
        <div class="row items-center" style="gap: 60px;">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <h2 class="size-42 font-semibold leading-12 pb-6">As Seen On</h2>
                <p class="size-16 leading-17 text-gray-600 pb-8">
                    Our work has been featured in leading design publications and technology journals worldwide. We strive for excellence in every pixel.
                </p>
                <div class="p-8 bg-white" style="border-left: 4px solid #000;">
                    <p class="size-14 italic text-gray-700">"The most innovative design team we've worked with in a decade."</p>
                    <div class="spacer height-10"></div>
                    <p class="size-12 uppercase tracking-150 font-bold">Tech Weekly</p>
                </div>
            </div>
            <div class="column">
                <div class="row" style="gap: 20px;">
                    <div class="column bg-white p-6 rounded shadow-sm flex justify-center items-center transition-all hover:-translate-y-1">
                        <img src="[%IMAGE_PATH%]images/upclick.png" alt="Upclick" style="max-height: 70px;">
                    </div>
                    <div class="column bg-white p-6 rounded shadow-sm flex justify-center items-center transition-all hover:-translate-y-1">
                        <img src="[%IMAGE_PATH%]images/digitalmag.png" alt="DigitalMag" style="max-height: 70px;">
                    </div>
                    <div class="column bg-white p-6 rounded shadow-sm flex justify-center items-center transition-all hover:-translate-y-1">
                        <img src="[%IMAGE_PATH%]images/mmedia.png" alt="MMedia" style="max-height: 70px;">
                    </div>
                </div>
                <div class="spacer height-20"></div>
                <div class="row" style="gap: 20px;">
                    <div class="column bg-white p-6 rounded shadow-sm flex justify-center items-center transition-all hover:-translate-y-1">
                        <img src="[%IMAGE_PATH%]images/prosource.png" alt="ProSource" style="max-height: 70px;">
                    </div>
                    <div class="column bg-white p-6 rounded shadow-sm flex justify-center items-center transition-all hover:-translate-y-1">
                        <img src="[%IMAGE_PATH%]images/worldwide.png" alt="Worldwide" style="max-height: 70px;">
                    </div>
                    <div class="column bg-white p-6 rounded shadow-sm flex justify-center items-center transition-all hover:-translate-y-1">
                        <img src="[%IMAGE_PATH%]images/bbuzz.png" alt="Bbuzz" style="max-height: 70px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/logolist-09.png',
			'category': '8',
			'html': `
<div class="is-section is-box type-system-ui is-section-80">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row">
            <div class="column text-center">
                <h2 class="size-96 font-light leading-none tracking-tight">FEATURED ON</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="border-top: 1px solid #000; border-bottom: 1px solid #000;">
            <div class="column flex justify-center items-center py-8 border-r border-gray-200" style="border-right: 1px solid #eee;">
                <img src="[%IMAGE_PATH%]images/upclick.png" alt="Upclick" class="logo-grayscale" style="max-height: 60px;">
            </div>
            <div class="column flex justify-center items-center py-8 border-r border-gray-200" style="border-right: 1px solid #eee;">
                <img src="[%IMAGE_PATH%]images/digitalmag.png" alt="Digital Mag" class="logo-grayscale" style="max-height: 60px;">
            </div>
            <div class="column flex justify-center items-center py-8 border-r border-gray-200" style="border-right: 1px solid #eee;">
                <img src="[%IMAGE_PATH%]images/mmedia.png" alt="MMedia" class="logo-grayscale" style="max-height: 60px;">
            </div>
            <div class="column flex justify-center items-center py-8 border-r border-gray-200" style="border-right: 1px solid rgb(238, 238, 238);">
                <img src="[%IMAGE_PATH%]images/bbuzz.png" alt="Bbuzz" class="logo-grayscale" style="max-height: 60px;">
            </div>
            <div class="column flex justify-center items-center py-8">
                <img src="[%IMAGE_PATH%]images/prosource.png" alt="ProSource" class="logo-grayscale" style="max-height: 60px;">
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row">
            <div class="column" style="width: 50%; margin: 0 auto; flex: 0 0 auto;">
                <p class="text-center size-18 leading-17 text-gray-600">
                    "A transformative approach to digital design that sets a new standard for the industry."
                </p>
                <div class="spacer height-20"></div>
                <p class="text-center size-12 uppercase tracking-150 text-gray-400">Digital Magazine, 2024</p>
            </div>
        </div>
    </div>
</div>
		`
		},

		/* Pricing */
		{
			'thumbnail': 'preview/pricing-01.png',
			'category': '9',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pt-12 pb-20 size-17 leading-17">
        <div class="row">
            <div class="column">
                <p class="uppercase tracking-150 size-12 text-gray-500 text-center pb-4">Membership Options</p>
                <h2 class="size-48 leading-12 font-light text-center pb-6">Simple, transparent pricing.</h2>
                <div style="width: 60px; height: 1px; background-color: #000; margin: 0 auto;"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap: 30px;">
            <div class="column p-0">
                <div class="p-10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl" style="border: 1px solid #e5e5e5; background-color: #fff;">
                    <div class="flex justify-between items-baseline pb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <h3 class="size-16 uppercase tracking-150 font-semibold">Starter</h3>
                        <p class="size-32 font-light">$29<span class="size-14 text-gray-500 font-normal">/mo</span></p>
                    </div>
                    <div class="spacer height-40"></div>
                    <p class="text-gray-600 leading-17 pb-6 size-17">Perfect for freelancers and solo designers starting their journey.</p>
                    <ul class="size-15 leading-18 text-gray-700 pb-8" style="list-style: none; padding: 0;">
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> 5 Active Projects</li>
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> Basic Analytics</li>
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> 24/7 Email Support</li>
                        <li class="pb-2 flex items-center text-gray-400"><span class="pr-3">×</span> Team Collaboration</li>
                    </ul>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 border-current hover:text-white hover:border-transparent" data-bg="" data-hover-bg="rgba(0, 0, 0, 1)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">Get Started</a>
                    </div>
                </div>
            </div>

            <div class="column p-0">
                <div class="p-10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl relative" style="border: 1px solid #000; background-color: #fff;">
                    <div style="position: absolute; top: 0px; left: 50%; transform: translate(-50%, -50%); background: rgb(0, 0, 0); color: rgb(255, 255, 255); padding: 4px 12px; font-size: 11px; letter-spacing: 1px;" class="uppercase">Most Popular</div>
                    <div class="flex justify-between items-baseline pb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <h3 class="size-16 uppercase tracking-150 font-semibold">Professional</h3>
                        <p class="size-32 font-light">$59<span class="size-14 text-gray-500 font-normal">/mo</span></p>
                    </div>
                    <div class="spacer height-40"></div>
                    <p class="text-gray-600 leading-17 pb-6 size-17">Ideal for growing teams requiring advanced tools and workflows.</p>
                    <ul class="size-15 leading-18 text-gray-700 pb-8" style="list-style: none; padding: 0;">
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> 20 Active Projects</li>
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> Advanced Analytics</li>
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> Priority Support</li>
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> 5 Team Members</li>
                    </ul>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(250, 250, 250); background-color: rgb(24, 24, 27);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)">Get Started</a>
                    </div>
                </div>
            </div>

            <div class="column p-0">
                <div class="p-10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl" style="border: 1px solid #e5e5e5; background-color: #fff;">
                    <div class="flex justify-between items-baseline pb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <h3 class="size-16 uppercase tracking-150 font-semibold">Enterprise</h3>
                        <p class="size-32 font-light">$99<span class="size-14 text-gray-500 font-normal">/mo</span></p>
                    </div>
                    <div class="spacer height-40"></div>
                    <p class="text-gray-600 leading-17 pb-6 size-17">Full-scale solutions for large organizations with custom needs.</p>
                    <ul class="size-15 leading-18 text-gray-700 pb-8" style="list-style: none; padding: 0;">
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> Unlimited Projects</li>
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> Custom Reporting</li>
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> Dedicated Manager</li>
                        <li class="pb-2 flex items-center"><span class="pr-3 text-black">✓</span> Unlimited Users</li>
                    </ul>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 border-current hover:text-white hover:border-transparent" data-bg="" data-hover-bg="rgba(0, 0, 0, 1)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">Contact Sales</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/pricing-02.png',
			'category': '9',
			'html': `
<div class="is-section is-box type-system-ui is-section-auto bg-gray-50">
    <div class="is-overlay" style="background-color: rgb(248, 248, 248);"></div>
    <div class="is-container is-content-980 content-pt-80 content-pb-80 v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-42 leading-12 font-light text-center pb-4">Tailored Solutions</h2>
                <p class="size-16 text-gray-600 text-center max-w-lg mx-auto">Select the tier that aligns with your business goals.</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column p-0">
                <div class="p-12 box-border bg-white h-full flex flex-col items-center text-center transition-transform duration-300 ease-out hover:scale-105" style="box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);">
                    <h3 class="size-24 font-normal pb-2">Standard</h3>
                    <p class="size-14 uppercase tracking-150 text-gray-400 pb-6">For Individuals</p>
                    <p class="size-60 font-light pb-6">$19</p>
                    <p class="text-gray-600 leading-17 pb-8 size-17">Essential tools to get your personal projects off the ground with ease and efficiency.</p>
                    <div class="w-full" style="border-top: 1px solid #f5f5f5;"></div>
                    <div class="spacer height-30"></div>
                    <ul class="size-15 leading-18 text-gray-600 pb-8 text-left inline-block">
                        <li class="pb-2">✓ 10 GB Secure Storage</li>
                        <li class="pb-2">✓ Up to 2 User Accounts</li>
                        <li class="pb-2">✓ 2 Custom Domains</li>
                    </ul>
                    <div class="mt-auto">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-8 size-15 leading-14 border-gray-200 text-black hover:border-black border-current">Select Standard</a>
                    </div>
                </div>
            </div>
            <div class="column p-0">
                <div class="p-12 box-border bg-white h-full flex flex-col items-center text-center transition-transform duration-300 ease-out hover:scale-105" style="box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);">
                    <h3 class="size-24 font-normal pb-2">Professional</h3>
                    <p class="size-14 uppercase tracking-150 text-gray-400 pb-6">For Business</p>
                    <p class="size-60 font-light pb-6">$49</p>
                    <p class="text-gray-600 leading-17 pb-8 size-17">Advanced features designed to scale with your growing business requirements.</p>
                    <div class="w-full" style="border-top: 1px solid #f5f5f5;"></div>
                    <div class="spacer height-30"></div>
                    <ul class="size-15 leading-18 text-gray-600 pb-8 text-left inline-block">
                        <li class="pb-2">✓ 100 GB Secure Storage</li>
                        <li class="pb-2">✓ Up to 10 User Accounts</li>
                        <li class="pb-2">✓ Unlimited Domains</li>
                    </ul>
                    <div class="mt-auto">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-8 size-15 leading-14 border-black bg-black text-white hover:border-gray-800 border-transparent hover:text-white" data-bg="rgb(0, 0, 0)" data-hover-bg="rgba(66, 66, 66, 1)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''" style="background-color: rgb(0, 0, 0);">Select Pro</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/pricing-03.png',
			'category': '9',
			'html': `
<div class="is-section is-section-100 is-box box-autofit type-system-ui min-height-60">
    <div class="is-overlay" style="background-color: rgb(247, 247, 247);">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-K8b7e.jpg&quot;); background-position: 50% 60%;"></div>
    </div>
    <div class="is-container is-content-1500 v2 size-17 leading-14 content-pt-50 content-pb-50 is-content-left edge-x-2">
        <div class="row">
            <div class="column center">
                <h2 class="font-light tracking-wide capitalize size-42">Plans that meet your needs</h2>
                <div class="spacer height-20"></div>
                <p class="size-17 tracking-widest" style="color: rgb(87, 87, 87);">Fair Prices. Excellent Services.</p>
            </div>
        </div>
        <div class="row">
            <div class="column xs-hidden">
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row relative sm-items-2">
            <div class="column flex flex-col justify-center items-center py-4">
                <div style="width: 100%; max-width: 450px;background-color: rgba(255, 255, 255,0.37);backdrop-filter: blur(20px);" class="p-10 box-border shadow-1">
                    <h3 class="size-24 text-black tracking-75">Standard</h3>
                    <div class="spacer height-20"></div>
                    <p class="size-24 text-black leading-none">$<span class="size-96 font-extralight">19</span>/mo</p>
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    <ul>
                        <li>Feature One</li>
                        <li>Feature Two</li>
                        <li>Feature Three</li>
                    </ul>
                    <div class="spacer height-40"></div>
                    <div class="button-group">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-7 font-normal leading-14 border-transparent rounded-full size-17 tracking-wide hover:border-transparent" title="" style="color: rgb(255, 255, 255); background-color: rgb(255, 127, 0);">Buy Now</a>
                    </div>
                </div>
            </div>
            <div class="column flex flex-col justify-center items-center py-4">
                <div style="width: 100%; max-width: 550px;background-color: rgba(255, 255, 255,0.37);backdrop-filter: blur(20px);" class="p-10 box-border shadow-1">
                    <h3 class="size-24 text-black tracking-75">Deluxe</h3>
                    <div class="spacer height-20"></div>
                    <p class="size-24 text-black leading-none">$<span class="size-96 font-extralight">29</span>/mo</p>
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    <ul>
                        <li>Feature One</li>
                        <li>Feature Two</li>
                        <li>Feature Three</li>
                    </ul>
                    <div class="spacer height-40"></div>
                    <div class="button-group">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-7 font-normal leading-14 border-transparent rounded-full size-17 tracking-wide hover:border-transparent" title="" style="color: rgb(255, 255, 255); background-color: rgb(83,98,208);">Buy Now</a>
                    </div>
                </div>
            </div>
            <div class="column flex flex-col justify-center items-center py-4">
                <div style="width: 100%; max-width: 450px;background-color: rgba(255, 255, 255,0.37);backdrop-filter: blur(20px);" class="p-10 box-border shadow-1">
                    <h3 class="size-24 text-black tracking-75">Ultimate</h3>
                    <div class="spacer height-20"></div>
                    <p class="size-24 text-black leading-none">$<span class="size-96 font-extralight">39</span>/mo</p>
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    <ul>
                        <li>Feature One</li>
                        <li>Feature Two</li>
                        <li>Feature Three</li>
                    </ul>
                    <div class="spacer height-40"></div>
                    <div class="button-group">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mr-2 mt-2 mb-1 py-2 px-7 font-normal leading-14 border-transparent rounded-full size-17 tracking-wide hover:border-transparent" title="" style="color: rgb(0, 0, 0); background-color: rgb(254, 222, 76);">Buy Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/pricing-04.png',
			'category': '9',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-nWavS.jpg&quot;); background-position: 86% 60%;" data-bottom-top="transform:translateY(-70px) scale(1);" data-top-bottom="transform:translateY(50px) scale(1.1)">
            <div class="is-overlay-color opacity-15" style="background-color: #000;"></div>
        </div>
    </div>
    <div class="is-container is-content-1040 content-pt-80 content-pb-80 v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-42 font-light text-white text-center pb-2">Featured Packages</h2>
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row relative" style="gap: 40px;">
            <div class="column p-0">
                <div class="p-12 box-border bg-white flex flex-col h-full">
                    <h3 class="size-24 font-normal pb-2">Standard</h3>
                    <p class="size-14 text-gray-500 pb-6">Best for starters</p>
                    <p class="size-60 font-light pb-4">$19<span class="size-16 text-gray-400 align-top ml-1">/mo</span></p>
                    <p class="text-gray-600 leading-17 pb-8 size-17">Get access to all basic features and start building your presence online today.</p>
                    <div class="mt-auto w-full">
                        <a href="#" role="button" class="transition-all block text-center cursor-pointer no-underline border-2 border-solid py-3 px-6 font-normal tracking-wide border-black text-black hover:bg-black hover:text-white">Get Started</a>
                    </div>
                </div>
            </div>
            <div class="column p-0">
                <div class="p-12 box-border bg-black flex flex-col h-full">
                    <h3 class="size-24 font-normal text-white pb-2">Pro</h3>
                    <p class="size-14 text-gray-300 pb-6">Best for professionals</p>
                    <p class="size-60 font-light text-white pb-4">$29<span class="size-16 text-gray-300 align-top ml-1">/mo</span></p>
                    <p class="text-gray-300 leading-17 pb-8 size-17">Unlock advanced capabilities and take your productivity to the next level.</p>
                    <div class="mt-auto w-full">
                        <a href="#" role="button" class="transition-all block text-center cursor-pointer no-underline border-2 border-solid py-3 px-6 font-normal tracking-wide border-white text-white hover:bg-white hover:text-black">Get Started</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/pricing-05.png',
			'category': '9',
			'html': `
<div class="is-section is-box is-section-100 type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pt-16 pb-16 leading-17 size-16">
        <div class="row">
            <div class="column">
                <p class="size-14 uppercase tracking-150 text-white pb-4">Pricing Guide</p>
                <h2 class="size-84 leading-12 font-light tracking-tight">Choose Your Plan.</h2>
                <div class="spacer height-20"></div>
                <p class="size-18 text-white max-w-xl">Transparent pricing for teams of all sizes. No hidden fees, cancel anytime.</p>
            </div>
        </div>
        <div class="row items-center py-10" style="border-top: 1px solid rgb(0, 0, 0);">
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <h3 class="size-48 font-light">01</h3>
            </div>
            <div class="column" style="width: 25%; flex: 0 0 auto;">
                <h4 class="size-24 font-normal">Lite</h4>
                <p class="size-14 text-gray-500 uppercase tracking-150 mt-1">Essential Features</p>
            </div>
            <div class="column">
                <p class="size-16 text-gray-600 leading-17">Perfect for individuals just getting started. Includes basic access to all design tools and community support.</p>
            </div>
            <div class="column flex justify-between items-center" style="width: 20%; flex: 0 0 auto;">
                <span class="size-32 font-light pr-4">$39</span>

                <div style="white-space: nowrap;">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-1 px-4 size-14 leading-13 border-current hover:border-current">Select</a>
                </div>

            </div>
        </div>

        <div class="row items-center py-10" style="border-top: 1px solid rgb(229, 229, 229);">
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <h3 class="size-48 font-light text-gray-400">02</h3>
            </div>
            <div class="column" style="width: 25%; flex: 0 0 auto;">
                <h4 class="size-24 font-normal">Advanced</h4>
                <p class="size-14 text-gray-500 uppercase tracking-150 mt-1">Most Popular</p>
            </div>
            <div class="column">
                <p class="size-16 text-gray-600 leading-17">Designed for professional workflows. Unlocks advanced analytics, priority support, and team collaboration features.</p>
            </div>
            <div class="column flex justify-between items-center" style="width: 20%; flex: 0 0 auto;"><span class="size-32 font-light pr-4">$59</span>

                <div style="white-space: nowrap;">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-1 px-4 size-14 leading-13 border-current hover:border-current">Select</a>
                </div>
            </div>
        </div>

        <div class="row items-center py-10" style="border-top: 1px solid rgb(229, 229, 229); border-bottom: 1px solid rgb(0, 0, 0);">
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <h3 class="size-48 font-light text-gray-400">03</h3>
            </div>
            <div class="column" style="width: 25%; flex: 0 0 auto;">
                <h4 class="size-24 font-normal">Ultimate</h4>
                <p class="size-14 text-gray-500 uppercase tracking-150 mt-1">Full Access</p>
            </div>
            <div class="column">
                <p class="size-16 text-gray-600 leading-17">The complete package for large organizations. Custom integrations, dedicated account manager, and unlimited storage.</p>
            </div>
            <div class="column flex justify-between items-center" style="width: 20%; flex: 0 0 auto;"><span class="size-32 font-light pr-4">$89</span>

                <div style="white-space: nowrap;">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-1 px-4 size-14 leading-13 border-current hover:border-current">Select</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/pricing-06.png',
			'category': '9',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-900 content-pt-80 content-pb-80 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <h2 class="size-60 font-light leading-12 pb-8">Flexible Pricing Plans</h2>
                    <div style="width: 100%; height: 1px; background: #eee;"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row" style="gap: 80px;">
                <div class="column">
                    <div class="pb-4 border-b border-black mb-6">
                        <h3 class="size-24 font-normal">Basic</h3>
                    </div>
                    <p class="text-gray-600 leading-17 pb-6">Essential features for small teams and startups looking to establish their digital presence.</p>
                    <ul class="size-15 leading-18 text-gray-700 pb-8 space-y-2">
                        <li class="pb-2 flex items-center"><span class="pr-2 text-gray-400">•</span> 5 Projects</li>
                        <li class="pb-2 flex items-center"><span class="pr-2 text-gray-400">•</span> Basic Analytics</li>
                        <li class="pb-2 flex items-center"><span class="pr-2 text-gray-400">•</span> Email Support</li>
                    </ul>
                    <div class="flex items-center justify-between">
                        <p class="size-32 font-light">$59<span class="size-14 text-gray-500">/mo</span></p>
                        <a href="#" class="size-14 uppercase tracking-widest font-semibold border-2 border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all no-underline text-black border-current whitespace-nowrap hover:border-transparent" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''" role="button">Choose</a>
                    </div>
                </div>
                <div class="column" style="width: 50%; flex: 0 0 auto;">
                    <div class="pb-4 border-b border-black mb-6">
                        <h3 class="size-24 font-normal">Premium</h3>
                    </div>
                    <p class="text-gray-600 leading-17 pb-6">Advanced capabilities for scaling organizations requiring robust performance.<br><br></p>
                    <ul class="size-15 leading-18 text-gray-700 pb-8 space-y-2">
                        <li class="pb-2 flex items-center"><span class="pr-2 text-gray-400">•</span> Unlimited Projects</li>
                        <li class="pb-2 flex items-center"><span class="pr-2 text-gray-400">•</span> Advanced Analytics</li>
                        <li class="pb-2 flex items-center"><span class="pr-2 text-gray-400">•</span> 24/7 Support</li>
                    </ul>
                    <div class="flex items-center justify-between">
                        <p class="size-32 font-light">$99<span class="size-14 text-gray-500">/mo</span></p>
                        <a href="#" class="size-14 uppercase tracking-widest font-semibold border-2 border-black px-6 py-2 rounded-full hover:border-black transition-all no-underline text-gray-500 hover:border-transparent whitespace-nowrap hover:text-white border-current" role="button" data-bg="" data-hover-bg="rgba(0, 0, 0, 1)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">Choose</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-HfUCZ.jpg&quot;); background-position: 50% 60%;" data-bottom-top="transform:translateY(-70px) scale(1);" data-top-bottom="transform:translateY(50px) scale(1.1)"></div>
        </div>
    </div>
</div>
		`
		},

		/* Shop */
		{
			'thumbnail': 'preview/shop-01.png',
			'category': '10',
			'html': `
<div class="is-section is-box is-section-100 box-autofit type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container v2 leading-17 size-16 v3 is-content-1400">
        <div class="row relative sm-items-1" style="gap:60px">
            <div class="column flex flex-col py-6 justify-center" style="width: 39.7271%; flex: 0 0 auto;">
                <div class="flex justify-between items-center" style="border-bottom: 1px solid #f0f0f0;">
                    <p class="size-12 uppercase tracking-150 text-gray-500">Collection 2024</p>
                    <p class="size-12 uppercase tracking-150 text-gray-500">Item 01</p>
                </div>
                <div class="spacer height-40"></div>
                <h1 class="size-60 font-light leading-12 text-black">Bedside Table<br><span class="text-gray-400">Edition No. 1</span></h1>
                <p class="size-16 leading-17 text-gray-600 pb-4" style="max-width: 400px;">
                    Crafted from sustainable oak with a focus on clean lines and functional simplicity. A timeless addition to the modern sanctuary.
                </p>

                <p class="size-42 font-light pb-2">$129.00</p>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-15 leading-14 border-black hover:bg-black hover:text-white border-current hover:border-transparent" style="color: rgb(0, 0, 0);" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                        Add to Cart
                    </a>
                </div>
            </div>

            <div class="column"><img src="[%IMAGE_PATH%]images/ai-6ay66.jpg" alt="" data-filename="img-077.jpg" style="border-radius: 12px;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/shop-02.png',
			'category': '10',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-0gZN7.jpg&quot;); background-position: 50% 60%;" data-bottom-top="transform:translateY(-70px) scale(1);" data-top-bottom="transform:translateY(50px) scale(1.1)"></div>
        </div>
    </div>
    <div class="is-box is-box-6">
        <div class="is-overlay" style="background-color: #fafafa;"></div>
        <div class="is-container is-content-600 v3 pt-11 pb-11 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Seating Series</p>
                    <h2 class="size-72 font-light leading-11 text-black pb-6">The Dining<br>Chair</h2>
                    <p class="size-16 leading-17 text-gray-600 pb-10">
                        Ergonomically designed for extended comfort. The fabric selection offers a tactile contrast to the solid wood frame, creating a piece that is both visual and functional.
                    </p>

                    <div class="pb-3 pt-3" style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
                        <div class="flex justify-between items-center">
                            <p class="size-13 uppercase tracking-150 text-gray-500">Base Material</p>
                            <p class="size-15 text-black">Solid Ash Wood</p>
                        </div>
                    </div>
                    <div class="pb-3 pt-3" style="border-bottom: 1px solid #e5e5e5;">
                        <div class="flex justify-between items-center">
                            <p class="size-13 uppercase tracking-150 text-gray-500">Upholstery</p>
                            <p class="size-15 text-black">Premium Wool Blend</p>
                        </div>
                    </div>
                    <div class="pb-3 pt-3" style="border-bottom: 1px solid #e5e5e5;">
                        <div class="flex justify-between items-center">
                            <p class="size-13 uppercase tracking-150 text-gray-500">Dimensions</p>
                            <p class="size-15 text-black">H 82cm × W 48cm</p>
                        </div>
                    </div>

                    <div class="spacer height-60"></div>

                    <div class="flex justify-between items-center">
                        <p class="size-48 font-light text-black">$149</p>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-8 size-15 leading-14 border-black bg-black text-white hover:opacity-80" style="color: #ffffff; background-color: #000000;">
                            Purchase
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/shop-03.png',
			'category': '10',
			'html': `
<div class="is-section is-box is-section-100 box-autofit type-oswald-opensans">
    <div class="is-overlay"></div>
    <div class="is-container v2 v3 size-17 leading-14 is-content-1680">
        <div class="row relative sm-items-1" style="gap:60px">
            <div class="column py-6" style="width: 45.7407%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-black pr-4 pt-2">03</p>
                <div>
                    <h2 class="font-normal leading-11 text-black pb-2 md-size-76 size-108">Urban<br class="size-108">Walker</h2>
                    <p class="size-18 text-gray-400 font-light pb-4">Footwear Collection</p>
                </div>

                <h3 class="size-24 tracking-wide leading-loose" style="max-width: 270px; margin-left: auto;">Details</h3>
                <p style="max-width: 270px; margin-left: auto;" class="size-17">Designed for the city rhythm. Featuring advanced cushioning technology wrapped in a minimalist silhouette. Available in monochrome palettes.</p>

                <div class="flex items-center gap-4" style="gap: 20px;">
                    <p class="size-32 font-medium text-black">$199</p>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer mb-1 size-15 text-black leading-14 border-transparent hover:border-black font-normal tracking-wide underline-offset-4">
                        View Details
                    </a>
                </div>
                <div class="spacer height-20"></div>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-current hover:border-current" title="">Buy Now</a>
                </div>
            </div>

            <div class="column"><img src="[%IMAGE_PATH%]images/ai-Avftu.jpg" alt="" data-filename="img-077.jpg" style="border-radius: 15px;">
                <div class="bg-white p-6" style="backdrop-filter: blur(10px); background-color: rgba(255,255,255,0.9);">
                    <p class="size-12 uppercase tracking-150 text-gray-500 pb-2">Available Colors</p>
                    <div class="flex gap-2" style="gap: 10px;">
                        <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #000;"></div>
                        <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #fff; border: 1px solid #aaa;"></div>
                        <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #888;"></div>
                        <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #eab308;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/shop-04.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay" style="background-color: #ffffff;"></div>
    <div class="is-container is-content-1200 content-py-100 v3 pb-14 pt-10 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-8" style="border-bottom: 1px solid #f0f0f0;">
                    <h2 class="size-42 font-light text-black">Selected Furniture</h2>
                    <p class="size-14 uppercase tracking-150 text-gray-500 pb-2">04 / Catalog</p>
                </div>
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio:4/3">
                    <img src="[%IMAGE_PATH%]images/ai-9vsPn.jpg" alt="Bedside Table" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-medium text-black pb-1">Bedside Table</h3>
                        <p class="size-14 text-gray-500">Bedroom Collection</p>
                    </div>
                    <div class="text-right">
                        <p class="size-20 font-light text-black">$129</p>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio:4/3">
                    <img src="[%IMAGE_PATH%]images/ai-6JvrS.jpg" alt="Wood Cabinet" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-20 font-medium text-black pb-1">Wood Cabinet</h3>
                        <p class="size-14 text-gray-500">Storage Solutions</p>
                    </div>
                    <div class="text-right">
                        <p class="size-20 font-light text-black">$159</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/shop-05.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay" style="background-color: #f9f9f9;"></div>
    <div class="is-container is-content-1400 content-py-100 v3 pb-16 pt-11 size-17 leading-17">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 text-center pb-4">Essentials</p>
                <h2 class="size-48 font-light text-black text-center pb-12">Latest Arrivals</h2>
            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="bg-white p-0 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                    <div class="w-full overflow-hidden relative bg-gray-100" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-zUWV6.jpg" alt="Coffee Table" class="w-full h-full object-cover">
                    </div>
                    <div class="p-8">
                        <div class="flex justify-between items-baseline pb-2">
                            <h3 class="size-18 font-medium text-black">Coffee Table</h3>
                            <p class="size-16 font-light text-black">$29</p>
                        </div>
                        <p class="size-14 leading-16 text-gray-500 pb-4">Compact living room essential.</p>
                        <a href="#" class="size-13 uppercase tracking-150 text-black hover:text-gray-600 hover:border-gray-600 transition-colors underline-offset-4">View Product</a>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="bg-white p-0 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                    <div class="w-full overflow-hidden relative bg-gray-100" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-JeFwT.jpg" alt="Bookcase" class="w-full h-full object-cover">
                    </div>
                    <div class="p-8">
                        <div class="flex justify-between items-baseline pb-2">
                            <h3 class="size-18 font-medium text-black">Bookcase</h3>
                            <p class="size-16 font-light text-black">$49</p>
                        </div>
                        <p class="size-14 leading-16 text-gray-500 pb-4">Vertical storage for modern spaces.</p>
                        <a href="#" class="size-13 uppercase tracking-150 text-black hover:text-gray-600 hover:border-gray-600 transition-colors underline-offset-4">View Product</a>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="bg-white p-0 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                    <div class="w-full overflow-hidden relative bg-gray-100" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-6JvrS.jpg" alt="Storage Cabinet" class="w-full h-full object-cover">
                    </div>
                    <div class="p-8">
                        <div class="flex justify-between items-baseline pb-2">
                            <h3 class="size-18 font-medium text-black">Storage Cabinet</h3>
                            <p class="size-16 font-light text-black">$89</p>
                        </div>
                        <p class="size-14 leading-16 text-gray-500 pb-4">Versatile organization unit.</p>
                        <a href="#" class="size-13 uppercase tracking-150 text-black hover:text-gray-600 hover:border-gray-600 transition-colors underline-offset-4">View Product</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/shop-06.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom hover-zoom">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-6JvrS.jpg'); background-position: 50% 82%;">
            <div class="is-overlay-color opacity-20" style="background-color: #000;"></div>
        </div>
    </div>
    <div class="is-container is-content-1400 content-pb-60 v3 leading-17 size-18">
        <div class="row">
            <div class="column" style="border-top: 1px solid rgba(255,255,255,0.3);">
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row">
            <div class="column" style="width: 60%; flex: 0 0 auto;">
                <p class="size-14 uppercase tracking-150 text-white pb-6">Collection 2024</p>
                <h1 class="size-96 leading-09 font-light text-white">The Artisan<br>Cabinet Series</h1>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="size-18 leading-16 text-white pb-8 opacity-90" style="max-width: 400px;">
                    Defined by clean lines and natural materials, our new storage collection brings calm organization to modern spaces.
                </p>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-wide py-3 px-8 size-15 leading-14 rounded-full border-white hover:bg-white hover:text-black" style="color: #ffffff;">
                        Explore Collection
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/shop-07.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1400 v3 leading-15 size-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end" style="border-bottom: 1px solid #e5e5e5; padding-bottom: 20px;">
                    <div>
                        <p class="uppercase tracking-150 size-12 text-gray-400 mb-2">Collection 2024</p>
                        <h2 class="size-60 font-light leading-12 text-black">Curated Objects</h2>
                    </div>
                    <div class="pb-2">
                        <a href="#" class="size-14 uppercase tracking-150 text-black no-underline border-b border-black pb-1 hover:opacity-50 transition-opacity">View All</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-0gZN7.jpg" alt="Ceramic Vase" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    <div class="absolute top-0 left-0 p-4">
                        <span class="bg-white px-2 py-1 size-12 uppercase tracking-150">New</span>
                    </div>
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-16 font-medium leading-14 pb-1">Ceramic Vase No. 4</h3>
                        <p class="size-14 text-gray-500">Hand-thrown clay</p>
                    </div>
                    <p class="size-16 font-normal">$124</p>
                </div>
                <div>
                    <a href="#" class="size-12 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                </div>
            </div>

            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-QfTuK.jpg" alt="Table Lamp" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-16 font-medium leading-14 pb-1">Nordic Table Lamp</h3>
                        <p class="size-14 text-gray-500">Brushed aluminum</p>
                    </div>
                    <p class="size-16 font-normal">$177</p>
                </div>
                <div>
                    <a href="#" class="size-12 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                </div>
            </div>

            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-6JvrS.jpg" alt="Minimal Chair" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-16 font-medium leading-14 pb-1">Studio Chair</h3>
                        <p class="size-14 text-gray-500">Solid oak</p>
                    </div>
                    <p class="size-16 font-normal">$89</p>
                </div>
                <div>
                    <a href="#" class="size-12 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                </div>
            </div>

            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-WYeej.jpg" alt="Side Table" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-16 font-medium leading-14 pb-1">Accent Side Table</h3>
                        <p class="size-14 text-gray-500">Matte finish</p>
                    </div>
                    <p class="size-16 font-normal">$39</p>
                </div>
                <div>
                    <a href="#" class="size-12 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/shop-08.png',
			'category': '10',
			'html': `
<div class="is-section is-box is-section-30 type-system-ui">
    <div class="is-overlay" style="background-color: #ffffff;"></div>
    <div class="is-container is-content-1200 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 text-center pb-4">Curated Collection</p>
                <h2 class="size-54 font-light leading-12 text-center pb-6">Our Products</h2>
                <p class="size-18 leading-17 text-gray-600 text-center">Thoughtfully designed pieces that bring elegance and functionality to your everyday life.</p>
            </div>
        </div>
    </div>
</div>
<div class="is-section box-space type-alegreya-lato md-boxes-2 md-boxes-wrap sm-boxes-2 sm-boxes-wrap is-section-70">
    <div class="is-box-4 is-box is-light-text is-content-top edge-y-2 box-autofit min-height-40">
        <div class="is-overlay" style="background-color: rgb(243, 243, 243);">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-g4YrF.jpg&quot;); background-position: 50% 60%;">
                <div class="is-overlay-color opacity-6"></div>
            </div>
        </div>
        <div class="is-container v2 is-content-600 leading-12 size-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-white opacity-70 pb-3">Accessories</p>
                    <h3 class="size-24">Tote Bag</h3>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h4 class="leading-09 size-132">$79</h4>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row sm-autofit">
                <div class="column sm-hidden">
                    <div class="spacer height-80"></div>
                </div>
                <div class="column" style="width: 57.722%; flex: 0 0 auto;">
                    <p class="size-14 leading-16 text-white opacity-80 pb-6">Premium canvas construction with reinforced leather handles. Perfect for daily errands or weekend markets.</p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-14 leading-14 border-white hover:bg-white hover:text-black" style="color: #ffffff;">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-4 is-box is-dark-text is-content-bottom box-autofit min-height-40">
        <div class="is-overlay" style="background-color: rgb(250, 250, 250);">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-RL8V0.jpg&quot;); opacity: 1; background-position: 50% 60%;"></div>
        </div>
        <div class="is-container v2 is-content-380 size-17 leading-12">
            <div class="row">
                <div class="column text-center">
                    <div class="button-group">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" title="" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="#fff" data-hover-bg="rgba(248, 248, 250, 1)">Browse All</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-4 is-box is-light-text box-autofit min-height-40 is-content-bottom edge-y-0-75">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-48KjC.jpg&quot;); background-position: 50% 60%;">
                <div class="is-overlay-color opacity-8"></div>
            </div>
        </div>
        <div class="is-container v2 size-17 leading-12 is-content-600 is-content-right edge-x-0-75">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-white opacity-70 pb-3">Furniture</p>
                    <h3 class="size-24 text-right">Bedside Table</h3>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="column">
                        <h4 class="leading-09 size-132 text-right">$139</h4>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
                <div class="column">
                    <p class="size-14 leading-16 text-white opacity-80 pb-6">Handcrafted from solid walnut with a natural oil finish. Features a single drawer with soft-close mechanism.</p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-14 leading-14 border-white hover:bg-white hover:text-black" style="color: #ffffff;">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/shop-09.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-40">
    <div class="is-overlay" style="background-color: #ffffff;"></div>
    <div class="is-container is-content-1400 content-py-80 size-17 leading-17 v3">
        <div class="row">
            <div class="column" style="width: 50%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Shop Collection</p>
                <h2 class="size-64 font-light leading-11">Curated<br>Essentials</h2>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="size-17 leading-17 text-gray-600" style="max-width: 380px;">Thoughtfully designed pieces that blend form and function. Each item crafted with intention, built to last.</p>
            </div>
        </div>
    </div>
</div>
<div class="is-section type-system-ui is-section-60">
    <div class="is-box is-box-6">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-g4YrF.jpg'); background-position: 50% 50%;">
                <div class="is-overlay-color opacity-5"></div>
            </div>
        </div>
        <div class="is-container is-content-480 is-content-left content-py-60 size-17 leading-17 v3" style="margin-left: 60px;">
            <div class="row">
                <div class="column">
                    <div class="product-card">
                        <p class="size-11 uppercase tracking-150 text-white pb-3" style="opacity: 0.7;">01 — Accessories</p>
                        <h3 class="size-28 font-normal text-white pb-2">Canvas Tote</h3>
                        <p class="size-48 font-light text-white leading-none pb-6">$79</p>
                        <p class="size-14 leading-17 text-white pb-6" style="opacity: 0.85;">Premium organic cotton canvas with reinforced leather handles. Designed for everyday carry, built to age beautifully over years of use.</p>
                        <div>
                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-14 leading-14 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" data-bg="rgb(255, 255, 255)" data-hover-bg="rgb(240, 240, 240)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">Add to Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-48KjC.jpg'); background-position: 50% 50%;">
                <div class="is-overlay-color opacity-10"></div>
            </div>
        </div>
        <div class="is-container is-content-480 is-content-right content-py-60 size-17 leading-17 v3" style="margin-right: 60px;">
            <div class="row">
                <div class="column">
                    <div class="product-card text-right">
                        <p class="size-11 uppercase tracking-150 text-white pb-3 text-right" style="opacity: 0.7;">02 — Furniture</p>
                        <h3 class="size-28 font-normal text-white pb-2 text-right">Bedside Table</h3>
                        <p class="size-48 font-light text-white leading-none pb-6 text-right">$39</p>
                        <p class="size-14 leading-17 text-white pb-6 text-right" style="opacity: 0.85;">Solid oak construction with hand-finished edges. Minimalist silhouette that complements any interior.</p>
                        <div class="text-right">
                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-14 leading-14 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(255, 255, 255);" data-bg="rgb(255, 255, 255)" data-hover-bg="rgb(240, 240, 240)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">Add to Cart</a>
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
			'thumbnail': 'preview/shop-10.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-100 v3 pb-14 pt-10 size-17 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-96 font-light leading-11 text-center pb-4">New Arrivals</h2>
                <p class="size-16 text-gray-500 text-center uppercase tracking-150">Spring / Summer 2024</p>
                <div class="spacer height-100"></div>
            </div>
        </div>

        <div class="row" style="gap: 60px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-8" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-U4qcP.jpg" alt="New Arrival 1" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="pr-8">
                    <div class="flex justify-between items-baseline border-b border-gray-200 pb-4 mb-4">
                        <h3 class="size-24 font-normal">The Studio Lamp</h3>
                        <p class="size-16 font-medium">$289</p>
                    </div>
                    <p class="text-gray-600 leading-17">
                        Adjustable lighting designed for the creative workspace. Features a weighted base and precision hinge mechanism.
                    </p>
                    <div class="pt-6">
                        <a href="#" class="size-14 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="spacer height-120"></div>
                <div class="w-full overflow-hidden relative bg-gray-50 mb-8" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-wcsP0.jpg" alt="New Arrival 2" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="pr-8">
                    <div class="flex justify-between items-baseline border-b border-gray-200 pb-4 mb-4">
                        <h3 class="size-24 font-normal">Linen Throw</h3>
                        <p class="size-16 font-medium">$159</p>
                    </div>
                    <p class="text-gray-600 leading-17">
                        Woven from 100% organic European flax. Stonewashed for incredible softness and a relaxed, lived-in texture.
                    </p>
                    <div class="pt-6">
                        <a href="#" class="size-14 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
			`
		},
		{
			'thumbnail': 'preview/shop-11.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 content-py-100 v3 size-17 leading-15">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-8" style="border-bottom: 1px solid #e5e5e5;">
                    <h2 class="size-48 font-light leading-12">Curated Essentials</h2>
                    <a href="#" class="size-14 uppercase tracking-150 text-black underline underline-offset-4">View All Products</a>
                </div>
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1;">
                    <img src="[%IMAGE_PATH%]images/ai-xPiUl.jpg" alt="Lounge Chair" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                    <div class="absolute top-0 left-0 p-4">
                        <span class="bg-white text-black size-12 uppercase tracking-150 py-1 px-3">New</span>
                    </div>
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-18 font-normal leading-14 pb-1">Kyoto Lounge Chair</h3>
                        <p class="size-14 text-gray-500">Solid Ash, Fabric</p>
                    </div>
                    <p class="size-16 font-medium pt-1">$429</p>
                </div>
                <div>
                    <a href="#" class="size-12 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                </div>
            </div>

            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1;">
                    <img src="[%IMAGE_PATH%]images/ai-RL8V0.jpg" alt="Table Lamp" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-18 font-normal leading-14 pb-1">Ceramic Table Lamp</h3>
                        <p class="size-14 text-gray-500">Hand-thrown Clay</p>
                    </div>
                    <p class="size-16 font-medium pt-1">$189</p>
                </div>
                <div>
                    <a href="#" class="size-12 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                </div>
            </div>

            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1;">
                    <img src="[%IMAGE_PATH%]images/ai-O4SHb.jpg" alt="Minimalist Vase" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-18 font-normal leading-14 pb-1">Sculptural Vase 04</h3>
                        <p class="size-14 text-gray-500">Matte Porcelain</p>
                    </div>
                    <p class="size-16 font-medium pt-1">$89</p>
                </div>
                <div>
                    <a href="#" class="size-12 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                </div>
            </div>

            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1;">
                    <img src="[%IMAGE_PATH%]images/ai-7dhro.jpg" alt="Wooden Bowls" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                    <div class="absolute top-0 left-0 p-4">
                        <span class="bg-black text-white size-12 uppercase tracking-150 py-1 px-3">Best Seller</span>
                    </div>
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="size-18 font-normal leading-14 pb-1">Teak Serving Set</h3>
                        <p class="size-14 text-gray-500">Reclaimed Wood</p>
                    </div>
                    <p class="size-16 font-medium pt-1">$129</p>
                </div>
                <div>
                    <a href="#" class="size-12 uppercase tracking-150 underline underline-offset-4 border-transparent">Shop Now</a>
                </div>
            </div>
        </div>
    </div>
</div>
			`
		},
		{
			'thumbnail': 'preview/shop-12.png',
			'category': '10',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay" style="background-color: #f9f9f9;"></div>
        <div class="is-container is-content-540 v3 pb-10 pt-14 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <div style="border-top: 1px solid #000; width: 40px; margin-bottom: 24px;"></div>
                    <p class="uppercase tracking-150 size-12 text-gray-500 mb-4">Featured Product</p>
                    <h2 class="size-54 font-light leading-12 mb-6">The Architect's Desk</h2>
                    <p class="size-17 leading-17 text-gray-600 mb-8">
                        Designed for clarity and focus. Crafted from sustainable walnut with a spacious surface area for creative work. Minimalist lines meet maximum functionality.
                    </p>

                    <div class="flex items-center gap-8 mb-8">
                        <div>
                            <p class="size-12 uppercase tracking-150 text-gray-400 mb-1">Material</p>
                            <p class="size-15 text-black">Solid Walnut</p>
                        </div>
                        <div>
                            <p class="size-12 uppercase tracking-150 text-gray-400 mb-1">Dimensions</p>
                            <p class="size-15 text-black">140 x 70 cm</p>
                        </div>
                        <div>
                            <p class="size-12 uppercase tracking-150 text-gray-400 mb-1">Origin</p>
                            <p class="size-15 text-black">Copenhagen</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-6" style="border-top: 1px solid #e5e5e5;">
                        <p class="size-32 font-normal">$189</p>
                        <div>
                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(250, 250, 250); background-color: rgb(24, 24, 27);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)">
                                Add to Cart
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="is-box is-box-7">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-sGD6j.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
			`
		},
		{
			'thumbnail': 'preview/shop-13.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1660 pb-14 v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="flex items-center justify-center">
                    <h2 class="size-42 font-light text-center mb-2">New Arrivals</h2>
                </div>
                <p class="text-center size-14 uppercase tracking-150 text-gray-500">Spring / Summer Collection</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row" style="gap: 20px;">
            <div class="column pb-6">

                <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio: 1/1;">
                    <a href="/product" title="Product"><img src="[%IMAGE_PATH%]images/ai-0gZN7-editJbUgxh4.jpg" alt="Product" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105"></a>
                </div>
                <div class="text-center">
                    <h3 class="size-16 font-medium pb-1">Eames Molded Chair</h3>
                    <p class="size-14 text-gray-500 pb-2">Fiberglass</p>
                    <p class="size-15 text-black">$129</p>
                </div>
            </div>

            <div class="column pb-6">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio: 1/1;">
                    <a href="/product" title="Product"><img src="[%IMAGE_PATH%]images/ai-QfTuK-editoD2SLu4.jpg" alt="Product" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105"></a>
                </div>
                <div class="text-center">
                    <h3 class="size-16 font-medium pb-1">Study Lamp</h3>
                    <p class="size-14 text-gray-500 pb-2">Matte Black</p>
                    <p class="size-15 text-black">$118</p>
                </div>
            </div>

            <div class="column pb-6">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio: 1/1;">
                    <a href="/product" title="Product"><img src="[%IMAGE_PATH%]images/ai-54zu9-editqKekPj5.jpg" alt="Product" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105"></a>
                </div>
                <div class="text-center">
                    <h3 class="size-16 font-medium pb-1">Lounge Chair</h3>
                    <p class="size-14 text-gray-500 pb-2">Leather &amp; Wood</p>
                    <p class="size-15 text-black">$95</p>
                </div>
            </div>

            <div class="column pb-6">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio: 1/1;">
                    <a href="/product" title="Product"><img src="[%IMAGE_PATH%]images/ai-WYeej-editQGcKVkb.jpg" alt="Product" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105"></a>
                </div>
                <div class="text-center">
                    <h3 class="size-16 font-medium pb-1">Nesting Tables</h3>
                    <p class="size-14 text-gray-500 pb-2">Set of 2</p>
                    <p class="size-15 text-black">$76</p>
                </div>
            </div>
        </div>

    </div>
</div>
			`
		},
		{
			'thumbnail': 'preview/shop-14.png',
			'category': '10',
			'html': `
<div class="is-section is-box is-section-100 box-autofit type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container v2 leading-17 size-16 v3 is-content-1400">
        <div class="row relative sm-items-1" style="gap:60px">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 1 / 1; border-radius: 12px;"><img src="[%IMAGE_PATH%]images/ai-0Xx4D.jpg" alt="" data-filename="img-077.jpg" class="w-full h-full object-cover"></div>
            </div>
            <div class="column flex flex-col py-6 justify-center" style="width: 37.5373%; flex: 0 0 auto;">
                <div class="inline-block px-3 py-1 mb-6" style="background-color: #fef2f2; border-radius: 4px;">
                    <p class="size-12 uppercase tracking-150 font-medium" style="color: #dc2626;">Limited Time — 35% Off</p>
                </div>
                <h2 class="size-48 font-normal leading-11 pt-2">Two Seater Sofa</h2>
                <div class="flex items-center" style="gap: 16px;">
                    <p class="size-32 font-medium">$789</p>
                    <p class="size-18 text-gray-400" style="text-decoration: line-through;">$1,214</p>
                </div>
                <p class="size-16 leading-17 text-gray-600 pb-4">Expertly crafted with a solid hardwood frame and premium bouclé upholstery. The perfect balance of comfort and contemporary design for modern living spaces.</p>
                <div class="pb-6" style="border-top: 1px solid #f0f0f0; padding-top: 20px;">
                    <div class="flex justify-between items-center pb-3">
                        <p class="size-13 text-gray-500 uppercase tracking-150">Dimensions</p>
                        <p class="size-14 text-gray-700">160 × 85 × 78 cm</p>
                    </div>
                    <div class="flex justify-between items-center pb-3">
                        <p class="size-13 text-gray-500 uppercase tracking-150">Material</p>
                        <p class="size-14 text-gray-700">Bouclé, Oak</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="size-13 text-gray-500 uppercase tracking-150">Delivery</p>
                        <p class="size-14 text-gray-700">2-3 Weeks</p>
                    </div>
                </div>
                <div class="spacer height-20"></div>
                <div class="space-x-2">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-8 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(255, 255, 255); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">Add to Cart</a>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer border-2 border-solid mt-2 mb-1 font-normal tracking-normal py-3 px-6 size-15 leading-14 underline border-transparent" style="color: rgb(24, 24, 27);">View Details</a>
                </div>
            </div>
        </div>
    </div>
</div>
			`
		},
		{
			'thumbnail': 'preview/shop-15.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1200 pt-10 v3 leading-17 size-17">
        <div class="row">
            <div class="column">
                <p class="uppercase tracking-150 size-12 text-gray-400 mb-4 text-center">Journal</p>
                <h2 class="text-center size-48 font-light mb-12">Design Stories</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 4/3;">
                    <img src="[%IMAGE_PATH%]images/ai-45420-editoV0UxhJ.jpg" alt="Story" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pr-8">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-2">Interior</p>
                    <h3 class="size-24 font-normal leading-13 mb-3">The Art of Reduction</h3>
                    <p class="leading-17 text-gray-600 mb-4">
                        How minimalism creates space for what truly matters in a modern home environment.
                    </p>
                    <a href="#" class="size-14 font-medium text-black underline decoration-1 underline-offset-4 hover:text-gray-600 transition-colors">Read Article</a>
                </div>
            </div>

            <div class="column pb-8">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 4/3;">
                    <img src="[%IMAGE_PATH%]images/ai-MY8Qs-editiFL8KER.jpg" alt="Story" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pr-8">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-2">Materials</p>
                    <h3 class="size-24 font-normal leading-13 mb-3">Aging Gracefully</h3>
                    <p class="leading-17 text-gray-600 mb-4">
                        Why we choose natural materials that develop a unique patina over time.
                    </p>
                    <a href="#" class="size-14 font-medium text-black underline decoration-1 underline-offset-4 hover:text-gray-600 transition-colors">Read Article</a>
                </div>
            </div>
        </div>
    </div>
</div>
			`
		},


		{
			'thumbnail': 'preview/shop-16.png',
			'category': '10',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container size-17 leading-17 v3 is-content-1500">
        <div class="row items-center" style="gap: 80px;">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative" style="aspect-ratio:4/5; box-shadow: 0 20px 40px rgba(0,0,0,0.05);">
                    <img src="[%IMAGE_PATH%]images/ai-6KJRn.jpg" alt="Vases" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">

                    <!-- Floating Label -->
                    <div style="position: absolute; bottom: 30px; left: 30px; background: white; padding: 10px 20px;">
                        <p class="size-12 uppercase tracking-widest text-black">Series 04</p>
                    </div>
                </div>
            </div>

            <div class="column">
                <p class="size-12 uppercase tracking-widest text-gray-400 pb-4">The Collection</p>
                <h1 class="size-60 leading-12 font-light pb-6 text-black">Form Meets<br>Function.</h1>
                <p class="size-17 leading-17 text-gray-600 pb-10">
                    Our 'Calm' series explores the relationship between negative space and solid form. Handcrafted ceramics designed to bring a sense of grounding to your modern sanctuary.
                </p>

                <div class="pb-4 pt-4" style="border-top: 1px solid #e5e5e5;">
                    <div class="flex justify-between items-center">
                        <p class="size-13 uppercase tracking-widest text-gray-500">Material</p>
                        <p class="size-15 text-black">Stoneware Clay</p>
                    </div>
                </div>
                <div class="pb-4 pt-4" style="border-top: 1px solid #e5e5e5;">
                    <div class="flex justify-between items-center">
                        <p class="size-13 uppercase tracking-widest text-gray-500">Origin</p>
                        <p class="size-15 text-black">Kyoto, Japan</p>
                    </div>
                </div>
                <div class="pb-10 pt-4" style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
                    <div class="flex justify-between items-center">
                        <p class="size-13 uppercase tracking-widest text-gray-500">Dimensions</p>
                        <p class="size-15 text-black">H 42cm x W 18cm</p>
                    </div>
                </div>

                <div class="pt-8">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-10 size-15 leading-14 rounded-full border-black bg-black text-white hover:opacity-80">
                        Add to Cart — $120
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},

		/* Article */

		{
			'thumbnail': 'preview/article-22.png',
			'category': '2',
			'html': `
<div class="is-section is-box type-system-ui is-section-auto">
    <div class="is-overlay"></div>
    <div class="is-container is-content-760 content-py-60 v3">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-6">
                    <span>Essays</span>
                    <span class="px-3">|</span>
                    <span>December 2025</span>
                    <span class="px-3">|</span>
                    <span>8 Min Read</span>
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <h1 class="size-48 font-bold leading-12 pb-8">The Architecture of Silence in Digital Spaces</h1>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-18 leading-17 text-gray-700 pb-10">In an era of constant connectivity, the deliberate absence of information becomes its own form of communication—a designed quietness that shapes how we experience the digital world.</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 16/10;margin-bottom: 40px; box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 20px;">
                    <img src="[%IMAGE_PATH%]images/ai-Y42RR.jpg" alt="Visual Storytelling" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-8 drop-cap-paragraph">
                    <span class="drop-cap">T</span>he most profound interfaces are often those that say the least. They understand that clarity emerges not from abundance, but from careful subtraction. Every element that remains has earned its place through rigorous interrogation of its necessity.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-8">This philosophy extends beyond mere aesthetics into the realm of cognitive architecture. When we remove the superfluous, we create space for thought, for consideration, for the user's own mental processes to unfold naturally within the designed environment.</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div style="width: 60px; height: 2px; background-color: #d0d0d0; margin: 20px 0 40px 0;"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-10">Consider the white space in a well-composed layout—it is not empty, but rather full of potential. It breathes. It allows the eye to rest and the mind to process. In editorial design, these pauses are as carefully orchestrated as the typography itself.</p>
            </div>
        </div>

    </div>
</div>
<style>
    .drop-cap {
        float: left;
        font-size: 68px;
        line-height: 0.8;
        padding-right: 14px;
        padding-top: 8px;
        font-weight: 400;
        color: #18181b;
    }
    .drop-cap-paragraph {
        overflow: hidden;
    }
</style>
`
		},
		{
			'thumbnail': 'preview/article-21.png',
			'category': '2',
			'html': `
<div class="is-section is-box type-system-ui is-section-auto">
    <div class="is-overlay"></div>
    <div class="is-container is-content-760 v3 pt-20 pb-20">

        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-6">Essay</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <h1 class="size-48 font-bold leading-12 pb-6">On the Nature of Timeless Design</h1>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-14 text-gray-600 pb-8">
                    <span>Elena Marquez</span>
                    <span class="text-gray-300 px-3">|</span>
                    <span>December 18, 2025</span>
                    <span class="text-gray-300 px-3">|</span>
                    <span>12 min read</span>
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div style="border-bottom: 1px solid #e5e5e5; margin-bottom: 40px;"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-18 leading-17 text-gray-700 pb-10" style="font-size: 19px;">
                    What separates the ephemeral from the enduring? In an age of rapid aesthetic cycles, certain principles remain constant—guiding lights in the pursuit of work that transcends its moment.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-8 drop-cap-paragraph">
                    <span class="drop-cap">T</span>he question of timelessness in design is not one of avoiding trends, but of understanding which principles operate beneath the surface of style. These are the structures that persist when fashions fade, the foundations upon which lasting work is built.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-10">
                    Consider the great magazines of the mid-twentieth century—their layouts still feel contemporary not because they predicted the future, but because they grasped something essential about hierarchy, rhythm, and the relationship between text and image. They understood that good design is not decoration applied to content, but the thoughtful organization of information itself.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; padding: 40px 0; margin: 20px 0 40px 0;">
                    <p class="size-24 leading-14 font-medium text-center" style="font-size: 22px;">
                        "Simplicity is not the absence of complexity, but its successful resolution."
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-10">
                    This pursuit of clarity demands restraint. Every element must justify its presence through function or meaning. The designer becomes an editor, removing anything that does not serve the work's essential purpose. What remains is not minimal for its own sake, but refined to its necessary form.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-200" style="aspect-ratio: 1 / 1;">
                    <img src="[%IMAGE_PATH%]images/ai-2EkuF.jpg" alt="Minimalist Space" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-13 text-gray-500 text-center pb-10" style="font-style: italic;">A study in visual hierarchy and proportion</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-8">
                    The tools and technologies will continue to evolve, but these principles endure. They are not rules to be followed blindly, but wisdom to be understood and applied with judgment. Each project presents its own constraints and opportunities, its own questions about what timelessness might mean in that specific context.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-8">
                    Perhaps the most important lesson is this: timeless work is not created by those who seek timelessness directly. It emerges from a deep engagement with the present moment, combined with an understanding of the principles that have always made design effective. The goal is not to escape time, but to work with such clarity and purpose that the work remains relevant long after its creation.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-17 leading-17 text-gray-600 pb-8">
                    In the end, we design not for eternity, but for the people who will encounter our work—today, tomorrow, and in the years to come. The question of timelessness is really a question of humanity: what are the constants of human perception, cognition, and emotion that our work can honor? When we answer that question well, timelessness takes care of itself.
                </p>
            </div>
        </div>

    </div>
</div>

<style>
.drop-cap {
    float: left;
    font-size: 72px;
    line-height: 0.8;
    padding-right: 12px;
    padding-top: 8px;
    font-weight: 400;
    color: #18181b;
}
.drop-cap-paragraph {
    overflow: hidden;
}
</style>
		`
		},

		{
		    'thumbnail': 'preview/simple-09.png',
		    'category': '2',
		    'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 leading-17 v3 size-18">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-center pb-4" style="border-bottom: 1px solid #e5e5e5;">
                    <p class="size-12 uppercase tracking-150 text-gray-500">Architecture &amp; Design</p>
                    <p class="size-12 uppercase tracking-150 text-gray-500">Issue 24.1</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
                <h1 class="size-96 leading-11 font-light tracking-tight text-center">The Silent Narrative</h1>
                <div class="spacer height-40"></div>
                <p class="size-20 text-gray-400 text-center font-light uppercase tracking-widest">Exploring the void in modern living spaces</p>
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column">
                <p class="size-18 leading-17 text-gray-600 text-justify">
                    True luxury in the modern era is defined not by what is added, but by what is taken away. In a world of constant noise and visual clutter, the architect's primary role has shifted from creator of structures to curator of silence. We are seeing a return to elemental forms where materials are allowed to speak for themselves—concrete, wood, light, and shadow forming the vocabulary of a new domestic language.
                </p>
            </div>
            <div class="column">
                <p class="size-18 leading-17 text-gray-600 text-justify">
                    This approach requires a disciplined restraint. It asks us to look at a space and resist the urge to fill it. The empty corner is not a void to be occupied, but a pause to be experienced. It is in these pauses that the inhabitants find room to breathe, to think, and to simply be. The architecture becomes a background for life, rather than the protagonist of the story.
                </p>
                <div class="spacer height-20"></div>
                <p class="size-14 font-bold uppercase tracking-150 text-black">— Selma Laursen, Editor in Chief</p>
            </div>
        </div>
    </div>
</div>
`
		},

		{
			'thumbnail': 'preview/article-01.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-rUR0g.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
    <div class="is-box is-box-7 is-content-bottom edge-y-2">
        <div class="is-overlay"></div>
        <div class="is-container is-content-640 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-12 font-bold uppercase tracking-widest text-gray-400 mb-6">01 — Sanctuary</p>
                    <h2 class="size-60 leading-12 font-light text-black mb-8">Domestic Landscapes</h2>

                    <div class="w-full bg-gray-300 mb-8" style="height: 1px;"></div>

                    <p class="size-16 leading-17 text-gray-600 mb-6">
                        The concept of "home" has evolved beyond shelter. It is now a psychological anchor. In our latest project, we explored how natural light influences circadian rhythms within reinforced concrete structures.
                    </p>
                    <p class="size-16 leading-17 text-gray-600 mb-10">
                        By stripping away decorative elements, we reveal the raw beauty of the structural form. The result is a space that feels both grounded and ethereal—a sanctuary that protects while remaining open to the environment.
                    </p>

                    <div class="flex items-center">
                        <a href="#" class="size-14 font-semibold uppercase tracking-150 text-black no-underline border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">Read Case Study</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-02.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-1000 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <div class="flex justify-between items-end pb-2 border-b border-gray-200">
                        <h2 class="size-80 leading-11 font-light text-black">Pure<br>Illumination</h2>
                        <p class="size-14 font-mono text-gray-400 pb-2 hidden sm-block">REF: 24-B / LIGHT STUDY</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row" style="gap: 40px;">
                <div class="column">
                    <p class="size-12 font-bold uppercase tracking-150 text-gray-400 mb-4">The Philosophy</p>
                    <p class="leading-17 text-gray-600 size-16">
                        Light is not merely a utility; it is a material. We sculpt with it just as we sculpt with stone or timber. In this residence, apertures are positioned to capture the sun's trajectory, painting the white walls with shifting shadows throughout the day.
                    </p>
                </div>
                <div class="column">
                    <p class="size-12 font-bold uppercase tracking-150 text-gray-400 mb-4">The Execution</p>
                    <p class="leading-17 text-gray-600 size-16">
                        Using a palette of matte white and pale oak, we created a canvas for this light play. The absence of color allows the changing quality of daylight to become the primary decorative element, connecting the interior to the passing of time.
                    </p>
                </div>
                <div class="column">
                    <p class="size-12 font-bold uppercase tracking-150 text-gray-400 mb-4">The Result</p>
                    <p class="leading-17 text-gray-600 size-16">
                        A space that feels alive. It breathes with the day, bright and energizing in the morning, soft and contemplative in the evening. It is a reminder that the most powerful tools in architecture are often free.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row">
                <div class="column" style="width: 17.8723%; flex: 0 0 auto;">
                    <div class="w-4/5 size-40 rounded-full bg-gray-100 mr-4 overflow-hidden" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                        <img src="[%IMAGE_PATH%]images/ai-aW3kS-editAS28boy.jpg" alt="Author" class="w-full h-full object-cover">
                    </div>
                </div>
                <div class="column flex flex-col justify-center">
                    <p><span class="size-14 font-semibold">Samantha Holmes</span><br>
                        <span class="size-12 text-gray-400 uppercase tracking-wide">Senior Architect</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-iB5kH.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/article-04.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-3P8gX.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
    <div class="is-box is-box-7 is-content-middle bg-gray-50">
        <div class="is-overlay"></div>
        <div class="is-container is-content-800 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-12 font-bold uppercase tracking-widest text-gray-400 mb-2">03 — Manifesto</p>
                    <h2 class="size-72 leading-11 font-light text-black mb-10">Aesthetic Reduction</h2>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-20"></div>
                </div>
            </div>
            <div class="row" style="gap: 50px;">
                <div class="column" style="width: 40%; flex: 0 0 auto;">
                    <p class="size-24 leading-14 font-light text-gray-800 italic">
                        "We fall in love with minimalist style because it offers clarity in a chaotic world."
                    </p>
                </div>
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600 mb-6">
                        Minimalism is often misunderstood as coldness. We see it differently. It is the warmth of clarity. By removing the superfluous, we allow the essential to shine. In our design practice, this means questioning every line, every texture, every junction.
                    </p>
                    <p class="size-16 leading-17 text-gray-600">
                        Does this serve a purpose? Does it bring joy? If the answer is no, it disappears. What remains is not emptiness, but a carefully curated fullness of purpose.
                    </p>
                    <div class="spacer height-40"></div>
                    <div class="flex justify-between items-center pt-4 border-t border-gray-300">
                        <p class="size-13 text-gray-500">Words by Nicklas Henriksen</p>
                        <p class="size-13 text-gray-500">Read Full Article →</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-03.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 is-content-bottom edge-y-2">
        <div class="is-overlay"></div>
        <div class="is-container is-content-680 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <div class="pb-4 mb-4" style="border-bottom: 1px solid #000;">
                        <div class="flex justify-between">
                            <p class="size-12 uppercase tracking-widest text-black">Issue 24</p>
                            <p class="size-12 uppercase tracking-widest text-black">Nature &amp; Form</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h1 class="size-80 leading-11 font-light tracking-tight text-black">The Silent<br>Wilderness.</h1>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row" style="gap:40px;">
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600 text-justify">
                        Nature doesn't hurry, yet everything is accomplished. In the vast expanse of the northern territories, we find a silence so profound it reshapes our understanding of time.
                    </p>
                </div>
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600 text-justify">
                        This photographic series explores the intersection of light and landscape, capturing moments where the earth breathes and the horizon dissolves into the sky.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400">Photography by Caroline Gabrielle</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6">
        <div class="is-overlay"></div>
        <div class="is-container is-content-680 size-17 leading-17 v3">
            <div class="row">
                <div class="column">
                    <div class="w-full overflow-hidden relative bg-gray-200 mb-6" style="aspect-ratio: 4/3;">
                        <img src="[%IMAGE_PATH%]images/ai-Lq8Tq.jpg" alt="Landscape" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column" style="width: 40%; flex: 0 0 auto;">
                </div>
                <div class="column">
                    <div class="w-full overflow-hidden relative bg-gray-200" style="aspect-ratio: 3/4;">
                        <img src="[%IMAGE_PATH%]images/ai-hERQ4.jpg" alt="Portrait" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                    </div>
                    <p class="size-12 text-gray-400 mt-3 text-right">Fig 1.2 — Solitude</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-05.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7 is-content-middle">
        <div class="is-overlay"></div>
        <div class="is-container is-content-900 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-14 font-bold text-gray-900 mb-2">02</p>
                    <h1 class="size-96 leading-11 font-normal tracking-tighter mb-8" style="margin-left: -4px;">Domestic<br>Narratives</h1>
                </div>
            </div>
            <div class="row" style="gap: 60px;">
                <div class="column">
                    <div style="width: 100%; height: 1px; background-color: #e5e5e5; margin-bottom: 30px;"></div>
                </div>
            </div>
            <div class="row" style="gap: 60px;">
                <div class="column">
                    <h3 class="size-24 leading-13 font-normal mb-4">The Architecture of Belonging</h3>
                    <p class="size-16 leading-17 text-gray-600">
                        A home is more than a shelter; it is a physical manifestation of our personal history. Every corner, every shadow, and every surface tells a story of who we are and who we aspire to be. In this detailed study of modern residential spaces, we examine how light shapes our daily rituals.
                    </p>
                </div>
                <div class="column">
                    <h3 class="size-24 leading-13 font-normal mb-4">Spatial Memory</h3>
                    <p class="size-16 leading-17 text-gray-600">
                        We explore the concept of spatial memory—how environments hold the echoes of past events. By stripping away the unnecessary, we reveal the essential structure of domestic life, creating spaces that are not just for living, but for being.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                </div>
            </div>
            <div class="row">
                <div class="column" style="width: 22.619%; flex: 0 0 auto;">
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(250, 250, 250); background-color: rgb(24, 24, 27);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)">Read Article</a>
                    </div>
                </div>
                <div class="column">
                    <p class="size-14 font-semibold">Jonathan Courtright</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-rCUfP.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-07.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 is-content-bottom edge-y-3 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-2EkuF.jpg'); background-position: 50% 50%;">
                <div class="is-overlay-color opacity-10" style="background-color: #000;"></div>
            </div>
        </div>
        <div class="is-container is-content-540 is-content-left edge-x-1 size-17 leading-17 v3">
            <div class="row">
                <div class="column">
                    <div style="border-left: 2px solid white; padding-left: 20px;">
                        <h2 class="size-60 leading-11 text-white font-light">Words from<br>the heart.</h2>
                        <p class="size-16 text-gray-200 mt-4 tracking-wide">REFLECTIONS ON DESIGN</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 is-content-middle">
        <div class="is-overlay"></div>
        <div class="is-container is-content-680 leading-17 v3 size-18">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-6">Philosophy</p>
                    <h2 class="leading-11 text-black mb-10 size-54 font-light">Plant your<br>dreams deep.</h2>
                </div>
            </div>
            <div class="row" style="gap: 40px;">
                <div class="column">
                    <p class="size-18 leading-17 text-gray-600 font-light">
                        True innovation requires the patience to let ideas take root. Like a garden, a creative project needs fertile soil, constant care, and the right conditions to flourish. We believe in organic growth over forced acceleration.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                    <a href="#" class="size-14 border-b-2 border-black pb-1 no-underline text-black font-normal">Explore Philosophy</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-08.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7">
        <div class="is-overlay" style="background-color: #ffffff;"></div>
        <div class="is-container is-content-760 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <div class="w-full overflow-hidden relative bg-gray-100 mb-10" style="aspect-ratio: 16/9;">
                        <img src="[%IMAGE_PATH%]images/ai-Ut2xJ.jpg" alt="Journal" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h2 class="size-60 leading-12 font-light mb-6">Beyond<br>Language</h2>
                </div>
            </div>
            <div class="row" style="gap: 30px;">
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600">
                        Communication transcends the spoken word. It lives in gestures, in silence, and in the spaces between us. This month, we explore the unspoken dialogues that shape our relationships.
                    </p>
                </div>
                <div class="column">
                    <p class="size-14 uppercase tracking-widest text-gray-400 mt-2">
                        Journal Entry<br>By William Rollins
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-content-bottom edge-y-2 is-box-5">
        <div class="is-overlay"></div>
        <div class="is-container is-content-540 is-content-right edge-x-1 size-17 leading-17 v3">
            <div class="row">
                <div class="column">
                    <div class="text-right">
                        <h1 class="size-200 leading-08 font-bold opacity-20" "="">08</h1>
    <p class=" size-24 uppercase tracking-widest">August</p>
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
                    <div class="p-10 border-l border-gray-700">
                        <p class="size-16 leading-17 text-gray-400">
                            "The limits of my language mean the limits of my world." <br><span class="text-gray-600 mt-2 block">— Ludwig Wittgenstein</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/article-06.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7 is-content-middle">
        <div class="is-overlay" style="background-color: #fff;"></div>
        <div class="is-container is-content-1000 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-14 uppercase tracking-widest text-gray-500 mb-4">Workspace</p>
                    <h1 class="size-100 leading-none font-light tracking-tight mb-2">A Place Where</h1>
                    <h1 class="size-100 leading-none font-semibold tracking-tight ml-12">Ideas Grow.</h1>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row" style="gap: 50px;">
                <div class="column" style="width: 30%; flex: 0 0 auto;">
                    <p class="size-14 font-bold uppercase border-t border-black pt-4">The Studio</p>
                </div>
                <div class="column">
                    <p class="size-18 leading-17 text-gray-800 border-t border-gray-200 pt-4">
                        Creativity requires a container. Our studio is designed as a blank canvas, a neutral ground where concepts can be tested, refined, and brought to life. It is a machine for thinking, stripped of distraction.
                    </p>
                    <div class="spacer height-40"></div>
                    <p class="size-16 leading-17 text-gray-500">
                        Located in the heart of the design district, the space features 20ft ceilings and north-facing windows that flood the room with consistent, diffuse light—perfect for color work and material selection.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                    <p class="size-14 font-semibold">Ralph Whisler — Lead Architect</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-mdSX6.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-09.png',
			'category': '2',
			'html': `
<div class="is-section is-section-100 is-box type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container size-18 size-17 leading-17 v3 is-content-1540">
        <div class="row" style="gap:30px">
            <div class="column" style="width: 35.1351%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-6">Essay Collection</p>
                <h1 class="size-96 font-light leading-10 pb-8" style="letter-spacing: -0.03em;">Nature</h1>
                <p class="size-14 uppercase tracking-150 text-gray-500 pb-2">The Beauty that Envelops Us</p>
                <div class="spacer height-60"></div>
                <p class="size-17 leading-17 text-gray-600 pb-6">The wonders of nature never cease to amaze us. From the majestic mountains to the serene beaches, nature encompasses a beauty that captivates our senses and reminds us of the power and magnificence that exists in our world.</p>
                <p class="size-17 leading-17 text-gray-600 pb-8">With every sunrise and sunset, nature paints a breathtaking canvas of colors that evokes a sense of awe and wonder. The gentle breeze whispers secrets of tranquility, while the sound of flowing water creates a symphony of serenity.</p>
                <div class="spacer height-40"></div>
                <div class="flex items-center leading-none" style="gap: 16px;">
                    <div class="rounded-full overflow-hidden" style="width: 55px; height: 55px; background: #e5e5e5;">
                        <img src="[%IMAGE_PATH%]images/ai-9cR8u-editLCvSqI3.jpg" alt="David Anderson" class="w-full h-full object-cover">
                    </div>
                    <p><span class="size-14 font-medium block">David Anderson</span>
                        <span class="size-12 text-gray-500">Environmental Writer</span>
                    </p>
                </div>
            </div>
            <div class="column pb-6">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 2 / 3;">
                    <img src="[%IMAGE_PATH%]images/ai-JdzNU-editNiEeM5W.jpg" alt="Nature landscape" data-filename="ai-JdzNU-editNiEeM5W.jpg" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
            <div class="column pb-6">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 2 / 3;">
                    <img src="[%IMAGE_PATH%]images/ai-zMVdu-editiLbJbck.jpg" alt="Nature detail" data-filename="ai-zMVdu-editiLbJbck.jpg" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-10.png',
			'category': '2',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-7">
        <div class="is-overlay" style="background-color: rgb(250, 250, 250);"></div>
        <div class="is-container is-content-800 content-py-80 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Personal Essay</p>
                    <h1 class="size-72 font-light leading-11 pb-6" style="letter-spacing: -0.02em;">Just Chillin'</h1>
                    <div style="width: 60px; height: 1px; background: #d1d5db;" class="mb-8"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <p class="size-21 leading-16 text-gray-700 pb-6" style="font-style: italic;">In our relentless pursuit of productivity, we've forgotten the profound art of doing absolutely nothing—and it might be exactly what we need.</p>
                    <p class="size-14 font-medium uppercase tracking-150 pb-8">By Anne Marry</p>
                </div>
            </div>
            <div class="row" style="gap: 40px;">
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600 pb-4">There's a certain magic in the moments between moments. Those quiet intervals when the world seems to pause, when the constant hum of obligation fades into a gentle whisper, and we find ourselves simply existing.</p>
                    <p class="size-16 leading-17 text-gray-600">The Italians call it "dolce far niente"—the sweetness of doing nothing. It's not laziness; it's a deliberate practice of presence, a conscious choice to step off the treadmill of endless activity.</p>
                </div>
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600 pb-4">In these stolen hours, creativity blooms unbidden. Ideas that refuse to emerge under pressure suddenly appear, fully formed, like gifts from a more relaxed version of ourselves.</p>
                    <p class="size-16 leading-17 text-gray-600">Perhaps the most radical act in our hyperconnected age is to simply be still—to watch clouds drift, to feel the sun on skin, to let thoughts wander without destination.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-I2V4d.jpg'); background-position: 50% 50%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-11.png',
			'category': '2',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-5 is-light-text hover-zoom is-content-top edge-y-0-25">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-3GHd2.jpg'); background-position: 50% 50%;">
                <div class="is-overlay-color opacity-12"></div>
            </div>
        </div>
        <div class="is-container is-content-480 size-16 content-py-80 size-17 leading-17 v3 is-content-left edge-x-1">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 pb-6" style="opacity: 0.7;">Seasonal Reflections</p>
                    <h1 class="size-64 font-light leading-11 pb-4 text-white">October &amp; November</h1>
                    <p class="size-14 uppercase tracking-150 pb-6" style="opacity: 0.8;">Sarah Anderson</p>
                    <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.4);"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-7">
        <div class="is-overlay" style="background-color: rgb(255, 255, 255);"></div>
        <div class="is-container content-py-80 leading-17 v3 is-content-620 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-24 leading-15 text-gray-800 pb-8" style="font-style: italic;">The year's most contemplative months arrive wrapped in amber light and the scent of woodsmoke.</p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600 pb-6">October enters like a painter, transforming the world into a gallery of gold and crimson. The air carries a crispness that awakens something primal—a preparation instinct inherited from ancestors who watched these same leaves fall.</p>
                    <p class="size-16 leading-17 text-gray-600 pb-6">By November, the palette softens. The trees stand bare against pewter skies, their architecture revealed in elegant silhouette. There's a quieting that happens, both in nature and within ourselves.</p>
                    <p class="size-16 leading-17 text-gray-600 pb-6">These months teach us about transition—about the beauty in letting go, the wisdom in slowing down. They remind us that dormancy isn't death but preparation, that rest is as essential as growth.</p>
                    <p class="size-16 leading-17 text-gray-600">In the gathering darkness, we learn to kindle our own light. We gather closer, share warmth, tell stories. The external world contracts, and our interior worlds expand to fill the space.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-12.png',
			'category': '2',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-I52hs.jpg'); background-position: 50% 50%;"></div>
        </div>
    </div>
    <div class="is-box is-box-7">
        <div class="is-overlay" style="background-color: rgb(250, 250, 250);"></div>
        <div class="is-container is-content-600 size-17 content-py-80 leading-17 v3">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Lifestyle Essay</p>
                    <p class="size-14 text-gray-500 pb-8">Michelle Duncan</p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h1 class="size-54 font-light leading-11 pb-8" style="letter-spacing: -0.02em;">In Love With Your Life</h1>
                    <div style="width: 60px; height: 1px; background: #d1d5db;" class="mb-8"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <p class="size-17 leading-17 text-gray-700 pb-6">Falling in love with your own life isn't narcissism—it's the most generous thing you can do. When you genuinely appreciate your existence, that contentment radiates outward, touching everyone you encounter.</p>
                    <p class="size-17 leading-17 text-gray-600 pb-6">It starts with small recognitions: the particular way morning light falls through your window, the comfort of a familiar cup in your hands, the sound of rain against glass when you're warm inside.</p>
                    <p class="size-17 leading-17 text-gray-600 pb-6">This isn't about having a perfect life—perfection is a myth that steals joy from the present. It's about cultivating attention, about noticing the extraordinary embedded in the ordinary.</p>
                    <p class="size-17 leading-17 text-gray-600">Your life, this particular arrangement of moments and relationships and small pleasures, will never exist again. Loving it fully is simply paying attention to that remarkable fact.</p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                    <div style="border-top: 1px solid #e5e5e5; padding-top: 24px;">
                        <p class="size-13 text-gray-500">Published in <span class="font-medium text-gray-700">The Slow Living Journal</span> · 8 min read</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-13.png',
			'category': '2',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1400 content-pt-60 content-pb-60 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-center" style="border-bottom: 1px solid #e5e5e5; padding-bottom: 20px;">
                    <p class="size-12 uppercase tracking-widest text-gray-500">Issue 04</p>
                    <p class="size-12 uppercase tracking-widest text-gray-500">Living Spaces</p>
                    <p class="size-12 uppercase tracking-widest text-gray-500">2024</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
                <h1 class="size-96 font-light leading-12 text-center tracking-tight">ESSENTIALISM</h1>
                <div class="spacer height-20"></div>
                <p class="size-18 text-gray-600 text-center font-light tracking-wide">THE ART OF SUBTRACTION IN MODERN DESIGN</p>
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-mdSX6.jpg" alt="Interior Detail" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-12 uppercase tracking-widest text-gray-400 mb-2">Fig 1.1</p>
                <p class="size-14 text-gray-800">Vertical integration of light.</p>
            </div>
            <div class="column flex flex-col justify-between" style="width: 35%; flex: 0 0 auto;">
                <div class="pb-8">
                    <p class="size-20 leading-16 font-light text-gray-800 mb-6">
                        "We strip away the unnecessary to reveal the soul of the architecture. It is not about emptiness, but about creating space for life to happen."
                    </p>
                    <p class="size-12 uppercase tracking-widest text-gray-500">— Peter Lassen</p>
                </div>
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 1/1;">
                    <img src="[%IMAGE_PATH%]images/ai-Tj9zz.jpg" alt="Texture Detail" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
            <div class="column">
                <div class="spacer height-80"></div>
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 4/3;">
                    <img src="[%IMAGE_PATH%]images/ai-wgvZ4-editDZZK9I1.jpg" alt="Wide Interior" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between" style="border-top: 1px solid #f0f0f0; padding-top: 15px;">
                    <p class="size-14 font-medium">The Open Plan</p>
                    <p class="size-14 text-gray-500">DK / 2024</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-14.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-right is-content-880 content-pt-100 content-pb-100 pr-12 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-4">The Interview</p>
                    <h2 class="size-80 leading-12 font-light mb-8">PERSPECTIVE</h2>
                </div>
            </div>

            <div class="row" style="gap: 60px;">
                <div class="column">
                    <div style="width: 100%; height: 1px; background-color: #000; margin-bottom: 30px;"></div>
                    <p class="size-18 leading-17 text-gray-800 mb-6">
                        Brenda Waller challenges the conventional boundaries of residential architecture. Her work is a testament to the power of perspective—looking not at what is there, but what could be.
                    </p>
                    <p class="size-16 leading-17 text-gray-600 mb-8">
                        "Architecture is the silent language of space," says Waller. "It speaks to us through light, shadow, and material. My job is simply to translate nature into a built environment that respects its origins."
                    </p>

                    <div class="flex justify-start">
                        <a href="#" class="size-14 uppercase tracking-widest text-black border-b-2 border-black pb-1 no-underline hover:text-gray-600 hover:border-gray-400 transition-colors">Read Full Story</a>
                    </div>
                </div>
                <div class="column" style="width: 30%; flex: 0 0 auto;">
                    <div class="bg-gray-50 p-8">
                        <p class="size-12 uppercase tracking-widest text-gray-500 mb-2">Role</p>
                        <p class="size-15 text-black mb-6">Lead Architect</p>

                        <p class="size-12 uppercase tracking-widest text-gray-500 mb-2">Studio</p>
                        <p class="size-15 text-black mb-6">Waller &amp; Co.</p>

                        <p class="size-12 uppercase tracking-widest text-gray-500 mb-2">Location</p>
                        <p class="size-15 text-black">Copenhagen</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-lG4f1.jpg'); background-position: center; opacity: 1;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-15.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-U9Z7t.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
    <div class="is-box is-box-7 bg-gray-50">
        <div class="is-overlay"></div>
        <div class="is-container is-content-880 content-pt-100 content-pb-100 pl-12 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <div class="flex justify-between items-end mb-12">
                        <h2 class="size-100 font-light leading-12 text-black mr-6" style="margin-left: -4px;">SILENCE</h2>
                        <span class="size-14 uppercase tracking-widest text-gray-500 mb-4 pb-2 border-b border-gray-300">Concept 03</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row" style="gap: 40px;">
                <div class="column" style="width: 60%; flex: 0 0 auto;">
                    <p class="size-24 leading-15 font-light text-gray-800 mb-8">
                        In a world of constant noise, silence becomes the ultimate luxury.
                    </p>
                    <p class="size-16 leading-17 text-gray-600">
                        Our approach to interior design prioritizes acoustic comfort and visual calm. By reducing visual clutter and utilizing sound-absorbing natural materials, we create sanctuaries that allow the mind to rest. It is not just about how a room looks, but how it feels to be within it.
                    </p>
                </div>
                <div class="column">
                    <div class="p-8 border border-gray-200 bg-white">
                        <i class="bi bi-quote size-32 text-gray-300 mb-4 block"></i>
                        <p class="size-15 italic text-gray-600 mb-4">"True luxury is the absence of distraction."</p>
                        <p class="size-13 font-semibold text-black">— Allice Mobley</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                    <div class="flex space-x-2">
                        <div class="h-1 w-20 bg-black"></div>
                        <div class="h-1 w-4 bg-gray-300"></div>
                        <div class="h-1 w-4 bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-17.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 is-content-bottom edge-y-2">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-PrMCM.jpg'); background-position: 50% 60%;"></div>
        </div>
        <div class="is-container bg-white size-17 leading-17 v3 is-content-left edge-x-2 is-content-300">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-2">Featured Project</p>
                    <p class="size-16 font-medium text-black">The Nordic House</p>
                    <p class="size-14 text-gray-500">Reykjavik, 2023</p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 content-pt-100 content-pb-100 v3 size-18 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-6">Philosophy</p>
                    <h2 class="size-72 leading-12 font-light mb-2">PURE</h2>
                    <h2 class="size-72 leading-12 font-light mb-12 text-gray-400">FUNCTION</h2>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <p class="size-18 leading-17 text-gray-800 mb-8">
                        "Keep everything simple." It sounds easy, but simplicity is the hardest thing to achieve. It requires the confidence to remove the non-essential.
                    </p>
                </div>
            </div>
            <div class="row" style="gap: 30px;">
                <div class="column">
                    <div class="pb-4 border-b border-gray-100">
                        <p class="size-14 font-semibold text-black">Clarity</p>
                        <p class="size-14 text-gray-500 mt-1">Every element has a purpose.</p>
                    </div>
                </div>
                <div class="column">
                    <div class="pb-4 border-b border-gray-100">
                        <p class="size-14 font-semibold text-black">Honesty</p>
                        <p class="size-14 text-gray-500 mt-1">Materials shown as they are.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-8 size-15 leading-14 border-black text-black hover:bg-black hover:text-white">
                            Explore Philosophy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/article-16.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7">
        <div class="is-overlay"></div>
        <div class="is-container is-content-900 leading-17 v3 size-16">
            <div class="row" style="border-bottom: 1px solid #000000; padding-bottom: 20px;">
                <div class="column">
                    <div class="flex justify-between items-end">
                        <p class="size-12 uppercase tracking-150 text-black font-bold">01 — Feature</p>
                        <p class="size-12 uppercase tracking-150 text-gray-500">Editorial</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h1 class="size-96 leading-12 font-light tracking-tight text-black">PERPETUAL<br>MOTION</h1>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row" style="gap: 60px;">
                <div class="column" style="width: 30%; flex: 0 0 auto;">
                    <p class="size-14 uppercase tracking-150 text-gray-500 mb-2">Author</p>
                    <p class="size-16 text-black">Casey Lansford</p>
                    <div class="spacer height-20"></div>
                    <p class="size-14 uppercase tracking-150 text-gray-500 mb-2">Published</p>
                    <p class="size-16 text-black">October 24, 2024</p>
                </div>
                <div class="column">
                    <p class="size-20 leading-16 text-black font-light mb-6">
                        The wheels of innovation never truly stop spinning. In a world defined by rapid technological shifts, standing still is equivalent to moving backward.
                    </p>
                    <p class="size-16 leading-17 text-gray-600">
                        We explore the mechanisms of modern progress, dissecting how small, incremental changes compound into revolutionary shifts. From the quiet hum of server farms to the bustling energy of creative studios, movement is the only constant variable in the equation of success.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-zTdaP.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-18.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-7oJdy.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
    <div class="is-box is-box-7">
        <div class="is-overlay" style="background-color: #f9f9f9;"></div>
        <div class="is-container is-content-800 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400">02 — Perspective</p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h1 class="size-80 leading-12 font-normal text-black">Honest<br><span class="text-gray-400">Dialogue</span></h1>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="p-10 bg-white border-l-4 border-black">
                        <p class="size-24 leading-15 text-black font-light italic">
                            "True connection begins where pretense ends. We must speak the language of authenticity."
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row" style="gap: 40px;">
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600">
                        In an era of curated feeds and filtered realities, raw honesty has become a rare commodity. Stephen Garcia argues that the future of brand communication lies not in polish, but in vulnerability.
                    </p>
                </div>
                <div class="column">
                    <p class="size-16 leading-17 text-gray-600">
                        When we strip away the marketing jargon and corporate speak, what remains is the human story. It is messy, imperfect, and utterly compelling. This is the new frontier of engagement.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-19.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7">
        <div class="is-overlay" style="background-color: #ffffff;"></div>
        <div class="is-container is-content-900 leading-17 v3 size-18">
            <div class="row">
                <div class="column">
                    <div class="flex items-center" style="gap: 20px;">
                        <span class="size-14 font-bold text-black">03</span>
                        <div style="height: 1px; flex-grow: 1; background-color: #e5e5e5;"></div>
                        <span class="size-12 uppercase tracking-150 text-gray-400">Aesthetics</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h1 class="size-120 leading-12 font-light text-black" style="margin-left: -6px;">VISUAL<br>HARMONY</h1>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                </div>
            </div>
            <div class="row" style="border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">
                <div class="column py-6" style="border-right: 1px solid #f0f0f0;">
                    <p class="size-11 uppercase tracking-150 text-gray-400 mb-2">Curator</p>
                    <p class="size-15 font-medium text-black">Annie Baldwin</p>
                </div>
                <div class="column py-6" style="border-right: 1px solid #f0f0f0;">
                    <p class="size-11 uppercase tracking-150 text-gray-400 mb-2">Discipline</p>
                    <p class="size-15 font-medium text-black">Choreography</p>
                </div>
                <div class="column py-6">
                    <p class="size-11 uppercase tracking-150 text-gray-400 mb-2">Location</p>
                    <p class="size-15 font-medium text-black">Berlin, DE</p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row">
                <div class="column" style="width: 60%; flex: 0 0 auto;">
                    <p class="size-18 leading-16 text-black">
                        Balance is not about symmetry; it is about tension. The most compelling compositions exist on the edge of chaos, held together by an invisible thread of intent.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-HaOCF.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/article-20.png',
			'category': '2',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7">
        <div class="is-overlay"></div>
        <div class="is-container is-content-900 leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400">04 — Studio</p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h1 class="size-128 leading-none font-bold text-black tracking-tighter">hello.</h1>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                </div>
            </div>
            <div class="row" style="gap: 60px;">
                <div class="column" style="width: 35%; flex: 0 0 auto;">
                    <div class="pb-4 mb-4" style="border-bottom: 1px solid #000;">
                        <p class="size-14 font-bold uppercase tracking-widest text-black">Values</p>
                    </div>
                    <ul class="size-16 leading-18 text-gray-600" style="list-style: none; padding: 0; margin: 0;">
                        <li class="pb-2">Simplicity First</li>
                        <li class="pb-2">Human Centric</li>
                        <li class="pb-2">Data Driven</li>
                        <li class="pb-2">Sustainable</li>
                    </ul>
                </div>
                <div class="column">
                    <p class="size-24 leading-14 text-black font-light mb-6">
                        We are a design collective focused on clarity.
                    </p>
                    <p class="size-16 leading-17 text-gray-600">
                        Led by Samantha Jones, our studio strips away the non-essential to reveal the core truth of every project. We believe that good design is invisible, intuitive, and inevitable.
                    </p>
                    <div class="spacer height-40"></div>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-8 size-15 leading-14 border-black hover:bg-black hover:text-white text-black">
                            Start a Project
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-F52B1.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},

		/* Profile */
		{
			'thumbnail': 'preview/profile-01.png',
			'category': '11',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5 box-autofit min-height-40">
        <div class="is-overlay" style="background-color: #f9f9f9;"></div>
        <div class="is-container v3 pb-11 leading-17 size-18 is-content-520">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-6">Founder Profile</p>
                    <h2 class="font-light leading-12 mb-6 size-48">Emilie Petersen</h2>
                    <p class="leading-17 text-gray-600 mb-8 size-16">
                        "I believe in the power of minimalism to solve complex problems. Good design isn't just about how it looks, but how it communicates."
                    </p>
                    <div class="w-full" style="height: 1px; background-color: #e5e5e5; margin-bottom: 30px;"></div>

                    <div class="flex justify-start" style="gap: 20px;">
                        <a href="#" class="uppercase tracking-widest text-black underline-offset-4 pb-1 size-12">Twitter / X</a>
                        <a href="#" class="uppercase tracking-widest text-black underline-offset-4 pb-1 size-12">LinkedIn</a>
                        <a href="#" class="uppercase tracking-widest text-black underline-offset-4 pb-1 size-12">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-7 hover-zoom box-autofit min-height-60">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-1l5Xy-edityBkubuZ.jpg'); background-position: 50% 30%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/profile-02.png',
			'category': '11',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 selection-active">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-10 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end" style="border-bottom: 1px solid #e5e5e5; padding-bottom: 20px;">
                    <h2 class="size-48 leading-12 font-light">Leadership</h2>
                    <p class="size-14 uppercase tracking-widest text-gray-500 mb-2">Our Principles</p>
                </div>
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-jfsPW-edituyLp21J.jpg" alt="Freja E. Andersen" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex flex-col">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-2">Strategic Director</p>
                    <h3 class="size-24 font-normal leading-13 mb-3">Freja E. Andersen</h3>
                    <p class="leading-17 text-gray-600 size-16">Driving vision through data-informed design strategies that transform business objectives into visual reality.</p>
                </div>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-9cR8u-editLCvSqI3.jpg" alt="Nathan Williams" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex flex-col">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-2">Design Lead</p>
                    <h3 class="size-24 font-normal leading-13 mb-3">Nathan Williams</h3>
                    <p class="leading-17 text-gray-600 size-16">Crafting intuitive digital experiences with a focus on typography, grid systems, and user interaction.</p>
                </div>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-FhJeD-editapwdgHV.jpg" alt="Vincent Nelson" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex flex-col">
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-2">Technical Director</p>
                    <h3 class="size-24 font-normal leading-13 mb-3">Vincent Nelson</h3>
                    <p class="leading-17 text-gray-600 size-16">Bridging the gap between creative vision and robust engineering to deliver seamless performance.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/profile-03.png',
			'category': '11',
			'html': `
<div class="is-section is-box type-system-ui bg-gray-50 is-section-100">
    <div class="is-overlay" style="background-color: rgb(248, 248, 248);"></div>
    <div class="is-container is-content-1400 v3 pb-16 pt-12 size-17 leading-17">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-500 mb-4">02 / The Core</p>
                <h2 class="size-48 font-light leading-12 mb-12">Department Heads</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="bg-white p-8 box-border h-full transition-transform duration-500 hover:-translate-y-2">
                    <div class="w-full overflow-hidden relative bg-gray-100 mb-6" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-UpaSa.jpg" alt="Emilie Petersen" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                    </div>
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-2">Product</p>
                    <h3 class="size-20 font-medium mb-3">Emilie Petersen</h3>
                    <p class="size-15 leading-16 text-gray-600">Bridging the gap between user needs and technical feasibility with data-driven product roadmaps.</p>
                </div>
            </div>
            <div class="column">
                <div class="bg-white p-8 box-border h-full transition-transform duration-500 hover:-translate-y-2">
                    <div class="w-full overflow-hidden relative bg-gray-100 mb-6" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-raLOH-editrwNcOb3.jpg" alt="Nathan Williams" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                    </div>
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-2">Technology</p>
                    <h3 class="size-20 font-medium mb-3">Nathan Williams</h3>
                    <p class="size-15 leading-16 text-gray-600">Architecting scalable solutions for enterprise applications with a focus on security and performance.</p>
                </div>
            </div>
            <div class="column">
                <div class="bg-white p-8 box-border h-full transition-transform duration-500 hover:-translate-y-2">
                    <div class="w-full overflow-hidden relative bg-gray-100 mb-6" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-D3ghO-editXp6Nbi5.jpg" alt="Vincent Nelson" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                    </div>
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-2">Strategy</p>
                    <h3 class="size-20 font-medium mb-3">Vincent Nelson</h3>
                    <p class="size-15 leading-16 text-gray-600">Uncovering market opportunities and translating complex analytics into actionable business strategies.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/profile-04.png',
			'category': '11',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-7 bg-white box-autofit min-height-50">
        <div class="is-overlay"></div>
        <div class="is-container is-content-800 is-content-left v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                    <p class="size-12 uppercase tracking-widest text-gray-400 mb-6">Introduction</p>
                    <h2 class="size-48 font-light leading-13 mb-8">
                        Hello. I'm Emilie Petersen. A web designer with experience in studios and startups.
                        <br>
                        <a href="#" class="text-black underline underline-offset-4 hover:text-gray-600 transition-colors">Drop me a line</a>
                    </h2>
                    <div class="spacer height-20"></div>

                    <div class="space-x-1">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full size-16 leading-16 border-transparent hover:border-transparent pb-3 pt-3 px-8" style="color: rgb(24, 24, 27); background-color: rgb(240, 240, 241);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(240, 240, 241)" data-hover-bg="rgb(236, 236, 238)">twitter.com</a>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full size-16 leading-16 border-transparent hover:border-transparent pb-3 pt-3 px-8" style="color: rgb(24, 24, 27); background-color: rgb(240, 240, 241);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(240, 240, 241)" data-hover-bg="rgb(236, 236, 238)">linkedin.com</a>
                    </div>
                    <div class="spacer height-40"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5 box-autofit min-height-80">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-2qAvY.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
</div>
		`
		},
		
		{
			'thumbnail': 'preview/profile-05.png',
			'category': '11',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 pt-12 pb-14 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-6" style="border-bottom: 1px solid #e5e5e5;">
                    <h2 class="size-60 leading-11 font-light">Leadership</h2>
                    <p class="size-14 uppercase tracking-150 text-gray-500 pb-2">01 / Executive Board</p>
                </div>
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-IWxyJ.jpg" alt="Amanda Steele" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between pb-3">
                    <h3 class="size-24 font-normal">Amanda Steele</h3>
                    <span class="size-12 uppercase tracking-150 text-gray-400 mt-2">CEO &amp; Founder</span>
                </div>
                <p class="size-16 leading-17 text-gray-600 pb-4" style="max-width: 90%;">
                    Visionary leader with over 15 years of experience driving sustainable growth strategies across global markets. Amanda focuses on building resilient organizational cultures.
                </p>
                <div class="space-x-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <a href="#" class="text-black no-underline size-14"><i class="bi bi-twitter-x"></i></a>
                    <a href="#" class="text-black no-underline size-14"><i class="bi bi-linkedin"></i></a>
                </div>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-4Q1nN.jpg" alt="Peter A. Lassen" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between pb-3">
                    <h3 class="size-24 font-normal">Peter A. Lassen</h3>
                    <span class="size-12 uppercase tracking-150 text-gray-400 mt-2">Creative Director</span>
                </div>
                <p class="size-16 leading-17 text-gray-600 pb-4" style="max-width: 90%;">
                    Award-winning design thinker applying architectural principles to complex digital ecosystems. Peter ensures every visual output aligns with our core aesthetic values.
                </p>
                <div class="space-x-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <a href="#" class="text-black no-underline size-14"><i class="bi bi-twitter-x"></i></a>
                    <a href="#" class="text-black no-underline size-14"><i class="bi bi-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/profile-06.png',
			'category': '11',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-14 pt-10 size-17 leading-17">
        <div class="row">
            <div class="column text-center">
                <p class="size-12 uppercase tracking-widest text-gray-400 mb-4">The Experts</p>
                <h2 class="size-42 font-normal leading-13 mb-2">Specialized Talent</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="p-8 box-border bg-gray-50 h-full ease-out hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                    <div class="flex justify-between mb-6">
                        <span class="size-14 font-bold">01</span>
                        <span class="size-12 uppercase tracking-widest text-gray-400">Founder</span>
                    </div>
                    <div class="w-full overflow-hidden relative mb-6 grayscale hover:grayscale-0 transition-all duration-500" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-7ScZG-editzX08vbJ.jpg" alt="Freja E. Andersen" class="w-full h-full object-cover">
                    </div>
                    <h3 class="size-20 font-medium mb-2">Freja E. Andersen</h3>
                    <p class="size-15 text-gray-600">Leading creative direction and client relationships.</p>
                </div>
            </div>

            <div class="column">
                <div class="p-8 box-border bg-gray-50 h-full ease-out hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                    <div class="flex justify-between mb-6">
                        <span class="size-14 font-bold">02</span>
                        <span class="size-12 uppercase tracking-widest text-gray-400">UI/UX</span>
                    </div>
                    <div class="w-full overflow-hidden relative mb-6 grayscale hover:grayscale-0 transition-all duration-500" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-6Woul.jpg" alt="Nathan Williams" class="w-full h-full object-cover">
                    </div>
                    <h3 class="size-20 font-medium mb-2">Nathan Williams</h3>
                    <p class="size-15 text-gray-600">Focusing on user-centric interface design systems.</p>
                </div>
            </div>

            <div class="column">
                <div class="p-8 box-border bg-gray-50 h-full ease-out hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                    <div class="flex justify-between mb-6">
                        <span class="size-14 font-bold">03</span>
                        <span class="size-12 uppercase tracking-widest text-gray-400">Developer</span>
                    </div>
                    <div class="w-full overflow-hidden relative mb-6 grayscale hover:grayscale-0 transition-all duration-500" style="aspect-ratio:1/1">
                        <img src="[%IMAGE_PATH%]images/ai-nLlNe-editvUlQMzS.jpg" alt="Marcus Klausen" class="w-full h-full object-cover">
                    </div>
                    <h3 class="size-20 font-medium mb-2">Marcus Klausen</h3>
                    <p class="size-15 text-gray-600">Specializing in high-performance web animations.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/profile-07.png',
			'category': '11',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container content-py-100 v3 pt-12 pb-16 size-17 leading-17 is-content-1060">
        <div class="row">
            <div class="column text-center">
                <h2 class="size-14 uppercase tracking-150 text-gray-400 mb-4">03 / Specialists</h2>
                <p class="size-42 font-light leading-13 mb-12">Meet the Makers</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row items-center" style="gap: 60px;">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 5 / 4;">
                    <img src="[%IMAGE_PATH%]images/ai-8Sdl0-edittxuGm1F.jpg" alt="Janice Smith" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
            <div class="column flex flex-col justify-center">
                <div class="pb-4 border-b border-gray-200 mb-4">
                    <h3 class="size-32 font-normal mb-1">Janice Smith</h3>
                    <p class="size-16 text-gray-500">Lead Developer</p>
                </div>
                <p class="size-17 leading-17 text-gray-600 mb-6">
                    With full-stack expertise and a focus on performance optimization, Janice builds the robust infrastructure that powers our most ambitious digital products. She specializes in React architecture and server-side rendering.
                </p>
                <div>
                    <a href="#" class="size-14 font-medium uppercase tracking-wide text-black hover:text-gray-600 hover:border-gray-600 transition-colors underline underline-offset-4 ">View Portfolio</a>
                </div>
            </div>
        </div>

        <div class="spacer height-80"></div>

        <div class="row items-center desktop-row-reverse" style="gap: 60px;">
            <div class="column flex flex-col justify-center">
                <div class="pb-4 border-b border-gray-200 mb-4">
                    <h3 class="size-32 font-normal mb-1">Elaine Moreno</h3>
                    <p class="size-16 text-gray-500">Senior UX Designer</p>
                </div>
                <p class="size-17 leading-17 text-gray-600 mb-6">
                    Elaine uncovers deep user insights to inform design direction. Her empathy-driven approach ensures that every interaction is intuitive, accessible, and meaningful for the end user.
                </p>
                <div>
                    <a href="#" class="size-14 font-medium uppercase tracking-wide text-black hover:text-gray-600 hover:border-gray-600 transition-colors underline underline-offset-4">View Portfolio</a>
                </div>
            </div>
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 5 / 4;">
                    <img src="[%IMAGE_PATH%]images/ai-aW3kS-editAS28boy.jpg" alt="Elaine Moreno" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/profile-08.png',
			'category': '11',
			'html': `
<div class="is-section is-box box-autofit is-section-50 type-system-ui">
    <div class="is-overlay"></div>
    <div class="is-container v2 size-16 leading-16 v3 is-content-920">
        <div class="row">
            <div class="flex flex-col justify-center items-center px-3 column py-3" style="width: 34%; flex: 0 0 auto;">
                <div class="w-3/4 overflow-hidden relative bg-gray-100" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-D3ghO-editffHENGi.jpg" alt="Nathan Williams" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
            </div>
            <div class="px-3 flex flex-col column justify-center">
                <h3 class="size-20 font-medium leading-11">Nathan Williams</h3>
                <p class="leading-16 text-gray-600 pb-4 size-16">Architecting scalable solutions for enterprise applications with a focus on security and performance.</p>
                <div class="space-x-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <a href="#" class="text-black no-underline size-14"><i class="bi bi-twitter-x"></i></a>
                    <a href="#" class="text-black no-underline size-14"><i class="bi bi-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>
			`
		},


		{
			'thumbnail': 'preview/profile-09.png',
			'category': '11',
			'html': `
<div class="is-section type-system-ui is-section-100">

    <div class="is-box is-box-6 box-autofit min-height-60">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-D3ghO-editffHENGi.jpg'); background-position: 50% 20%;"></div>
        </div>
    </div>

    <div class="is-box is-box-6 box-autofit min-height-20">
        <div class="is-overlay"></div>
        <div class="is-container is-content-540 v3 pt-11 pb-10 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-6">04 / Employee Spotlight</p>
                    <h2 class="size-42 font-light leading-12 mb-6">Nathan Williams</h2>
                    <div class="w-12 h-1 bg-white mb-8"></div>
                    <p class="size-20 font-light">
                        "Innovation isn't just about new code; it's about solving old problems in ways that were previously unimaginable."
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},
		{
			'thumbnail': 'preview/profile-10.png',
			'category': '11',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 pb-10 pt-10 size-17 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-32 font-light leading-13 mb-10 pl-4" style="border-left: 3px solid black;">Core Team</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row" style="gap: 20px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-100 mb-4" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-jfsPW-edituyLp21J.jpg" alt="Emilie Petersen" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <h4 class="size-16 font-semibold">Emilie Petersen</h4>
                <p class="size-13 text-gray-500 uppercase tracking-wide">CEO &amp; Founder</p>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-100 mb-4" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-9cR8u-editLCvSqI3.jpg" alt="Nathan Williams" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <h4 class="size-16 font-semibold">Nathan Williams</h4>
                <p class="size-13 text-gray-500 uppercase tracking-wide">Project Manager</p>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-100 mb-4" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-i4kBm-editPkv1YEy.jpg" alt="Jennifer Clarke" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <h4 class="size-16 font-semibold">Jennifer Clarke</h4>
                <p class="size-13 text-gray-500 uppercase tracking-wide">Web Designer</p>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-100 mb-4" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-FhJeD-editapwdgHV.jpg" alt="Vincent Nelson" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <h4 class="size-16 font-semibold">Vincent Nelson</h4>
                <p class="size-13 text-gray-500 uppercase tracking-wide">Developer</p>
            </div>
        </div>
    </div>
</div>
`
		},

		{
			'thumbnail': 'preview/contact-02.png',
			'category': '12',
			'html': `
<div class="is-section is-section-100 box-space type-system-ui">
    <div class="is-box-6 is-box is-light-text is-content-bottom edge-y-1 box-autofit min-height-50">
        <div class="is-overlay" style="z-index: 1;">
            <div class="is-overlay-content">
                <div data-cb-type="map-embed" data-cb-location="Eiffel Tower, Paris, France" data-cb-zoom="14" data-cb-map-type="road" data-cb-size-mode="fill">
                    <div class="map-embed-frame"></div>
                </div>
            </div>
        </div>
        <div class="is-container v2 is-content-380 is-content-left edge-x-0-5">
            <div class="row">
                <div class="column">
                    <p class="size-16">
                        <strong>Your Company Name</strong><br>
                        12345 Street Name, City.
                        State 12345<br>
                        P: (123) 456 7890 / 456 7891.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box-6 is-box is-dark-text box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container v3 pt-11 pb-14 size-16 leading-17 is-content-640">
            <div class="row">
                <div class="column">
                    <p class="uppercase tracking-150 size-12 text-gray-400 mb-2">Get in touch</p>
                    <h2 class="size-60 font-light leading-12 text-black">Let's start a conversation.</h2>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>

            <div class="row" style="border-top: 1px solid #f3f4f6;">
                <div class="column pt-6 pb-6">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Visit Us</p>
                    <p class="size-16 leading-17 text-black">
                        1200 Design District Blvd,<br>
                        Suite 400, New York, NY 10012
                    </p>
                </div>
            </div>

            <div class="row" style="border-top: 1px solid #f3f4f6;">
                <div class="column pt-6 pb-6">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Email</p>
                    <a href="mailto:hello@agency.com" class="size-16 leading-17 text-black no-underline hover:text-gray-600 transition-colors">hello@example.com</a>
                </div>
            </div>

            <div class="row" style="border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6;">
                <div class="column pt-6 pb-6">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Call</p>
                    <p class="size-16 leading-17 text-black">+1 (555) 012-3456</p>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                    <div class="flex space-x-2">
                        <a href="#" class="size-14 text-gray-400 hover:text-black transition-colors no-underline">Instagram</a>
                        <span class="size-14 text-gray-300">/</span>
                        <a href="#" class="size-14 text-gray-400 hover:text-black transition-colors no-underline">LinkedIn</a>
                        <span class="size-14 text-gray-300">/</span>
                        <a href="#" class="size-14 text-gray-400 hover:text-black transition-colors no-underline">Twitter / X</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/contact-04.png',
			'category': '12',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box box-autofit is-box-6">
        <div class="is-overlay" style="background-color: #ffffff;"></div>
        <div class="is-container v2 is-content-620 pt-11 pb-11 v3 leading-17 size-18">
            <div class="row">
                <div class="column">
                    <p class="uppercase size-12 tracking-150 text-gray-400 font-medium pb-6 border-b" style="border-color: #f0f0f0;">01. Contact</p>
                    <div class="spacer height-40"></div>
                    <h1 class="size-60 leading-12 font-light text-black pb-6">Let's start a conversation.</h1>
                    <p class="leading-17 text-gray-600 pb-8" style="max-width: 400px;">
                        Interested in working with us? We are always looking for new projects and collaborations.
                    </p>

                    <div class="spacer height-20"></div>

                    <div class="pb-6">
                        <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">General Inquiries</p>
                        <a href="mailto:hello@archetype.com" class="size-24 text-black font-normal no-underline hover:opacity-70">hello@example.com</a>
                    </div>

                    <div class="pb-6">
                        <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Phone</p>
                        <p class="text-black">+1 (234) 567-899</p>
                    </div>

                    <div class="pb-6">
                        <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Studio</p>
                        <p class="text-gray-600 leading-16">
                            123 Innovation Drive,<br>
                            SoHo, City. State 12345
                        </p>
                    </div>

                    <div class="spacer height-20"></div>

                    <div class="flex items-center space-x-2">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(250, 250, 250); background-color: rgb(24, 24, 27);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)">
                            Schedule a Call
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box box-autofit is-box-6 min-height-70">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-Dv3Cv-editlcqbUZl.jpg'); background-position: 50% 50%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/contact-05.png',
			'category': '12',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay" style="background-color: #ffffff;"></div>
    <div class="is-container content-py-80 size-17 leading-17 v3 is-content-1300">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-12" style="border-bottom: 1px solid #e5e5e5;">
                    <div>
                        <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">02 — Contact</p>
                        <h2 class="size-48 font-light leading-12 text-black">Get in touch</h2>
                    </div>
                    <p class="size-14 text-gray-500" style="max-width: 300px;">Ready to start your next project? We'd love to hear from you.</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row">
            <div class="column pb-6">
                <div class="p-10 box-border h-full transition-all duration-300 hover:-translate-y-1" style="background-color: #fafafa;">
                    <div class="pb-8">
                        <i class="bi bi-envelope size-28 text-gray-400"></i>
                    </div>
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-3">Email Us</p>
                    <a href="mailto:info@company.com" class="size-18 text-black no-underline font-medium">info@example.com</a>
                    <p class="size-14 text-gray-500 pt-4 leading-16">For general inquiries and project discussions.</p>
                </div>
            </div>
            <div class="column pb-6">
                <div class="p-10 box-border h-full transition-all duration-300 hover:-translate-y-1" style="background-color: #fafafa;">
                    <div class="pb-8">
                        <i class="bi bi-telephone size-28 text-gray-400"></i>
                    </div>
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-3">Call Us</p>
                    <p class="size-18 text-black font-medium">+1 (555) 123-4567</p>
                    <p class="size-14 text-gray-500 pt-4 leading-16">Monday to Friday, 9am to 6pm EST.</p>
                </div>
            </div>
            <div class="column pb-6">
                <div class="p-10 box-border h-full transition-all duration-300 hover:-translate-y-1" style="background-color: #fafafa;">
                    <div class="pb-8">
                        <i class="bi bi-geo-alt size-28 text-gray-400"></i>
                    </div>
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-3">Visit Us</p>
                    <p class="size-18 text-black font-medium">San Francisco</p>
                    <p class="size-14 text-gray-500 pt-4 leading-16">123 Example Street, Design City, <br>DC 12345<br></p>
                </div>
            </div>
            <div class="column pb-6">
                <div class="p-10 box-border h-full transition-all duration-300 hover:-translate-y-1" style="background-color: #fafafa;">
                    <div class="pb-8">
                        <i class="bi bi-clock size-28 text-gray-400"></i>
                    </div>
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-3">Hours</p>
                    <p class="size-18 text-black font-medium">Open Daily</p>
                    <p class="size-14 text-gray-500 pt-4 leading-16">Mon–Fri: 9am–6pm<br>Sat: 10am–4pm</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="flex justify-center">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-8 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(250, 250, 250); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">
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
			'thumbnail': 'preview/contact-07.png',
			'category': '12',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box box-autofit is-box-6">
        <div class="is-overlay">
        </div>
        <div class="is-container v2 size-16 leading-13 is-content-500 v3">
            <div class="row">
                <div style="min-height: 143.892px;" class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400">Contact</p>

                    <h1 class="font-light text-black leading-11 size-68 pb-2">Let's connect.</h1>

                    <p class="size-17 leading-17 text-gray-600">
                        We're always interested in hearing about new projects. Drop us a line and let's create something remarkable together.
                    </p>

                    <div class="pt-2 pb-2" style="border-bottom: 1px solid #e5e5e5;">
                        <p class="size-11 uppercase tracking-150 text-gray-400 size-15">Email</p>
                        <p><a href="mailto:hello@studio.com" class="size-20 text-black no-underline hover-underline-animation">hello@example.com</a></p>
                    </div>

                    <div class="pt-2 pb-2" style="border-bottom: 1px solid #e5e5e5;">
                        <p class="size-11 uppercase tracking-150 text-gray-400 size-15">Phone</p>
                        <p class="size-20 text-black">+1 (555) 123-4567</p>
                    </div>

                    <div class="pt-2">
                        <p class="size-11 uppercase tracking-150 text-gray-400 pb-3 size-15">Location</p>
                        <p class="size-16 text-gray-700 leading-16 pb-8">
                            245 Design Avenue, Floor 12<br>
                            New York, NY 10013
                        </p>
                    </div>

                    <div class="flex items-center" style="gap: 16px;">
                        <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">Instagram</a>
                        <span class="text-gray-300">·</span>
                        <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">LinkedIn</a>
                        <span class="text-gray-300">·</span>
                        <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">Twitter / X</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="is-box is-dark-text is-box-7 box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container v2 size-16 leading-13 is-content-500 v3">
            <div class="row">
                <div class="column" style="min-height: 54px;">
                    <h3 class="font-light text-center">Send us a message</h3>
                    <div class="spacer height-20"></div>
                </div>
            </div>
            <div class="row">
                <div class="column flex flex-col items-center" data-noedit="" data-dialog-width="1600px" data-dialog-height="85vh" data-module="form-builder" data-module-desc="Form Builder" data-html="

                                ${encodeURIComponent(`
                                <div id="_style_{id}" style="display:none">
                                    #{id} {
                                        transition: all 0.3s ease-out;
                                        height: auto;
                                    }
                                    #{id}.collapsed {
                                        overflow: hidden;
                                        height: 0;
                                    }
                                    #status_{id} {
                                        transition: all 0.3s ease-out;
                                        height: auto;
                                    }
                                    #status_{id}.collapsed {
                                        overflow: hidden;
                                        height: 0;
                                    }
                                </div>
                                <form id="form_{id}" method="POST" action="/formsubmission" style="padding: 25px 0 20px">
                                    <div id="{id}"></div>

                                    <div id="status_{id}" class="collapsed"></div>
                                </form>
                                
                                <script>
                                var css = document.querySelector('#_style_{id}').innerHTML;
                                var head = document.getElementsByTagName('head')[0];
                                var s = document.createElement('style');
                                s.appendChild(document.createTextNode(css));
                                head.appendChild(s);
                                
                                var docReady = function(fn) {
                                    var stateCheck = setInterval(function() {
                                        if (document.readyState !== "complete") return;
                                        clearInterval(stateCheck);
                                        try {
                                            fn()
                                        } catch (e) {}
                                    }, 1);
                                };
                    
                                docReady(function() {
                        
                                    var elm = document.getElementById('{id}');
                                    var viewer = new FormViewer(elm);

                                    let json = {
                                        "title": "Contact",
                                        "description": "Description here.",
                                        "elements": [
                                            {
                                                "title": "Name:",
                                                "name": "name",
                                                "type": "short-text",
                                                "fieldNote": "",
                                                "isRequired": true,
                                                "placeholder": "Enter your name.",
                                                "value": ""
                                            },
                                            {
                                                "title": "Email:",
                                                "name": "email",
                                                "type": "email",
                                                "fieldNote": "",
                                                "isRequired": true,
                                                "placeholder": "Enter your email."
                                            },
                                            {
                                                "title": "Message:",
                                                "name": "message",
                                                "type": "long-text",
                                                "fieldNote": "",
                                                "isRequired": true,
                                                "placeholder": "Enter your message.",
                                                "value": "",
                                                "height": ""
                                            }
                                        ],
                                        "submitText": "Send",
                                        "resetText": "Reset",
                                        "hideReset": true,
                                        "fullWidthButton": true,
                                        "hideHeader": true,
                                        "useSubmitButton": true
                                    };
                                    
                                    const initialFormData = JSON.stringify(json);
                                    viewer.view(initialFormData); 

                                    var statusInfo = document.querySelector('#status_{id}');

                                    var form = document.querySelector('#form_{id}');

                                    async function handleSubmit(event) {
                                        event.preventDefault();

                                        var btnSend = form.querySelector('.btn-submitform');
                                        
                                        btnSend.innerHTML = '<span class="loading-icon"><svg class="animate-spin" style="margin-right:7px;width:20px;height:20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>Submit';

                                        var data = new FormData(form);

                                        fetch(form.action, {
                                            method: form.method,
                                            body: data,
                                            headers: {
                                                'Accept': 'application/json'
                                            }
                                        })
                                        .then(response=>response.json())
                                        .then(data=>{
                                            if(!data.error) {
                                                statusInfo.innerHTML = '<div class="text-center pt-4 pb-4"><i class="bi bi-send-check size-64"></i>' +
                                                '</div><div class="leading-14 text-center size-38 pb-4">Thanks for your submission!</div>';
                                                form.reset();

                                                elm.classList.add('collapsed');
                                                setTimeout(function(){
                                                    statusInfo.classList.remove('collapsed');
                                                },300);

                                            } else {
                                                statusInfo.innerHTML = '<div class="leading-14 text-center size-38 pt-4 pb-4">Oops! There was a problem submitting your form.</div>';
                                            
                                                // elm.classList.toggle('collapsed');
                                                setTimeout(function(){
                                                    // statusInfo.innerHTML = data.error;
                                                    statusInfo.classList.remove('collapsed');
                                                },300);
                                            }

                                            btnSend.innerHTML = 'Submit';
                                        });
                                    }

                                    form.addEventListener('submit', handleSubmit);
                            
                                });
                                </script>					
                                
                                `)}

                            " data-settings="

                                ${encodeURIComponent(`
                                {
                                    "json": {
                                        "title": "Contact",
                                        "description": "Description here.",
                                        "elements": [
                                            {
                                                "title": "Name:",
                                                "name": "name",
                                                "type": "short-text",
                                                "fieldNote": "",
                                                "isRequired": true,
                                                "placeholder": "Enter your name.",
                                                "value": ""
                                            },
                                            {
                                                "title": "Email:",
                                                "name": "email",
                                                "type": "email",
                                                "fieldNote": "",
                                                "isRequired": true,
                                                "placeholder": "Enter your email."
                                            },
                                            {
                                                "title": "Message:",
                                                "name": "message",
                                                "type": "long-text",
                                                "fieldNote": "",
                                                "isRequired": true,
                                                "placeholder": "Enter your message.",
                                                "value": "",
                                                "height": ""
                                            }
                                        ],
                                        "submitText": "Send",
                                        "resetText": "Reset",
                                        "hideReset": true,
                                        "fullWidthButton": true,
                                        "hideHeader": true,
                                        "useSubmitButton": true
                                    },
                                    "thankYouMessage": "Thanks for your submission!",
                                    "errorMessage": "Oops! There was a problem submitting your form.",
                                    "buttonText": "Submit",
                                    "hideHeader": false,
                                    "formAction": "/formsubmission",
                                    "jsonTheme": {
                                        "cssVariables": {
                                            "--form-text-color": "",
                                            "--form-primary-color": "rgb(59, 130, 246)",
                                            "--form-title-color": "",
                                            "--form-desc-color": "",
                                            "--form-label-color": "",
                                            "--form-label-font-size": "1rem",
                                            "--form-input-font-size": "1rem",
                                            "--form-input-border-color": "",
                                            "--form-primary-border-width": "1px",
                                            "--form-secondary-border-width": "2px",
                                            "--form-input-background-color": "",
                                            "--form-input-text-color": "",
                                            "--form-input-placeholder-color": "",
                                            "--form-choice-border-color": "",
                                            "--form-switch-background-color": "",
                                            "--form-switch-knob-color": "",
                                            "--form-switch-focus-offset-color": "",
                                            "--form-dropfile-border-color": "rgb(194, 194, 194)",
                                            "--form-dropfile-hover-color": "",
                                            "--form-button-background-color": "rgb(239, 239, 239)",
                                            "--form-button-hover-background-color": "rgb(235, 235, 235)",
                                            "--form-button-text-color": "rgb(0, 0, 0)",
                                            "--form-button-hover-text-color": "rgb(0, 0, 0)",
                                            "--form-button-border-width": "1px",
                                            "--form-button-border-color": "",
                                            "--form-button-hover-border-color": "",
                                            "--form-reset-background-color": "",
                                            "--form-reset-hover-background-color": "",
                                            "--form-reset-text-color": "",
                                            "--form-reset-hover-text-color": "",
                                            "--form-reset-border-width": "1px",
                                            "--form-reset-border-color": "",
                                            "--form-reset-hover-border-color": ""
                                        }
                                    }
                                }

                            `)}
                            
                            " style="--form-primary-color: rgb(59, 130, 246); --form-label-font-size: 1rem; --form-input-font-size: 1rem; --form-primary-border-width: 1px; --form-secondary-border-width: 2px; --form-dropfile-border-color: rgb(194, 194, 194); --form-button-border-width: 1px; --form-reset-border-width: 1px; --form-button-background-color: rgb(239, 239, 239); --form-button-hover-background-color: rgb(232, 232, 232); --form-button-text-color: rgb(0, 0, 0); --form-button-hover-text-color: rgb(0, 0, 0);">
                    <div id="_style_Smj5zbX" style="display:none">
                        #Smj5zbX {
                        transition: all 0.3s ease-out;
                        height: auto;
                        }
                        #Smj5zbX.collapsed {
                        overflow: hidden;
                        height: 0;
                        }
                        #status_Smj5zbX {
                        transition: all 0.3s ease-out;
                        height: auto;
                        }
                        #status_Smj5zbX.collapsed {
                        overflow: hidden;
                        height: 0;
                        }

                        .tool-container {
                        max-width: 500px;
                        }
                    </div>
                    <div class="tool-container">
                        <form id="form_Smj5zbX" method="POST" action="/formsubmission" style="padding: 25px 0 20px">
                            <div id="Smj5zbX"></div>

                            <div id="status_Smj5zbX" class="collapsed"></div>
                        </form>
                        <div class="result_Smj5zbX"></div>
                    </div>

                    <script>
                        var css = document.querySelector('#_style_Smj5zbX').innerHTML;
                        var head = document.getElementsByTagName('head')[0];
                        var s = document.createElement('style');
                        s.appendChild(document.createTextNode(css));
                        head.appendChild(s);

                        var docReady = function(fn) {
                            var stateCheck = setInterval(function() {
                                if (document.readyState !== "complete") return;
                                clearInterval(stateCheck);
                                fn()
                            }, 1);
                        };
                        var loadScriptByURL = function(id, url, callback) {
                            var isScriptExist = document.getElementById(id);
                            if (!isScriptExist) {
                                var script = document.createElement("script");
                                script.type = "text/javascript";
                                script.src = url;
                                script.id = id;
                                script.onload = function() {
                                    if (callback) callback();
                                };
                                document.body.appendChild(script);
                            }
                            if (isScriptExist && callback) callback();
                        }
                        docReady(function() {

                            var elm = document.getElementById('Smj5zbX');
                            var form = document.querySelector('#form_Smj5zbX');

                            var reChaptchaSiteKey = '';

                            var viewer = new FormViewer(elm, {
                                resultSelector: '.result_Smj5zbX',

                                model: 'gpt-4o-mini',
                                model2: 'gpt-4o-mini',
                                sendCommandUrl: '/sendcommand',
                                sendCommandStreamUrl: '',

                                // Upload Endpoints
                                uploadMediaUrl_Fal: '',
                                uploadBase64Url_Fal: '',

                                // Fal Integration Endpoints:
                                generateMediaUrl_Fal: '',
                                checkRequestStatusUrl_Fal: '',
                                getResultUrl_Fal: '',

                                // Optimization & Cleanup Endpoints:
                                minimizeImageUrl: '',
                                cleanup: '',

                                generateMediaUrl_OpenAI_CreateImage: '',
                                generateMediaUrl_OpenAI_CreateImageEdit: '',

                                captchaContainer: reChaptchaSiteKey ? true : false,
                                captchaContainerClassName: 'captchaWidget'
                            });

                            var json = {
                                "title": "Contact",
                                "description": "Description here.",
                                "elements": [
                                    {
                                        "title": "Name:",
                                        "name": "name",
                                        "type": "short-text",
                                        "fieldNote": "",
                                        "isRequired": true,
                                        "placeholder": "Enter your name.",
                                        "value": ""
                                    },
                                    {
                                        "title": "Email:",
                                        "name": "email",
                                        "type": "email",
                                        "fieldNote": "",
                                        "isRequired": true,
                                        "placeholder": "Enter your email."
                                    },
                                    {
                                        "title": "Message:",
                                        "name": "message",
                                        "type": "long-text",
                                        "fieldNote": "",
                                        "isRequired": true,
                                        "placeholder": "Enter your message.",
                                        "value": "",
                                        "height": ""
                                    }
                                ],
                                "submitText": "Send",
                                "resetText": "Reset",
                                "hideReset": true,
                                "fullWidthButton": true,
                                "hideHeader": true,
                                "useSubmitButton": true
                            },
                                "thankYouMessage": "Thanks for your submission!",
                                "errorMessage": "Oops! There was a problem submitting your form.",
                                "buttonText": "Submit",
                                "hideHeader": false,
                                "formAction": "/formsubmission"
                            };
                            
                            var jsonTheme = {
                                "cssVariables": {
                                    "--form-text-color": "",
                                    "--form-primary-color": "rgb(59, 130, 246)",
                                    "--form-title-color": "",
                                    "--form-desc-color": "",
                                    "--form-label-color": "",
                                    "--form-label-font-size": "1rem",
                                    "--form-input-font-size": "1rem",
                                    "--form-input-border-color": "",
                                    "--form-primary-border-width": "1px",
                                    "--form-secondary-border-width": "2px",
                                    "--form-input-background-color": "",
                                    "--form-input-text-color": "",
                                    "--form-input-placeholder-color": "",
                                    "--form-choice-border-color": "",
                                    "--form-switch-background-color": "",
                                    "--form-switch-knob-color": "",
                                    "--form-switch-focus-offset-color": "",
                                    "--form-dropfile-border-color": "rgb(194, 194, 194)",
                                    "--form-dropfile-hover-color": "",
                                    "--form-button-background-color": "rgb(239, 239, 239)",
                                    "--form-button-hover-background-color": "rgb(235, 235, 235)",
                                    "--form-button-text-color": "rgb(0, 0, 0)",
                                    "--form-button-hover-text-color": "rgb(0, 0, 0)",
                                    "--form-button-border-width": "1px",
                                    "--form-button-border-color": "",
                                    "--form-button-hover-border-color": "",
                                    "--form-reset-background-color": "",
                                    "--form-reset-hover-background-color": "",
                                    "--form-reset-text-color": "",
                                    "--form-reset-hover-text-color": "",
                                    "--form-reset-border-width": "1px",
                                    "--form-reset-border-color": "",
                                    "--form-reset-hover-border-color": ""
                                }
                            };
                            var jsonWorkflow = {
                                "steps": []
                            };

                            viewer.setTheme(JSON.stringify(jsonTheme), form); // Apply theme
                            viewer.view(JSON.stringify(json)); // Render form
                            viewer.loadWorkflow(JSON.stringify(jsonWorkflow));

                            var statusInfo = document.querySelector('#status_Smj5zbX');

                            var captchaWidgetSmj5zbX;
                            if (reChaptchaSiteKey) {
                                loadScriptByURL('recaptcha-key', 'https://www.google.com/recaptcha/api.js', function() {
                                    const interval = setInterval(() => {
                                        if (window.grecaptcha) {
                                            clearInterval(interval);
                                            captchaWidgetSmj5zbX = grecaptcha.render(form.querySelector('.captchaWidget'), {
                                                'sitekey': reChaptchaSiteKey
                                            });
                                        }
                                    }, 100); // Poll every 100ms to ensure grecaptcha is ready
                                });
                            }

                            async function handleSubmit(event) {
                                event.preventDefault();

                                if (reChaptchaSiteKey) {
                                    var token = grecaptcha.getResponse(captchaWidgetSmj5zbX);
                                    if (!token) return false;
                                }

                                var btnSend = form.querySelector('.btn-submitform');

                                btnSend.innerHTML = '<span class="loading-icon"><svg class="animate-spin" style="margin-right:7px;width:20px;height:20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>Let’s Go!';

                                var data = new FormData(form);

                                // for (var pair of data.entries()) {
                                //     console.log(pair[0] + ': ' + pair[1]);
                                // }

                                fetch(form.action, {
                                        method: form.method,
                                        body: data,
                                        headers: {
                                            'Accept': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (!data.error) {
                                            statusInfo.innerHTML = '<div class="text-center pt-4 pb-4"><i class="bi bi-send-check size-64"></i>' +
                                                '</div><div class="leading-14 text-center size-38 pb-4">Thanks for your submission!</div>';
                                            form.reset();

                                            elm.classList.add('collapsed');
                                            setTimeout(function() {
                                                statusInfo.classList.remove('collapsed');
                                            }, 300);

                                        } else {
                                            statusInfo.innerHTML = '<div class="leading-14 text-center size-38 pt-4 pb-4">Oops! There was a problem submitting your form.</div>';

                                            // elm.classList.toggle('collapsed');
                                            setTimeout(function() {
                                                // statusInfo.innerHTML = data.error;
                                                statusInfo.classList.remove('collapsed');
                                            }, 300);
                                        }

                                        if (reChaptchaSiteKey) {
                                            grecaptcha.reset(captchaWidgetSmj5zbX); // Reset reCAPTCHA widget
                                        }

                                        btnSend.innerHTML = 'Let’s Go!';
                                    });
                            }

                            function handleSubmitStandard(event) {
                                event.preventDefault();

                                if (reChaptchaSiteKey) {
                                    var token = grecaptcha.getResponse(captchaWidgetSmj5zbX);
                                    if (!token) return false;
                                }

                                event.target.submit();
                            }

                            var submissionType = '';
                            if (submissionType === 'standard') {
                                form.enctype = "multipart/form-data";
                                form.addEventListener('submit', handleSubmitStandard);
                            } else {
                                form.addEventListener('submit', handleSubmit);
                            }
                            // viewer.settings.onSubmit = handleSubmit;
                        });
                    </script>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/contact-08.png',
			'category': '12',
			'html': `
<div class="is-section type-system-ui is-box is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pt-11 pb-11 size-16 leading-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-4 border-b" style="border-color: #f0f0f0;">
                    <p class="uppercase size-12 tracking-150 text-gray-400 font-medium">02. Locations</p>
                    <p class="size-14 text-gray-400">Global Presence</p>
                </div>
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 21/9;">
                    <img src="[%IMAGE_PATH%]images/ai-Dv3Cv.jpg" alt="Our Studio" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 33%; flex: 0 0 auto;">
                <div class="pb-4 border-b" style="border-color: #f0f0f0;">
                    <h3 class="size-24 font-normal text-black pb-2">New York</h3>
                    <p class="size-14 text-gray-600 uppercase tracking-150">Headquarters</p>
                </div>
                <div class="spacer height-20"></div>
                <p class="size-16 leading-17 text-gray-600 pb-4">
                    123 Innovation Drive, Suite 400<br>
                    New York, NY 10012
                </p>
                <div class="flex items-center pb-2">
                    <i class="bi bi-clock text-gray-600 size-14 pr-2" style="margin-right: 8px;"></i>
                    <p class="size-14 text-gray-600">Mon-Fri: 9am — 6pm</p>
                </div>
                <div class="flex items-center">
                    <i class="bi bi-telephone text-gray-600 size-14 pr-2" style="margin-right: 8px;"></i>
                    <p class="size-14 text-gray-600">+1 (234) 567-899</p>
                </div>
            </div>

            <div class="column" style="width: 33%; flex: 0 0 auto;">
                <div class="pb-4 border-b" style="border-color: #f0f0f0;">
                    <h3 class="size-24 font-normal text-black pb-2">London</h3>
                    <p class="size-14 text-gray-600 uppercase tracking-150">Creative Hub</p>
                </div>
                <div class="spacer height-20"></div>
                <p class="size-16 leading-17 text-gray-600 pb-4">123 Example Street
                    <br>Design City, DC 12345
                </p>
                <div class="flex items-center pb-2">
                    <i class="bi bi-clock text-gray-600 size-14 pr-2" style="margin-right: 8px;"></i>
                    <p class="size-14 text-gray-600">Mon-Fri: 9am — 6pm</p>
                </div>
                <div class="flex items-center">
                    <i class="bi bi-telephone text-gray-600 size-14 pr-2" style="margin-right: 8px;"></i>
                    <p class="size-14 text-gray-600">+1 (234) 567-899</p>
                </div>
            </div>

            <div class="column">
                <div class="pb-4 border-b" style="border-color: #f0f0f0;">
                    <h3 class="size-24 font-normal text-black pb-2">Social</h3>
                    <p class="size-14 text-gray-400 uppercase tracking-150">Follow Us</p>
                </div>
                <div class="spacer height-20"></div>

                <p class="py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition" style="border: #f3f4f6 solid 1px;">
                    <a href="https://instagram.com" class="size-16 text-black no-underline flex-grow">Instagram</a>
                    <i class="bi bi-arrow-up-right size-12 text-gray-400"></i>
                </p>
                <p class="py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition" style="border: #f3f4f6 solid 1px;">
                    <a href="https://twitter.com" class="size-16 text-black no-underline flex-grow">Twitter / X</a>
                    <i class="bi bi-arrow-up-right size-12 text-gray-400"></i>
                </p>
                <p class="py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition" style="border: #f3f4f6 solid 1px;">
                    <a href="https://linkedin.com" class="size-16 text-black no-underline flex-grow">LinkedIn</a>
                    <i class="bi bi-arrow-up-right size-12 text-gray-400"></i>
                </p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/contact-09.png',
			'category': '12',
			'html': `
<div class="is-section is-box is-dark-text type-poppins is-section-75 box-space box-autofit min-height-60">
    <div class="is-overlay" style="z-index: 1;">
            <div class="is-overlay-content">
                <div data-cb-type="map-embed" data-cb-location="Eiffel Tower, Paris, France" data-cb-zoom="14" data-cb-map-type="road" data-cb-size-mode="fill">
                    <div class="map-embed-frame"></div>
                </div>
            </div>
    </div>
</div>
<div class="is-section is-box is-dark-text box-autofit is-section-25 type-system-ui">
    <div class="is-overlay" style="background-color: rgb(255, 255, 255);"></div>
    <div class="is-container is-content-1200 v2 size-16 leading-13">
        <div class="row">
            <div class="column center flex justify-center flex-col items-center">
                <h2 class="size-21 tracking-wider">Company Name</h2>
            </div>
            <div class="column center flex justify-center flex-col items-center">
                <p style="color: rgb(109, 109, 109);" class="text-left leading-14">12345 Street Name, City. State 12345
                    <br>P: (123) 456 7890 / 456 7891.
                </p>
            </div>
            <div class="column center flex justify-center flex-col items-center">
                <div class="flex items-center" style="gap: 16px;">
                    <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">Instagram</a>
                    <span class="text-gray-300">·</span>
                    <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">LinkedIn</a>
                    <span class="text-gray-300">·</span>
                    <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">Twitter / X</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/contact-10.png',
			'category': '12',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay"></div>
        <div class="is-container is-content-480 size-17 leading-17 v3 is-content-left edge-x-2">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400">Contact</p>

                    <h1 class="font-light text-black leading-11 size-68 pb-2">Let's connect.</h1>

                    <p class="size-17 leading-17 text-gray-600">
                        We're always interested in hearing about new projects. Drop us a line and let's create something remarkable together.
                    </p>

                    <div class="pt-2 pb-2" style="border-bottom: 1px solid #e5e5e5;">
                        <p class="size-11 uppercase tracking-150 text-gray-400 size-15">Email</p>
                        <p><a href="mailto:hello@studio.com" class="size-20 text-black no-underline hover-underline-animation">hello@example.com</a></p>
                    </div>

                    <div class="pt-2 pb-2" style="border-bottom: 1px solid #e5e5e5;">
                        <p class="size-11 uppercase tracking-150 text-gray-400 size-15">Phone</p>
                        <p class="size-20 text-black">+1 (555) 123-4567</p>
                    </div>

                    <div class="pt-2">
                        <p class="size-11 uppercase tracking-150 text-gray-400 pb-3 size-15">Location</p>
                        <p class="size-16 text-gray-700 leading-16 pb-8">
                            245 Design Avenue, Floor 12<br>
                            New York, NY 10013
                        </p>
                    </div>

                    <div class="flex items-center" style="gap: 16px;">
                        <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">Instagram</a>
                        <span class="text-gray-300">·</span>
                        <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">LinkedIn</a>
                        <span class="text-gray-300">·</span>
                        <a href="#" class="size-14 text-gray-500 no-underline hover:text-black transition-colors">Twitter / X</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-7">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-C3F7U.jpg&quot;); background-position: 50% 50%;"></div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/contact-11.png',
			'category': '12',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-center pb-6" style="border-bottom: 1px solid #e0e0e0;">
                    <p class="size-12 uppercase tracking-150 text-gray-500">Contact</p>
                    <p class="size-12 text-gray-500">Available for new projects</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <p class="size-18 text-gray-600 pb-6">Have a project in mind?</p>
                <a href="mailto:hello@designstudio.com" class="hover-underline-animation cursor-pointer no-underline">
                    <span class="size-84 font-light leading-12">hello@example.com</span>
                </a>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
            </div>
        </div>

        <div class="row" style="gap: 60px;">
            <div class="column">
                <p class="size-11 uppercase tracking-150 text-gray-400 pb-4">New Business</p>
                <p class="size-16 text-black pb-2">projects@example.com</p>
                <p class="size-14 text-gray-500">+1 (555) 123-4567</p>
            </div>
            <div class="column">
                <p class="size-11 uppercase tracking-150 text-gray-400 pb-4">Press &amp; Media</p>
                <p class="size-16 text-black pb-2">press@example.com</p>
                <p class="size-14 text-gray-500">+1 (555) 123-4567</p>
            </div>
            <div class="column">
                <p class="size-11 uppercase tracking-150 text-gray-400 pb-4">Careers</p>
                <p class="size-16 text-black pb-2">jobs@example.com</p>
                <p class="size-14 text-gray-500">We're hiring!</p>
            </div>
            <div class="column">
                <p class="size-11 uppercase tracking-150 text-gray-400 pb-4">Headquarters</p>
                <p class="size-16 text-black leading-16">123 Example Street
                    Design City, DC 12345</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="flex items-center pt-6" style="border-top: 1px solid #e0e0e0; gap: 32px;">
                    <a href="#" class="size-13 uppercase tracking-150 text-gray-500 no-underline hover:text-black transition-colors">Instagram</a>
                    <a href="#" class="size-13 uppercase tracking-150 text-gray-500 no-underline hover:text-black transition-colors">Behance</a>
                    <a href="#" class="size-13 uppercase tracking-150 text-gray-500 no-underline hover:text-black transition-colors">Dribbble</a>
                    <a href="#" class="size-13 uppercase tracking-150 text-gray-500 no-underline hover:text-black transition-colors">LinkedIn</a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .hover-underline-animation {
        display: inline-block;
        position: relative;
    }

    .hover-underline-animation::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #000000;
        transform-origin: bottom right;
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .hover-underline-animation:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
</style>
`
		},

		{
			'thumbnail': 'preview/contact-12.png',
			'category': '12',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box box-autofit is-box-6">
        <div class="is-overlay">
        </div>
        <div class="is-container v2 size-16 leading-13 is-content-500 v3 is-content-right edge-x-2">
            <div class="row">
                <div style="min-height: 143.892px;" class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-6">Get Started</p>
                    <h2 class="size-42 font-light leading-13 text-black pb-6">Ready to bring your vision to life?</h2>
                    <p class="size-16 leading-17 text-gray-600 pb-10">
                        Tell us about your project and we'll get back to you within 24 hours with a personalized response.
                    </p>

                    <div class="spacer height-20"></div>

                    <div class="pb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="flex justify-between items-center">
                            <p class="size-13 text-gray-500">Response time</p>
                            <p class="size-13 text-black font-medium">Within 24 hours</p>
                        </div>
                    </div>

                    <div class="pb-6 pt-6" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="flex justify-between items-center">
                            <p class="size-13 text-gray-500">Minimum budget</p>
                            <p class="size-13 text-black font-medium">$10,000</p>
                        </div>
                    </div>

                    <div class="pt-6 pb-6" style="border-bottom: 1px solid #f0f0f0;">
                        <div class="flex justify-between items-center">
                            <p class="size-13 text-gray-500">Availability</p>
                            <p class="size-13 text-black font-medium">Q2 2026</p>
                        </div>
                    </div>

                    <div class="spacer height-40"></div>

                    <div class="p-8 box-border" style="background-color: #fafafa;">
                        <p class="size-14 text-gray-600 leading-16 pb-4">"Working with this team was an absolute pleasure. They delivered beyond our expectations."</p>
                        <div class="flex items-center" style="gap: 12px;">
                            <div class="w-1/4 rounded-full overflow-hidden bg-gray-200" style="aspect-ratio: 1 / 1;">
                                <img src="[%IMAGE_PATH%]images/ai-FhJeD-editapwdgHV.jpg" alt="Client" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <p class="size-13 font-medium text-black">Vincent Nelson</p>
                                <p class="size-12 text-gray-500">CEO, The Studio</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="is-box is-dark-text is-box-7 box-autofit">
        <div class="is-overlay"></div>
        <div class="is-container v2 size-16 leading-13 is-content-500 v3 is-content-left edge-x-2">

            <div class="row">
                <div class="column flex flex-col items-center" data-noedit="" data-dialog-width="1600px" data-dialog-height="85vh" data-module="form-builder" data-module-desc="Form Builder" data-html="

                                ${encodeURIComponent(`
                                <div id="_style_{id}" style="display:none">
                                    #{id} {
                                        transition: all 0.3s ease-out;
                                        height: auto;
                                    }
                                    #{id}.collapsed {
                                        overflow: hidden;
                                        height: 0;
                                    }
                                    #status_{id} {
                                        transition: all 0.3s ease-out;
                                        height: auto;
                                    }
                                    #status_{id}.collapsed {
                                        overflow: hidden;
                                        height: 0;
                                    }
                                </div>
                                <form id="form_{id}" method="POST" action="/formsubmission" style="padding: 25px 0 20px">
                                    <div id="{id}"></div>

                                    <div id="status_{id}" class="collapsed"></div>
                                </form>
                                
                                <script>
                                var css = document.querySelector('#_style_{id}').innerHTML;
                                var head = document.getElementsByTagName('head')[0];
                                var s = document.createElement('style');
                                s.appendChild(document.createTextNode(css));
                                head.appendChild(s);
                                
                                var docReady = function(fn) {
                                    var stateCheck = setInterval(function() {
                                        if (document.readyState !== "complete") return;
                                        clearInterval(stateCheck);
                                        try {
                                            fn()
                                        } catch (e) {}
                                    }, 1);
                                };
                    
                                docReady(function() {
                        
                                    var elm = document.getElementById('{id}');
                                    var viewer = new FormViewer(elm);

                                    let json = {
                                        "title": "Contact",
                                        "description": "Description here.",
                                        "elements": [{
                                            "title": "Your name",
                                            "name": "your_name",
                                            "type": "short-text",
                                            "fieldNote": "",
                                            "isRequired": true,
                                            "placeholder": "Enter your name.",
                                            "value": ""
                                        }, {
                                            "title": "Email address:",
                                            "name": "email_address",
                                            "type": "email",
                                            "fieldNote": "",
                                            "isRequired": true,
                                            "placeholder": "Enter your email address."
                                        }, {
                                            "title": "Company name:",
                                            "name": "company_name",
                                            "type": "short-text",
                                            "fieldNote": "",
                                            "isRequired": false,
                                            "placeholder": "Enter your company name.",
                                            "value": ""
                                        }, {
                                            "title": "Project type:",
                                            "name": "project_type",
                                            "type": "dropdown",
                                            "fieldNote": "",
                                            "isRequired": true,
                                            "placeholder": "Select..",
                                            "choices": ["Branding & Identity", "App Development", "Web Development"],
                                            "choicesText": ["", "", ""],
                                            "showOtherItem": true,
                                            "otherText": "Other (describe)",
                                            "selected": 0
                                        }, {
                                            "title": "Message:",
                                            "name": "message",
                                            "type": "long-text",
                                            "fieldNote": "",
                                            "isRequired": true,
                                            "placeholder": "Tell us about your project.",
                                            "value": "",
                                            "height": ""
                                        }],
                                        "submitText": "Send Message",
                                        "resetText": "Reset",
                                        "hideReset": true,
                                        "fullWidthButton": true,
                                        "hideHeader": true,
                                        "useSubmitButton": true
                                    };
                                    
                                    let jsonTheme = {
                                        "cssVariables": {
                                            "--form-text-color": "",
                                            "--form-primary-color": "rgb(59, 130, 246)",
                                            "--form-title-color": "",
                                            "--form-desc-color": "",
                                            "--form-label-color": "",
                                            "--form-label-font-size": "1rem",
                                            "--form-input-font-size": "1rem",
                                            "--form-input-border-color": "",
                                            "--form-primary-border-width": "1px",
                                            "--form-secondary-border-width": "2px",
                                            "--form-input-background-color": "",
                                            "--form-input-text-color": "",
                                            "--form-input-placeholder-color": "",
                                            "--form-choice-border-color": "",
                                            "--form-switch-background-color": "",
                                            "--form-switch-knob-color": "",
                                            "--form-switch-focus-offset-color": "",
                                            "--form-dropfile-border-color": "rgb(194, 194, 194)",
                                            "--form-dropfile-hover-color": "",
                                            "--form-button-background-color": "rgb(0, 0, 0)",
                                            "--form-button-hover-background-color": "rgb(65, 65, 65)",
                                            "--form-button-text-color": "rgb(255, 255, 255)",
                                            "--form-button-hover-text-color": "rgb(255, 255, 255)",
                                            "--form-button-border-width": "1px",
                                            "--form-button-border-color": "",
                                            "--form-button-hover-border-color": "",
                                            "--form-reset-background-color": "",
                                            "--form-reset-hover-background-color": "",
                                            "--form-reset-text-color": "",
                                            "--form-reset-hover-text-color": "",
                                            "--form-reset-border-width": "1px",
                                            "--form-reset-border-color": "",
                                            "--form-reset-hover-border-color": ""
                                        }
                                    };
                                    
                                    viewer.setTheme(JSON.stringify(jsonTheme), form); // Apply theme
                                    const initialFormData = JSON.stringify(json);
                                    viewer.view(initialFormData); 


                                    var statusInfo = document.querySelector('#status_{id}');

                                    var form = document.querySelector('#form_{id}');

                                    async function handleSubmit(event) {
                                        event.preventDefault();

                                        var btnSend = form.querySelector('.btn-submitform');
                                        
                                        btnSend.innerHTML = '<span class="loading-icon"><svg class="animate-spin" style="margin-right:7px;width:20px;height:20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>Submit';

                                        var data = new FormData(form);

                                        fetch(form.action, {
                                            method: form.method,
                                            body: data,
                                            headers: {
                                                'Accept': 'application/json'
                                            }
                                        })
                                        .then(response=>response.json())
                                        .then(data=>{
                                            if(!data.error) {
                                                statusInfo.innerHTML = '<div class="text-center pt-4 pb-4"><i class="bi bi-send-check size-64"></i>' +
                                                '</div><div class="leading-14 text-center size-38 pb-4">Thanks for your submission!</div>';
                                                form.reset();

                                                elm.classList.add('collapsed');
                                                setTimeout(function(){
                                                    statusInfo.classList.remove('collapsed');
                                                },300);

                                            } else {
                                                statusInfo.innerHTML = '<div class="leading-14 text-center size-38 pt-4 pb-4">Oops! There was a problem submitting your form.</div>';
                                            
                                                // elm.classList.toggle('collapsed');
                                                setTimeout(function(){
                                                    // statusInfo.innerHTML = data.error;
                                                    statusInfo.classList.remove('collapsed');
                                                },300);
                                            }

                                            btnSend.innerHTML = 'Submit';
                                        });
                                    }

                                    form.addEventListener('submit', handleSubmit);
                            
                                });
                                </script>					
                                
                                `)}

                            " data-settings="

                                ${encodeURIComponent(`
                                {
                                    "json": {
                                        "title": "Contact",
                                        "description": "Description here.",
                                        "elements": [{
                                            "title": "Your name",
                                            "name": "your_name",
                                            "type": "short-text",
                                            "fieldNote": "",
                                            "isRequired": true,
                                            "placeholder": "Enter your name.",
                                            "value": ""
                                        }, {
                                            "title": "Email address:",
                                            "name": "email_address",
                                            "type": "email",
                                            "fieldNote": "",
                                            "isRequired": true,
                                            "placeholder": "Enter your email address."
                                        }, {
                                            "title": "Company name:",
                                            "name": "company_name",
                                            "type": "short-text",
                                            "fieldNote": "",
                                            "isRequired": false,
                                            "placeholder": "Enter your company name.",
                                            "value": ""
                                        }, {
                                            "title": "Project type:",
                                            "name": "project_type",
                                            "type": "dropdown",
                                            "fieldNote": "",
                                            "isRequired": true,
                                            "placeholder": "Select..",
                                            "choices": ["Branding & Identity", "App Development", "Web Development"],
                                            "choicesText": ["", "", ""],
                                            "showOtherItem": true,
                                            "otherText": "Other (describe)",
                                            "selected": 0
                                        }, {
                                            "title": "Message:",
                                            "name": "message",
                                            "type": "long-text",
                                            "fieldNote": "",
                                            "isRequired": true,
                                            "placeholder": "Tell us about your project.",
                                            "value": "",
                                            "height": ""
                                        }],
                                        "submitText": "Send Message",
                                        "resetText": "Reset",
                                        "hideReset": true,
                                        "fullWidthButton": true,
                                        "hideHeader": true,
                                        "useSubmitButton": true
                                    },
                                    "thankYouMessage": "Thanks for your submission!",
                                    "errorMessage": "Oops! There was a problem submitting your form.",
                                    "buttonText": "Submit",
                                    "hideHeader": false,
                                    "formAction": "/formsubmission",
                                    "jsonTheme": {
                                        "cssVariables": {
                                            "--form-text-color": "",
                                            "--form-primary-color": "rgb(59, 130, 246)",
                                            "--form-title-color": "",
                                            "--form-desc-color": "",
                                            "--form-label-color": "",
                                            "--form-label-font-size": "1rem",
                                            "--form-input-font-size": "1rem",
                                            "--form-input-border-color": "",
                                            "--form-primary-border-width": "1px",
                                            "--form-secondary-border-width": "2px",
                                            "--form-input-background-color": "",
                                            "--form-input-text-color": "",
                                            "--form-input-placeholder-color": "",
                                            "--form-choice-border-color": "",
                                            "--form-switch-background-color": "",
                                            "--form-switch-knob-color": "",
                                            "--form-switch-focus-offset-color": "",
                                            "--form-dropfile-border-color": "rgb(194, 194, 194)",
                                            "--form-dropfile-hover-color": "",
                                            "--form-button-background-color": "rgb(0, 0, 0)",
                                            "--form-button-hover-background-color": "rgb(65, 65, 65)",
                                            "--form-button-text-color": "rgb(255, 255, 255)",
                                            "--form-button-hover-text-color": "rgb(255, 255, 255)",
                                            "--form-button-border-width": "1px",
                                            "--form-button-border-color": "",
                                            "--form-button-hover-border-color": "",
                                            "--form-reset-background-color": "",
                                            "--form-reset-hover-background-color": "",
                                            "--form-reset-text-color": "",
                                            "--form-reset-hover-text-color": "",
                                            "--form-reset-border-width": "1px",
                                            "--form-reset-border-color": "",
                                            "--form-reset-hover-border-color": ""
                                        }
                                    }
                                }

                            `)}
                            
                            " style="--form-primary-color: rgb(59, 130, 246); --form-label-font-size: 1rem; --form-input-font-size: 1rem; --form-primary-border-width: 1px; --form-secondary-border-width: 2px; --form-dropfile-border-color: rgb(194, 194, 194); --form-button-border-width: 1px; --form-reset-border-width: 1px; --form-button-background-color: rgb(0, 0, 0); --form-button-hover-background-color: rgb(65, 65, 65); --form-button-text-color: rgb(255, 255, 255); --form-button-hover-text-color: rgb(255, 255, 255);">
                    <div id="_style_Smj5zbX" style="display:none">
                        #Smj5zbX {
                        transition: all 0.3s ease-out;
                        height: auto;
                        }
                        #Smj5zbX.collapsed {
                        overflow: hidden;
                        height: 0;
                        }
                        #status_Smj5zbX {
                        transition: all 0.3s ease-out;
                        height: auto;
                        }
                        #status_Smj5zbX.collapsed {
                        overflow: hidden;
                        height: 0;
                        }

                        .tool-container {
                        max-width: 500px;
                        }
                    </div>
                    <div class="tool-container">
                        <form id="form_Smj5zbX" method="POST" action="/formsubmission" style="padding: 25px 0 20px">
                            <div id="Smj5zbX"></div>

                            <div id="status_Smj5zbX" class="collapsed"></div>
                        </form>
                        <div class="result_Smj5zbX"></div>
                    </div>

                    <script>
                        var css = document.querySelector('#_style_Smj5zbX').innerHTML;
                        var head = document.getElementsByTagName('head')[0];
                        var s = document.createElement('style');
                        s.appendChild(document.createTextNode(css));
                        head.appendChild(s);

                        var docReady = function(fn) {
                            var stateCheck = setInterval(function() {
                                if (document.readyState !== "complete") return;
                                clearInterval(stateCheck);
                                fn()
                            }, 1);
                        };
                        var loadScriptByURL = function(id, url, callback) {
                            var isScriptExist = document.getElementById(id);
                            if (!isScriptExist) {
                                var script = document.createElement("script");
                                script.type = "text/javascript";
                                script.src = url;
                                script.id = id;
                                script.onload = function() {
                                    if (callback) callback();
                                };
                                document.body.appendChild(script);
                            }
                            if (isScriptExist && callback) callback();
                        }
                        docReady(function() {

                            var elm = document.getElementById('Smj5zbX');
                            var form = document.querySelector('#form_Smj5zbX');

                            var reChaptchaSiteKey = '';

                            var viewer = new FormViewer(elm, {
                                resultSelector: '.result_Smj5zbX',

                                model: 'gpt-4o-mini',
                                model2: 'gpt-4o-mini',
                                sendCommandUrl: '/sendcommand',
                                sendCommandStreamUrl: '',

                                // Upload Endpoints
                                uploadMediaUrl_Fal: '',
                                uploadBase64Url_Fal: '',

                                // Fal Integration Endpoints:
                                generateMediaUrl_Fal: '',
                                checkRequestStatusUrl_Fal: '',
                                getResultUrl_Fal: '',

                                // Optimization & Cleanup Endpoints:
                                minimizeImageUrl: '',
                                cleanup: '',

                                generateMediaUrl_OpenAI_CreateImage: '',
                                generateMediaUrl_OpenAI_CreateImageEdit: '',

                                captchaContainer: reChaptchaSiteKey ? true : false,
                                captchaContainerClassName: 'captchaWidget'
                            });

                            var json = {
                                "title": "Contact",
                                "description": "Description here.",
                                "elements": [{
                                    "title": "Your name",
                                    "name": "your_name",
                                    "type": "short-text",
                                    "fieldNote": "",
                                    "isRequired": true,
                                    "placeholder": "Enter your name.",
                                    "value": ""
                                }, {
                                    "title": "Email address:",
                                    "name": "email_address",
                                    "type": "email",
                                    "fieldNote": "",
                                    "isRequired": true,
                                    "placeholder": "Enter your email address."
                                }, {
                                    "title": "Company name:",
                                    "name": "company_name",
                                    "type": "short-text",
                                    "fieldNote": "",
                                    "isRequired": false,
                                    "placeholder": "Enter your company name.",
                                    "value": ""
                                }, {
                                    "title": "Project type:",
                                    "name": "project_type",
                                    "type": "dropdown",
                                    "fieldNote": "",
                                    "isRequired": true,
                                    "placeholder": "Select..",
                                    "choices": ["Branding & Identity", "App Development", "Web Development"],
                                    "choicesText": ["", "", ""],
                                    "showOtherItem": true,
                                    "otherText": "Other (describe)",
                                    "selected": 0
                                }, {
                                    "title": "Message:",
                                    "name": "message",
                                    "type": "long-text",
                                    "fieldNote": "",
                                    "isRequired": true,
                                    "placeholder": "Tell us about your project.",
                                    "value": "",
                                    "height": ""
                                }],
                                "submitText": "Send Message",
                                "resetText": "Reset",
                                "hideReset": true,
                                "fullWidthButton": true,
                                "hideHeader": true,
                                "useSubmitButton": true
                            };
                            
                            var jsonTheme = {
                                "cssVariables": {
                                    "--form-text-color": "",
                                    "--form-primary-color": "rgb(59, 130, 246)",
                                    "--form-title-color": "",
                                    "--form-desc-color": "",
                                    "--form-label-color": "",
                                    "--form-label-font-size": "1rem",
                                    "--form-input-font-size": "1rem",
                                    "--form-input-border-color": "",
                                    "--form-primary-border-width": "1px",
                                    "--form-secondary-border-width": "2px",
                                    "--form-input-background-color": "",
                                    "--form-input-text-color": "",
                                    "--form-input-placeholder-color": "",
                                    "--form-choice-border-color": "",
                                    "--form-switch-background-color": "",
                                    "--form-switch-knob-color": "",
                                    "--form-switch-focus-offset-color": "",
                                    "--form-dropfile-border-color": "rgb(194, 194, 194)",
                                    "--form-dropfile-hover-color": "",
                                    "--form-button-background-color": "rgb(0, 0, 0)",
                                    "--form-button-hover-background-color": "rgb(65, 65, 65)",
                                    "--form-button-text-color": "rgb(255, 255, 255)",
                                    "--form-button-hover-text-color": "rgb(255, 255, 255)",
                                    "--form-button-border-width": "1px",
                                    "--form-button-border-color": "",
                                    "--form-button-hover-border-color": "",
                                    "--form-reset-background-color": "",
                                    "--form-reset-hover-background-color": "",
                                    "--form-reset-text-color": "",
                                    "--form-reset-hover-text-color": "",
                                    "--form-reset-border-width": "1px",
                                    "--form-reset-border-color": "",
                                    "--form-reset-hover-border-color": ""
                                }
                            };
                                    
                            var jsonWorkflow = {
                                "steps": []
                            };

                            viewer.setTheme(JSON.stringify(jsonTheme), form); // Apply theme
                            viewer.view(JSON.stringify(json)); // Render form
                            viewer.loadWorkflow(JSON.stringify(jsonWorkflow));

                            var statusInfo = document.querySelector('#status_Smj5zbX');

                            var captchaWidgetSmj5zbX;
                            if (reChaptchaSiteKey) {
                                loadScriptByURL('recaptcha-key', 'https://www.google.com/recaptcha/api.js', function() {
                                    const interval = setInterval(() => {
                                        if (window.grecaptcha) {
                                            clearInterval(interval);
                                            captchaWidgetSmj5zbX = grecaptcha.render(form.querySelector('.captchaWidget'), {
                                                'sitekey': reChaptchaSiteKey
                                            });
                                        }
                                    }, 100); // Poll every 100ms to ensure grecaptcha is ready
                                });
                            }

                            async function handleSubmit(event) {
                                event.preventDefault();

                                if (reChaptchaSiteKey) {
                                    var token = grecaptcha.getResponse(captchaWidgetSmj5zbX);
                                    if (!token) return false;
                                }

                                var btnSend = form.querySelector('.btn-submitform');

                                btnSend.innerHTML = '<span class="loading-icon"><svg class="animate-spin" style="margin-right:7px;width:20px;height:20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>Let’s Go!';

                                var data = new FormData(form);

                                // for (var pair of data.entries()) {
                                //     console.log(pair[0] + ': ' + pair[1]);
                                // }

                                fetch(form.action, {
                                        method: form.method,
                                        body: data,
                                        headers: {
                                            'Accept': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (!data.error) {
                                            statusInfo.innerHTML = '<div class="text-center pt-4 pb-4"><i class="bi bi-send-check size-64"></i>' +
                                                '</div><div class="leading-14 text-center size-38 pb-4">Thanks for your submission!</div>';
                                            form.reset();

                                            elm.classList.add('collapsed');
                                            setTimeout(function() {
                                                statusInfo.classList.remove('collapsed');
                                            }, 300);

                                        } else {
                                            statusInfo.innerHTML = '<div class="leading-14 text-center size-38 pt-4 pb-4">Oops! There was a problem submitting your form.</div>';

                                            // elm.classList.toggle('collapsed');
                                            setTimeout(function() {
                                                // statusInfo.innerHTML = data.error;
                                                statusInfo.classList.remove('collapsed');
                                            }, 300);
                                        }

                                        if (reChaptchaSiteKey) {
                                            grecaptcha.reset(captchaWidgetSmj5zbX); // Reset reCAPTCHA widget
                                        }

                                        btnSend.innerHTML = 'Let’s Go!';
                                    });
                            }

                            function handleSubmitStandard(event) {
                                event.preventDefault();

                                if (reChaptchaSiteKey) {
                                    var token = grecaptcha.getResponse(captchaWidgetSmj5zbX);
                                    if (!token) return false;
                                }

                                event.target.submit();
                            }

                            var submissionType = '';
                            if (submissionType === 'standard') {
                                form.enctype = "multipart/form-data";
                                form.addEventListener('submit', handleSubmitStandard);
                            } else {
                                form.addEventListener('submit', handleSubmit);
                            }
                            // viewer.settings.onSubmit = handleSubmit;
                        });
                    </script>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/contact-13.png',
			'category': '12',
			'html': `
<div class="is-section is-box type-system-ui is-content-left is-section-60">
    <div class="is-container is-content-500 v3">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-600">Contact</p>
                <h2 class="size-48 leading-12 font-medium">Let's create.</h2>
                <p class="font-medium size-24">hello@example.com</p>
            </div>
        </div>
    </div>
</div>
`
		},
        
		/* Footer */
		{
			'thumbnail': 'preview/footer-01.png',
			'category': '14',
			'html': `
<div class="is-section is-box type-system-ui is-section-60">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-100 v3 size-16 leading-15">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-8">Start a Project</p>

                <h2 class="size-96 font-light leading-none">Let's Talk.</h2>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
                <div class="w-full" style="border-top: 1px solid #222;"></div>

            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <p class="size-14 pb-2">London</p>
                <p class="size-14 text-gray-500">123 Oxford Street<br>London, UK</p>
            </div>

            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <p class="size-14 pb-2">New York</p>
                <p class="size-14 text-gray-500">555 Broadway<br>New York, USA</p>
            </div>

            <div class="column flex justify-end items-end">
                <div class="text-right">
                    <p class="size-14 text-gray-600 pb-1">
                        <a href="#" class="text-gray-600 underline-offset-4 inline-block">hello@example.com</a>
                    </p>
                    <p class="size-14 text-gray-600">© 2026 Agency.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/footer-02.png',
			'category': '14',
			'html': `
<div class="is-section is-box type-system-ui is-section-50">
    <div class="is-overlay" style="background-color: #ffffff;"></div>
    <div class="is-container is-content-900 content-py-60 v3 size-16 leading-17">
        <div class="row">
            <div class="column flex flex-col items-center">
                <div class="pb-6">
                    <h2 class="size-24 font-bold tracking-tight text-black m-0">Brand.</h2>
                </div>

                <div class="flex items-center pb-8" style="gap: 32px;">
                    <a href="#" class="size-14 font-medium text-black no-underline hover:text-gray-600 transition-colors">Work</a>
                    <a href="#" class="size-14 font-medium text-black no-underline hover:text-gray-600 transition-colors">Studio</a>
                    <a href="#" class="size-14 font-medium text-black no-underline hover:text-gray-600 transition-colors">Journal</a>
                    <a href="#" class="size-14 font-medium text-black no-underline hover:text-gray-600 transition-colors">Contact</a>
                </div>

                <div class="flex items-center pb-8" style="gap: 24px;">
                    <a href="#" class="text-gray-400 hover:text-black transition-colors"><i class="bi bi-twitter-x size-18"></i></a>
                    <a href="#" class="text-gray-400 hover:text-black transition-colors"><i class="bi bi-instagram size-18"></i></a>
                    <a href="#" class="text-gray-400 hover:text-black transition-colors"><i class="bi bi-linkedin size-18"></i></a>
                </div>

                <p class="size-13 text-gray-400 text-center">© 2026 Brand Inc. All rights reserved.</p>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/footer-05.png',
			'category': '14',
			'html': `
<div class="is-section is-box is-dark-text is-static box-autofit type-system-ui is-section-30">
    <div class="is-overlay" style="background-color: rgb(255, 255, 255);"></div>
    <div class="is-container is-content-1200 v2 size-16 leading-13">
        <div class="row">
            <div class="column center flex justify-center flex-col items-center">
                <h2 class="size-21">Company Name</h2>
            </div>
            <div class="column center flex justify-center flex-col items-center">
                <p class="size-13 text-gray-600">© 2026 Company Name</p>
            </div>
            <div class="column center flex justify-center flex-col items-center">
                <div class="flex justify-end items-center" style="gap: 24px;">
                    <a href="#" class="text-gray-400 hover:text-black transition-colors"><i class="bi bi-instagram size-18"></i></a>
                    <a href="#" class="text-gray-400 hover:text-black transition-colors"><i class="bi bi-twitter-x size-18"></i></a>
                    <a href="#" class="text-gray-400 hover:text-black transition-colors"><i class="bi bi-facebook size-18"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/footer-03.png',
			'category': '14',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-80 v3 size-16 leading-15">
        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <h3 class="size-32 font-light leading-12 pb-6">Let's build something<br>meaningful together.</h3>
                <a href="#" class="size-16 pb-1 underline-offset-4 inline-block">hello@example.com</a>
            </div>

            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-6">Sitemap</p>
                <ul class="list-none p-0 m-0">
                    <li class="pb-3"><a href="#" class="size-15 no-underline">Projects</a></li>
                    <li class="pb-3"><a href="#" class="size-15 no-underline">Agency</a></li>
                    <li class="pb-3"><a href="#" class="size-15 no-underline">Careers</a></li>
                    <li class="pb-3"><a href="#" class="size-15 no-underline">Contact</a></li>
                </ul>
            </div>

            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-6">Social</p>
                <ul class="list-none p-0 m-0">
                    <li class="pb-3"><a href="#" class="size-15 no-underline">Instagram</a></li>
                    <li class="pb-3"><a href="#" class="size-15 no-underline">Twitter / X</a></li>
                    <li class="pb-3"><a href="#" class="size-15 no-underline">LinkedIn</a></li>
                    <li class="pb-3"><a href="#" class="size-15 no-underline">Behance</a></li>
                </ul>
            </div>

            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-6">Office</p>
                <p class="size-15 leading-16 pb-4">
                    123 Example Street<br>
                    Design City, DC 12345
                </p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
                <div class="w-full" style="border-top: 1px solid #222;"></div>
                <div class="spacer height-40"></div>
            </div>
        </div>

        <div class="row">
            <div class="column flex justify-between items-center wrap-mobile">
                <p class="size-14 text-gray-600">© 2026 Brand Inc.</p>
                <div class="flex" style="gap: 24px;">
                    <a href="#" class="size-14 no-underline">Privacy Policy</a>
                    <a href="#" class="size-14 no-underline">Terms of Service</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/footer-04.png',
			'category': '14',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay" style="background-color: #ffffff;"></div>
    <div class="is-container is-content-1200 v3 pt-11 pb-12">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 text-center pb-6">Project Inquiries</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <h2 class="size-72 md:size-96 font-light leading-12 text-center hover-underline-animation cursor-pointer">
                    <a href="mailto:hello@studio.design" class="text-black no-underline" style="font-size: clamp(40px, 8vw, 120px);">hello@example.com</a>
                </h2>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px; border-top: 1px solid #f3f4f6; padding-top: 40px;">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">New Business</p>
                <p class="size-16 text-gray-600 leading-17">
                    Looking for a design partner?<br>
                    Email us your brief.
                </p>
            </div>
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Careers</p>
                <p class="size-16 text-gray-600 leading-17">
                    We are always hiring.<br>
                    <a href="#" class="text-black underline underline-offset-4">View openings</a>
                </p>
            </div>
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Social</p>
                <div class="flex flex-col">
                    <a href="#" class="size-16 text-gray-600 no-underline hover:text-black pb-1">Instagram ↗</a>
                    <a href="#" class="size-16 text-gray-600 no-underline hover:text-black pb-1">LinkedIn ↗</a>
                    <a href="#" class="size-16 text-gray-600 no-underline hover:text-black">Behance ↗</a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .hover-underline-animation {
        display: inline-block;
        position: relative;
    }
    .hover-underline-animation::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #000000;
        transform-origin: bottom right;
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .hover-underline-animation:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
</style>
`
		},


		{
			'thumbnail': 'preview/footer-06.png',
			'category': '14',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-11 pt-11 size-16 leading-16">
        <div class="row">
            <div class="column">
                <p class="size-14 uppercase tracking-150 text-gray-500 pb-6">Work With Us</p>
                <h2 class="size-72 leading-12 font-light text-black pb-8" style="max-width: 800px;">Have a project in mind? Let's build something great.</h2>
                <div class="pb-12">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-8 size-16 leading-16 border-black hover:bg-black hover:text-white border-current hover:border-transparent" style="color: rgb(0, 0, 0);" data-hover-bg="rgb(0, 0, 0)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''" data-bg="">
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>

        <div class="row" style="border-top: 1px solid #e5e5e5; ">
            <div class="column pt-2" style="width: 50%; flex: 0 0 auto;">
                <p class="size-14 text-gray-500">© 2026 Studio Name. Based in San Francisco.</p>
            </div>
            <div class="column flex justify-end items-center pt-2">
                <p class="space-x-3">
                    <a href="#" class="size-14 text-black uppercase tracking-150" style="text-decoration: none;">Instagram</a>
                    <a href="#" class="size-14 text-black uppercase tracking-150" style="text-decoration: none;">Github</a>
                    <a href="#" class="size-14 text-black uppercase tracking-150" style="text-decoration: none;">LinkedIn</a>
                </p>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/footer-07.png',
			'category': '14',
			'html': `
<div class="is-section is-box type-system-ui is-section-60">
    <div class="is-overlay"></div>
    <div class="is-container is-content-760 v3 pt-10 pb-14 size-16 leading-15">
        <div class="row">
            <div class="column text-center">
                <h2 class="size-32 font-medium tracking-tight text-black pb-4">Simplicity is the ultimate sophistication.</h2>
                <div class="spacer height-40"></div>

                <div class="flex justify-center items-center" style="gap: 30px;">
                    <a href="#" class="text-black icon-hover"><i class="bi bi-instagram size-20"></i></a>
                    <a href="#" class="text-black icon-hover"><i class="bi bi-twitter-x size-20"></i></a>
                    <a href="#" class="text-black icon-hover"><i class="bi bi-linkedin size-20"></i></a>
                    <a href="#" class="text-black icon-hover"><i class="bi bi-envelope size-20"></i></a>
                </div>

                <div class="spacer height-40"></div>

                <p class="size-14 text-gray-500 leading-17">
                    1234 Design Street, Creative City, ST 12345<br>
                    <span class="opacity-50">© 2026 Studio Name</span>
                </p>
            </div>
        </div>
    </div>
</div>
`
		},


		{
			'thumbnail': 'preview/footer-08.png',
			'category': '14',
			'html': `
<div class="is-section is-box type-system-ui is-section-60">
    <div class="is-overlay" style="background-color: #ffffff;"></div>
    <div class="is-container is-content-1200 v3 pt-12 pb-12 size-16 leading-16">
        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 35%; flex: 0 0 auto;">
                <div class="pb-8">
                    <img src="https://placehold.co/100x30/ffffff/000000?text=LOGO" alt="Logo" class="pb-6" style="display: block;">
                    <p class="size-16 leading-17 text-gray-600 pr-12">
                        We craft digital experiences for brands with purpose. Based in New York, working globally to define the future of interaction.
                    </p>
                </div>
            </div>

            <div class="column"></div>

            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-black font-semibold pb-6">Company</p>
                <div class="flex flex-col">
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">About</a>
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Careers</a>
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Press</a>
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Contact</a>
                </div>
            </div>
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-black font-semibold pb-6">Services</p>
                <div class="flex flex-col">
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Strategy</a>
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Design</a>
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Development</a>
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Marketing</a>
                </div>
            </div>
            <div class="column" style="width: 15%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-black font-semibold pb-6">Resources</p>
                <div class="flex flex-col">
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Blog</a>
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Newsletter</a>
                    <a href="#" class="size-15 text-gray-600 footer-link pb-3" style="text-decoration: none;">Support</a>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
                <div class="pt-6 flex justify-between items-center" style="border-top: 1px solid #f0f0f0;">
                    <p class="size-13 text-gray-400">© 2026 Brand Name. All rights reserved.</p>
                    <div class="flex" style="gap: 20px;">
                        <a href="#" class="size-13 text-gray-400 footer-link" style="text-decoration: none;">Privacy</a>
                        <a href="#" class="size-13 text-gray-400 footer-link" style="text-decoration: none;">Terms</a>
                        <a href="#" class="size-13 text-gray-400 footer-link" style="text-decoration: none;">Cookies</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
		},


		{
			'thumbnail': 'preview/footer-09.png',
			'category': '14',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay" style="background-color: #ffffff;"></div>
    <div class="is-container is-content-1200 v3 pb-12 size-16 leading-16">
        <div class="row">
            <div class="column pb-8">
                <h2 class="size-96 leading-12 font-light tracking-tight text-black" style="margin-left: -5px;">STUDIO.</h2>
            </div>
        </div>

        <div class="row" style="gap:40px">
            <div class="column" style="border-top: 1px solid rgb(0, 0, 0); padding-top: 24px;">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">01 — Address</p>
                <p class="size-16 leading-16 text-black">
                    123 Design Avenue<br>
                    Building B, Floor 4<br>
                    New York, NY 10012
                </p>
            </div>
            <div class="column" style="border-top: 1px solid #000; padding-top: 24px;">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">02 — Contact</p>
                <p class="size-16 leading-16 text-black pb-2">
                    <a href="mailto:hello@studio.com" class="text-black" style="text-decoration: none;">hello@studio.com</a>
                </p>
                <p class="size-16 leading-16 text-black">+1 (555) 123-4567</p>
            </div>
            <div class="column" style="border-top: 1px solid #000; padding-top: 24px;">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">03 — Social</p>
                <p class="size-16 leading-16 pb-2"><a href="#" class="text-black" style="text-decoration: none;">Instagram ↗</a></p>
                <p class="size-16 leading-16 pb-2"><a href="#" class="text-black" style="text-decoration: none;">Twitter / X ↗</a></p>
                <p class="size-16 leading-16"><a href="#" class="text-black" style="text-decoration: none;">LinkedIn ↗</a></p>
            </div>
            <div class="column" style="border-top: 1px solid #000; padding-top: 24px;">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">04 — Legal</p>
                <p class="size-16 leading-16 pb-2"><a href="#" class="text-gray-600" style="text-decoration: none;">Privacy Policy</a></p>
                <p class="size-16 leading-16"><a href="#" class="text-gray-600" style="text-decoration: none;">Terms of Service</a></p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
                <p class="size-14 text-gray-400">© 2026 Studio Name Inc. All rights reserved.</p>
            </div>
        </div>
    </div>
</div>
`
		},

		/* LANDING */

		{
			'thumbnail': 'preview/item-231a.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container size-18 leading-17 is-content-600 v3">
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-6">Collection 2026</p>
                    <h1 class="size-60 font-normal leading-12 mb-8">Design with room to breathe.</h1>
                    <p class="size-18 text-gray-600 leading-17 mb-12">
                        Minimal form. Emotional depth. We believe great design doesn't shout — it invites. From wall art to furniture, our pieces celebrate quiet beauty and natural tones.
                    </p>

                    <div class="py-4 border-t border-gray-100 flex justify-between items-center">
                        <span class="size-14 uppercase tracking-150 text-gray-500">Material</span>
                        <span class="size-16 text-black">Solid Oak, Linen</span>
                    </div>
                    <div class="py-4 border-t border-gray-100 flex justify-between items-center">
                        <span class="size-14 uppercase tracking-150 text-gray-500">Origin</span>
                        <span class="size-16 text-black">Copenhagen, DK</span>
                    </div>
                    <div class="py-4 border-t border-b border-gray-100 flex justify-between items-center mb-10">
                        <span class="size-14 uppercase tracking-150 text-gray-500">Designer</span>
                        <span class="size-16 text-black">Elena Rostova</span>
                    </div>

                    <div class="flex gap-4">
                        <a href="#" class="underline-offset-4 pb-1 size-15 font-medium hover:text-gray-600 transition-colors">View Collection</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 bg-gray-50">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-GOPR6.jpg'); background-position: center center;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-231b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 size-18 is-content-1600 v3 leading-17">
        <div class="row items-center" style="gap: 60px;">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <div class="pr-8">
                    <p class="size-12 uppercase tracking-150 text-gray-400 mb-6">Philosophy</p>
                    <h2 class="font-light size-60 mb-6 leading-12">Discover new possibilities in space.</h2>
                    <div class="w-12 bg-black mb-8" style="height: 2px;"></div>
                    <p class="size-18 text-gray-600 mb-8">We believe architecture is not just about buildings, but about how people experience space. Our approach combines rigorous analysis with intuitive design to create environments that inspire.</p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 border-transparent hover:border-transparent size-16" style="color: rgb(24, 24, 27); background-color: rgb(240, 240, 241);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(240, 240, 241)" data-hover-bg="rgb(236, 236, 238)">
                            Our Philosophy
                        </a>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:16/9">
                    <img src="[%IMAGE_PATH%]images/ai-lL6tp.jpg" alt="Architectural Detail" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-231c.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-100 v3 pt-11 pb-16 leading-17 size-17">
        <div class="row">
            <div class="column text-center">
                <h2 class="size-48 font-light pb-4">Enterprise Solutions</h2>
                <p class="text-gray-600">Scalable infrastructure for growing businesses.</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="p-10 box-border bg-gray-50">
                    <h3 class="size-24 font-normal pb-4">Cloud Solutions</h3>
                    <p class="text-gray-600 pb-6">Secure, scalable cloud infrastructure migration and management services for enterprise.</p>
                    <a href="#" class="size-14 font-semibold uppercase tracking-150 text-black no-underline flex items-center gap-2 hover:opacity-70 transition-opacity">
                        Learn More <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border bg-gray-50">
                    <h3 class="size-24 font-normal pb-4">Managed IT</h3>
                    <p class="text-gray-600 pb-6">Proactive monitoring and maintenance to ensure your business operations never stop.</p>
                    <a href="#" class="size-14 font-semibold uppercase tracking-150 text-black no-underline flex items-center gap-2 hover:opacity-70 transition-opacity">
                        Learn More <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-30"></div>
            </div>
        </div>
        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="p-10 box-border bg-gray-50">
                    <h3 class="size-24 font-normal pb-4">Network Security</h3>
                    <p class="text-gray-600 pb-6">Comprehensive cybersecurity assessments and implementation to protect your assets.</p>
                    <a href="#" class="size-14 font-semibold uppercase tracking-150 text-black no-underline flex items-center gap-2 hover:opacity-70 transition-opacity">
                        Learn More <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border bg-gray-50">
                    <h3 class="size-24 font-normal pb-4">IT Consulting</h3>
                    <p class="text-gray-600 pb-6">Strategic technology planning to align your IT infrastructure with business goals.</p>
                    <a href="#" class="size-14 font-semibold uppercase tracking-150 text-black no-underline flex items-center gap-2 hover:opacity-70 transition-opacity">
                        Learn More <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-231d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 pb-11 pt-11 leading-17 size-16">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-4" style="border-bottom: 1px solid #e5e5e5;">
                    <p class="size-14 uppercase tracking-widest text-gray-500">01 — Client Stories</p>
                    <p class="size-14 uppercase tracking-widest text-gray-500">Selected Works 2023-2024</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column flex flex-col items-center">
                <div class="w-3/4 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-4643D-editBX7oTCS.jpg" alt="Sarah Jenkins" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <h3 class="size-24 font-normal leading-13 mb-2 text-center">Emma Davis</h3>
                <p class="size-12 uppercase tracking-150 text-gray-400 mb-4 text-center">VP of Design, TechFlow</p>
                <p class="size-16 leading-17 text-gray-600 text-center">"The level of strategic thinking they brought to our rebranding was exceptional. They didn't just design a logo; they defined our future."</p>
            </div>
            <div class="column flex flex-col items-center">
                <div class="w-3/4 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-3DyrB-editYuuh5W8.jpg" alt="David Ross" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <h3 class="size-24 font-normal leading-13 mb-2 text-center">Emilie Petersen</h3>
                <p class="size-12 uppercase tracking-150 text-gray-400 mb-4 text-center">Founder, Arch Studios</p>
                <p class="size-16 leading-17 text-gray-600 text-center">"A masterclass in execution. The team understood our architectural vision and translated it perfectly into the digital space."</p>
            </div>
            <div class="column flex flex-col items-center">
                <div class="w-3/4 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-3A86k-editRvJJp05.jpg" alt="Elena Fisher" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
                <h3 class="size-24 font-normal leading-13 mb-2 text-center">Vincent Nelson</h3>
                <p class="size-12 uppercase tracking-150 text-gray-400 mb-4 text-center">Creative Director, Vogue</p>
                <p class="size-16 leading-17 text-gray-600 text-center">"Rarely do you find a partner who balances aesthetic precision with technical robustness so effortlessly. Highly recommended."</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-231e.png',
			'category': '6',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pt-12 pb-16 size-17 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-72 leading-12 font-light tracking-tight">Common<br>Questions</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="border-top: 1px solid #e5e5e5;">
            <div class="column pt-6 pb-6" style="width: 30%; flex: 0 0 auto;">
                <p class="size-14 uppercase tracking-150 text-gray-400">01. General</p>
            </div>
            <div class="column pt-6 pb-6">
                <h3 class="size-24 font-normal leading-13 pb-4">What services does your agency provide?</h3>
                <p class="leading-17 text-gray-600" style="max-width: 600px;">
                    We specialize in comprehensive digital transformation, including UI/UX design, full-stack web development, and strategic branding. Our team works at the intersection of technology and aesthetics to build robust digital products.
                </p>
            </div>
        </div>

        <div class="row" style="border-top: 1px solid #e5e5e5;">
            <div class="column pt-6 pb-6" style="width: 30%; flex: 0 0 auto;">
                <p class="size-14 uppercase tracking-150 text-gray-400">02. Process</p>
            </div>
            <div class="column pt-6 pb-6">
                <h3 class="size-24 font-normal leading-13 pb-4">How do we begin a collaboration?</h3>
                <p class="leading-17 text-gray-600" style="max-width: 600px;">
                    The process starts with a discovery session where we analyze your goals and technical requirements. Following this, we provide a detailed proposal outlining the scope, timeline, and investment required for your project.
                </p>
            </div>
        </div>

        <div class="row" style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
            <div class="column pt-6 pb-6" style="width: 30%; flex: 0 0 auto;">
                <p class="size-14 uppercase tracking-150 text-gray-400">03. Timeline</p>
            </div>
            <div class="column pt-6 pb-6">
                <h3 class="size-24 font-normal leading-13 pb-4">What is the typical project timeline?</h3>
                <p class="leading-17 text-gray-600" style="max-width: 600px;">
                    Timelines vary by complexity. A standard corporate website typically takes 6-8 weeks, while complex web applications or e-commerce platforms may require 12-16 weeks from concept to launch.
                </p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-231f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-60">
    <div class="is-overlay"></div>
    <div class="is-container v2 pt-10 pb-14 is-content-1400 v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="pb-4 border-b border-gray-200 mb-8" style="border-bottom: 1px solid #e5e5e5;">
                    <p class="uppercase tracking-widest size-12 text-gray-500">01 / Efficiency</p>
                </div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 60%; flex: 0 0 auto;">
                <h2 class="leading-11 font-light text-black size-72">Maximize your<br class="size-72">productivity potential.</h2>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="leading-17 text-gray-600 size-17">
                    We provide the structural framework for high-performance teams. Streamline operations and eliminate redundancy with our award-winning methodology.
                </p>
                <div class="spacer height-20"></div>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 py-3 px-8 font-medium leading-relaxed tracking-wide rounded-full size-15 hover:bg-black hover:text-white hover:border-black" style="color: #000; border-color: #000;">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-230b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 size-18 is-content-1400 v3 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-72 font-light tracking-tight mb-2 leading-12">Essential Elements</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-20"></div>
            </div>
        </div>
        <div class="row">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <p class="size-18 text-gray-600">From conceptual sketches to the final material selection, we curate every detail to ensure a cohesive narrative throughout the built environment.</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:4/3">
                    <img src="[%IMAGE_PATH%]images/ai-Fu4u5-editGssK6wG.jpg" alt="Material Palette" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pt-4">
                    <p class="size-14 uppercase tracking-150 text-gray-500">Materials</p>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:4/3">
                    <img src="[%IMAGE_PATH%]images/ai-zQO8k-editDfDWwBU.jpg" alt="Design Process" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pt-4">
                    <p class="size-14 uppercase tracking-150 text-gray-500">Process</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-230d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pt-11 pb-16 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="pb-4" style="border-bottom: 1px solid #e5e5e5;">
                    <p class="size-14 uppercase tracking-widest text-gray-500">02 — Collaboration</p>
                </div>
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/3;">
                    <img src="[%IMAGE_PATH%]images/ai-cG2Nj.jpg" alt="Office Collaboration" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
            </div>
            <div class="column flex flex-col justify-center">
                <i class="bi bi-quote size-42 text-gray-300 mb-6"></i>
                <h3 class="size-32 font-light leading-13 mb-6">"We needed a system that could scale with our rapid growth. The solution provided was not just robust but intuitive for our entire team."</h3>
                <div class="flex items-center">
                    <div style="width: 40px; height: 1px; background: #000; margin-right: 15px;"></div>
                    <p class="size-14 font-medium">Emma Davis, CTO</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column flex flex-col justify-center">
                <i class="bi bi-quote size-42 text-gray-300 mb-6"></i>
                <h3 class="size-32 font-light leading-13 mb-6">"The attention to detail in the user experience is what sets this apart. Our engagement metrics have doubled since the launch."</h3>
                <div class="flex items-center">
                    <div style="width: 40px; height: 1px; background: #000; margin-right: 15px;"></div>
                    <p class="size-14 font-medium">Emilie Petersen, Product Lead</p>
                </div>
            </div>
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/3;">
                    <img src="[%IMAGE_PATH%]images/ai-mulxY.jpg" alt="Design Meeting" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-230f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-75">
    <div class="is-overlay" style="background-color: #f9f9f9;"></div>
    <div class="is-container v2 is-content-900 pb-16 pt-16 v3 size-17 leading-15">
        <div class="row">
            <div class="column">
                <div class="p-12 box-border bg-white text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg" style=" border: 1px solid #e5e5e5;">

                    <p class="uppercase tracking-150 size-12 text-gray-400 pb-6">Trial Access</p>
                    <h2 class="tracking-tight leading-11 font-normal text-black pb-4 size-64">Start your journey today.</h2>
                    <p class="text-gray-500 pb-8 is-content-540" style="margin: 0px auto;">Full access to all premium features for 14 days. No credit card required for sign up.</p>

                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 py-3 px-10 size-16 border-black bg-black text-white hover:bg-white font-normal leading-relaxed rounded-full tracking-wide hover:text-black hover:border-current" data-bg="rgb(0, 0, 0)" data-hover-bg="rgb(255, 255, 255)" style="background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                            Begin Free Trial
                        </a>
                    </div>
                    <p class="size-12 text-gray-400 pt-4">Terms and conditions apply.</p>
                </div>

            </div>
        </div>

    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-237a.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-60">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3">
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <h2 class="size-60 leading-12 font-light text-black mb-6">Learn, grow, and evolve.</h2>
                <p class="size-18 text-gray-600 leading-17 mb-8">
                    Our educational arm provides resources for architects and designers looking to master the minimalist aesthetic.
                </p>
                <div class="spacer height-40"></div>

                <div style="white-space: nowrap;">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-8 font-normal leading-14 rounded-full size-15 tracking-wide border-transparent bg-black text-white hover:bg-gray-800">
                        Explore Academy
                    </a>
                </div>

            </div>
            <div class="column">
                <!-- List Item 1 -->
                <div class="pb-6 pt-2" style="border-top: 1px solid #e5e5e5;">
                    <div class="flex justify-between items-center">
                        <h4 class="size-24 font-normal text-black">Design Systems</h4>
                        <i class="bi bi-arrow-right size-24 text-gray-400"></i>
                    </div>
                    <p class="size-15 text-gray-500 mt-2">Mastering the grid and typography.</p>
                </div>
                <!-- List Item 2 -->
                <div class="pb-6 pt-6" style="border-top: 1px solid #e5e5e5;">
                    <div class="flex justify-between items-center">
                        <h4 class="size-24 font-normal text-black">Spatial Theory</h4>
                        <i class="bi bi-arrow-right size-24 text-gray-400"></i>
                    </div>
                    <p class="size-15 text-gray-500 mt-2">Understanding volume and void.</p>
                </div>
                <!-- List Item 3 -->
                <div class="pb-6 pt-6" style="border-top: 1px solid #e5e5e5;">
                    <div class="flex justify-between items-center">
                        <h4 class="size-24 font-normal text-black">Materiality</h4>
                        <i class="bi bi-arrow-right size-24 text-gray-400"></i>
                    </div>
                    <p class="size-15 text-gray-500 mt-2">Texture, light, and surface.</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="is-section is-box type-system-ui is-section-80">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-3X0Qh.jpg'); background-position: 50% 50%;">
        </div>
    </div>
    <div class="is-container is-content-600 v3 is-content-left edge-x-2">
        <div class="row">
            <div class="column">
                <div class="p-12 bg-white text-center shadow-lg" style="box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);">
                    <i class="bi bi-quote size-42 text-gray-300 mb-4 inline-block"></i>
                    <p class="size-20 leading-16 text-gray-800 italic mb-6">
                        "Minimalism is not a subtraction for the sake of subtraction. Minimalism is subtraction for the sake of focus."
                    </p>
                    <div class="w-12 h-1 bg-black mx-auto mb-4"></div>
                    <p class="size-14 font-bold uppercase tracking-widest text-black">The Philosophy</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-237b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 v3 leading-17 size-16 is-content-1160">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-center pb-8 mb-8" style="border-bottom: 1px solid #f0f0f0;">
                    <h2 class="size-32 font-normal">Journal</h2>
                    <a href="#" class="size-14 text-gray-500 no-underline hover:text-black">View All Articles</a>
                </div>
            </div>
        </div>
        <div class="row" style="gap: 50px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3 / 4;">
                    <img src="[%IMAGE_PATH%]images/ai-mJabj-editzrrhL7m.jpg" alt="Design Workshop" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-12 uppercase tracking-150 text-gray-400 mb-3">October 12, 2023</p>
                <h3 class="font-normal size-28 mb-3 leading-12">The Future of Workspace</h3>
                <p class="text-gray-600">Exploring how hybrid models are reshaping the physical requirements of the modern office environment.</p>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3 / 4;">
                    <img src="[%IMAGE_PATH%]images/ai-FtUhV-editJIClFpu.jpg" alt="Sustainable Materials" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-12 uppercase tracking-150 text-gray-400 mb-3">September 28, 2023</p>
                <h3 class="font-normal size-28 mb-3 leading-12">Sustainable by Design</h3>
                <p class="text-gray-600">Why choosing local materials is the single most impactful decision in reducing a project's carbon footprint.</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-237d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-80">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 pt-10 pb-14 size-18 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-14 uppercase tracking-widest text-gray-500 mb-12 text-center">03 — Quick Takes</h2>
                <h3 class="size-48 font-light text-center mb-16 leading-12">Trusted by industry leaders<br>worldwide.</h3>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="p-10 box-border bg-white h-full transition-transform duration-300 hover:-translate-y-2" style="border: 1px solid #e0e0e0;">
                    <div class="mb-6 text-gray-300"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                    <p class="size-18 leading-16 mb-8 text-gray-800">"It's rare to find a tool that balances power with simplicity so effectively. It has completely streamlined our workflow."</p>
                    <p class="size-13 font-bold uppercase tracking-widest">Freja E. — Company</p>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border bg-white h-full transition-transform duration-300 hover:-translate-y-2" style="border: 1px solid #e0e0e0;">
                    <div class="mb-6 text-gray-300"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                    <p class="size-18 leading-16 mb-8 text-gray-800">"The customer support is unparalleled. Any issue we've had was resolved in minutes, not days. Truly exceptional."</p>
                    <p class="size-13 font-bold uppercase tracking-widest">Emilie P. — Company</p>
                </div>
            </div>
            <div class="column">
                <div class="p-10 box-border bg-white h-full transition-transform duration-300 hover:-translate-y-2" style="border: 1px solid #e0e0e0;">
                    <div class="mb-6 text-gray-300"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                    <p class="size-18 leading-16 mb-8 text-gray-800">"A game changer for our agency. We've been able to deliver projects 2x faster without compromising quality."</p>
                    <p class="size-13 font-bold uppercase tracking-widest">Vincent K. — Company</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-237f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay" style="background-color: rgb(245, 245, 245);"></div>
    <div class="is-container is-content-1100 content-py-80 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <div class="p-12 box-border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg" style="background-color: rgb(255, 255, 255); border: 1px solid #e5e5e5;">
                    <div class="flex justify-between items-center" style="flex-wrap: wrap; gap: 30px;">
                        <div style="max-width: 600px;">
                            <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Newsletter</p>
                            <h3 class="size-28 font-normal leading-13 pb-2">Stay inspired with design insights.</h3>
                            <p class="size-15 leading-17 text-gray-600">Monthly perspectives on design, architecture, and creative culture. No spam, just thoughtful content.</p>
                        </div>
                        <div>
                            <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal py-2 px-6 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(255, 255, 255); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">Subscribe</a>
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
			'thumbnail': 'preview/item-234b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay">
        <div class="is-overlay-bg"></div>
    </div>
    <div class="is-container v2 is-content-1600 pt-11 pb-11 v3 leading-17 size-17">
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 70%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 16/9;">
                    <img src="[%IMAGE_PATH%]images/ai-Y42RR.jpg" alt="Visual Storytelling" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
            <div class="column flex flex-col justify-center">
                <p class="uppercase tracking-widest size-12 text-gray-500 pb-6 border-b border-gray-300 w-full mb-6">Manifesto</p>
                <h1 class="size-48 font-light text-black pb-6 leading-12">We craft visual narratives that define brands.</h1>
                <p class="text-gray-600 pb-8">Our approach combines strategic thinking with exceptional artistry to create meaningful connections between people and products.</p>
                <div>
                    <a href="#" class="size-14 uppercase tracking-widest border-b-2 border-black pb-1 no-underline text-black hover:text-gray-600 transition-colors">Read Our Story</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-234c.png',
			'category': '4',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-FFGgY-editwR2ZEZG.jpg&quot;); background-position: center center; transition: transform 1.5s;"></div>
        </div>
    </div>

    <div class="is-box is-box-6 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 v3 leading-17 size-17">
            <div class="row">
                <div class="column">
                    <p class="uppercase tracking-150 size-12 text-gray-400 pb-6">Capabilities</p>
                    <h2 class="size-42 font-light pb-8">Comprehensive design<br>services.</h2>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <div class="pb-6 pt-6" style="border-top: 1px solid #f0f0f0;">
                        <h3 class="font-normal pb-2">Research &amp; Strategy</h3>
                        <p class="text-gray-600">Market analysis, user persona development, and strategic roadmapping to ensure product-market fit.</p>
                    </div>

                    <div class="pb-6 pt-6" style="border-top: 1px solid #f0f0f0;">
                        <h3 class="font-normal pb-2">Branding &amp; Identity</h3>
                        <p class="text-gray-600">Logo design, visual systems, and brand guidelines that create a cohesive and memorable presence.</p>
                    </div>

                    <div class="pb-6 pt-6" style="border-top: 1px solid #f0f0f0;">
                        <h3 class="font-normal pb-2">Design &amp; Development</h3>
                        <p class="text-gray-600">End-to-end production from high-fidelity prototypes to production-ready code.</p>
                    </div>

                    <div class="pb-6 pt-6" style="border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;">
                        <h3 class="font-normal pb-2">Content Direction</h3>
                        <p class="text-gray-600">Copywriting, photography direction, and asset creation to tell your story effectively.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/list-06.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-100 v3 pb-11 pt-11 leading-17 size-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-8" style="border-bottom: 1px solid #e0e0e0;">
                    <div>
                        <p class="uppercase tracking-150 size-12 text-gray-400 mb-2">Our Impact</p>
                        <h2 class="size-42 font-light leading-12">By The Numbers</h2>
                    </div>
                    <div class="hidden-mobile">
                        <p class="size-14 text-gray-500 text-right max-w-xs">Quantifying our dedication to quality and client satisfaction over the last decade.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap: 20px;">
            <div class="column">
                <p class="size-72 font-light pb-2">100+</p>
                <p class="size-14 uppercase tracking-150 text-gray-500">Happy Clients</p>
            </div>
            <div class="column">
                <p class="size-72 font-light pb-2">157</p>
                <p class="size-14 uppercase tracking-150 text-gray-500">Projects Done</p>
            </div>
            <div class="column">
                <p class="size-72 font-light pb-2">35</p>
                <p class="size-14 uppercase tracking-150 text-gray-500">Countries</p>
            </div>
            <div class="column">
                <p class="size-72 font-light pb-2">10</p>
                <p class="size-14 uppercase tracking-150 text-gray-500">Years Active</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-100"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-8" style="border-bottom: 1px solid #e0e0e0;">
                    <div>
                        <p class="uppercase tracking-150 size-12 text-gray-400 mb-2">Expertise</p>
                        <h2 class="size-42 font-light leading-12">Core Competencies</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="size-24 leading-12 font-normal">Full Stack Development</h4>
                    <span class="size-14 font-mono text-gray-500">80%</span>
                </div>
                <div class="w-full bg-gray-200 h-1">
                    <div class="bg-black h-1" style="width: 80%"></div>
                </div>
                <p class="size-14 text-gray-500 mt-4">Expertise in React, Node.js, and modern database architecture.</p>
            </div>
            <div class="column">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="size-24 leading-12 font-normal">UI/UX Design</h4>
                    <span class="size-14 font-mono text-gray-500">90%</span>
                </div>
                <div class="w-full bg-gray-200 h-1">
                    <div class="bg-black h-1" style="width: 90%"></div>
                </div>
                <p class="size-14 text-gray-500 mt-4">Creating intuitive interfaces and user flows that convert.</p>
            </div>
            <div class="column">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="size-24 leading-12 font-normal">Visual Identity</h4>
                    <span class="size-14 font-mono text-gray-500">95%</span>
                </div>
                <div class="w-full bg-gray-200 h-1">
                    <div class="bg-black h-1" style="width: 95%"></div>
                </div>
                <p class="size-14 text-gray-500 mt-4">Developing cohesive brand systems and visual assets.</p>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-234d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-80">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-14 pt-10 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="pb-4 border-b border-gray-200">
                    <p class="size-14 uppercase tracking-widest text-gray-500">04 — Voices</p>
                </div>
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 80px;">
            <div class="column"><i class="bi bi-quote size-60 text-black mb-6 block"></i>
                <p class="size-32 font-light leading-13 mb-8 pb-2">"Design is not just what it looks like and feels like. Design is how it works. This team embodies that philosophy."</p>
                <div class="flex items-center">
                    <div class="w-1/5 h-1/5 rounded-full bg-gray-200 overflow-hidden mr-4" style="aspect-ratio: 1 / 1">
                        <img src="[%IMAGE_PATH%]images/ai-FhJeD-editapwdgHV.jpg" alt="User" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <p class="size-14 font-bold">Michael Chen</p>
                        <p class="size-12 text-gray-500 uppercase tracking-wide">Director of Product</p>
                    </div>
                </div>
            </div>
            <div class="column"><i class="bi bi-quote size-60 text-black mb-6 block"></i>
                <p class="size-32 font-light leading-13 mb-8">"Simplicity is the ultimate sophistication. They took our complex requirements and made them beautiful."</p>
                <div class="flex items-center">
                    <div class="w-1/5 h-1/5 rounded-full bg-gray-200 overflow-hidden mr-4" style="aspect-ratio: 1 / 1">
                        <img src="[%IMAGE_PATH%]images/ai-i4kBm-editPkv1YEy.jpg" alt="User" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <p class="size-14 font-bold">Emma Davis</p>
                        <p class="size-12 text-gray-500 uppercase tracking-wide">Head of Marketing</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-234f.png',
			'category': '7',
			'html': `
<div class="is-section is-section-70 type-system-ui">
    <div class="is-box is-box-6 hover-zoom">
        <div class="is-overlay" style="background-color: #f0f0f0;">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-9x0xe.jpg&quot;); background-position: center center;"></div>
        </div>
    </div>
    <div class="is-box is-box-6 flex flex-col justify-center">
        <div class="is-overlay" style="background-color: #fff;"></div>
        <div class="is-container v2 pl-8 v3 is-content-580 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                    <p class="uppercase tracking-150 size-12 text-gray-400 pb-6">Collaboration</p>
                    <h2 class="leading-11 font-normal pb-6 size-50">Got a project in mind?<br class="size-50">Let's build it together.</h2>
                    <p class="leading-17 text-gray-600 pb-8 size-17">
                        We partner with visionary brands to create digital experiences that define categories.
                    </p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-b-2 border-solid border-black pb-1 font-medium text-black hover:text-gray-600 hover:border-gray-600" style="border-bottom-width: 1px;">
                            Start a Conversation →
                        </a>
                    </div>
                    <div class="spacer height-40"></div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-238b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1400 pt-11 pb-11 v3 leading-17 size-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-2 border-b border-gray-200 mb-10">
                    <h2 class="size-32 font-normal text-black">Curated Essentials</h2>
                    <p class="size-14 text-gray-500 uppercase tracking-widest mb-1">Fall Collection 2024</p>
                </div>
            </div>
        </div>
        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-yfNH9.jpg" alt="Ceramic Vase" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-black pb-1 size-24 font-normal">Artisan Ceramics</h3>
                        <p class="size-14 text-gray-500">Handcrafted in Kyoto</p>
                    </div>
                    <span class="size-14 text-black">$120</span>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-EfhOF.jpg" alt="Minimalist Lamp" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-black pb-1 size-24 font-normal">Nordic Lighting</h3>
                        <p class="size-14 text-gray-500">Sustainable Materials</p>
                    </div>
                    <span class="size-14 text-black">$240</span>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-h20CL.jpg" alt="Textile Throw" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-black pb-1 size-24 font-normal">Organic Textiles</h3>
                        <p class="size-14 text-gray-500">Pure Cotton Blend</p>
                    </div>
                    <span class="size-14 text-black">$85</span>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-238d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pt-10 pb-14 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="pb-4 border-b border-gray-200 mb-12">
                    <p class="size-14 uppercase tracking-widest text-gray-500">05 — Case Studies</p>
                </div>
            </div>
        </div>
        <div class="row pb-12 mb-12 border-b border-gray-100" style="gap: 40px;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/3;">
                    <img src="[%IMAGE_PATH%]images/ai-xgcEE-editZaAEX7k.jpg" alt="Case Study 1" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
            </div>
            <div class="column flex flex-col justify-center">
                <div class="flex justify-between mb-4">
                    <p class="size-12 uppercase tracking-150 text-gray-400">Fintech</p>
                    <p class="size-12 uppercase tracking-150 text-gray-400">2023</p>
                </div>
                <h3 class="size-28 font-normal leading-13 mb-4">"It's easy to use, customizable, and user-friendly. A truly amazing set of features that scaled with us."</h3>
                <p class="size-15 text-gray-500">— Thomas Wright, CEO</p>
            </div>
        </div>
        <div class="row pb-12 mb-12 border-b border-gray-100" style="gap: 40px;">
            <div class="column flex flex-col justify-center">
                <div class="flex justify-between mb-4">
                    <p class="size-12 uppercase tracking-150 text-gray-400">E-Commerce</p>
                    <p class="size-12 uppercase tracking-150 text-gray-400">2024</p>
                </div>
                <h3 class="size-28 font-normal leading-13 mb-4">"Super fast implementation. Awesome products with great support! We saw immediate ROI."</h3>
                <p class="size-15 text-gray-500">— Jessica Lee, Founder</p>
            </div>
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/3;">
                    <img src="[%IMAGE_PATH%]images/ai-w6T50-editwbBAjMJ.jpg" alt="Case Study 2" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/3;">
                    <img src="[%IMAGE_PATH%]images/ai-tGsPn2-edituVDMpm6.jpg" alt="Case Study 3" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105">
                </div>
            </div>
            <div class="column flex flex-col justify-center">
                <div class="flex justify-between mb-4">
                    <p class="size-12 uppercase tracking-150 text-gray-400">Healthcare</p>
                    <p class="size-12 uppercase tracking-150 text-gray-400">2023</p>
                </div>
                <h3 class="size-28 font-normal leading-13 mb-4">"The platform is incredibly intuitive. It allowed our medical staff to focus on patients rather than software."</h3>
                <p class="size-15 text-gray-500">— Dr. Alan Grant, Director</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-238f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-30">
    <div class="is-overlay" style="border-top: 1px solid #eee; border-bottom: 1px solid #eee;"></div>
    <div class="is-container v2 is-content-1200 pt-14 pb-14 v3 size-17 leading-17">
        <div class="row items-center justify-between">
            <div class="column">
                <h2 class="leading-none size-42 font-normal text-black">Experience the difference.</h2>
            </div>
            <div class="column flex justify-end" style="width: auto; flex: 0 0 auto;">

                <div style="white-space: nowrap;">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-10 size-15 uppercase border-black bg-black text-white hover:bg-white hover:text-black font-medium leading-relaxed rounded-full tracking-wide hover:border-current" data-bg="rgb(0, 0, 0)" data-hover-bg="rgb(255, 255, 255)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''" style="background-color: rgb(0, 0, 0);">
                        Request Demo
                    </a>
                </div>

            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-233a.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 box-autofit flex flex-col justify-center bg-white">
        <div class="is-overlay"></div>
        <div class="is-container v2 is-content-540 leading-17 size-18 v3">
            <div class="row">
                <div class="column">
                    <div class="flex items-center pb-6" style="gap: 12px;">
                        <span class="size-12 font-bold bg-black text-white px-2 py-1">NEW</span>
                        <p class="size-12 uppercase tracking-widest text-gray-500">E-Learning Platform</p>
                    </div>
                    <h1 class="size-64 font-light tracking-tight text-black pb-6 leading-11">Learn anytime, anywhere. Grow your skills.</h1>
                    <p class="text-gray-600 pb-8 font-light">
                        Access a world of knowledge from industry experts. Whether you're starting out or scaling up, our curriculum adapts to your pace.
                    </p>

                    <div class="flex flex-wrap items-center" style="gap: 30px;">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-8 size-15 uppercase tracking-widest font-medium border-transparent rounded-full hover:border-transparent text-white bg-black" data-bg="#000000" data-hover-bg="#333333" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');" style="background-color: rgb(0, 0, 0);">
                            Get Started
                        </a>
                        
                        <a href="#" class="size-15 font-medium text-black no-underline border-b border-gray-300 pb-1 hover:text-gray-600 hover:border-black transition-colors">
                            View Course Catalog
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                    <div class="flex" style="gap: 40px; border-top: 1px solid #f0f0f0; padding-top: 30px;">
                        <div>
                            <h4 class="size-32 font-normal pb-1">15k+</h4>
                            <p class="size-13 text-gray-500 uppercase tracking-wide">Students</p>
                        </div>
                        <div>
                            <h4 class="size-32 font-normal pb-1">4.9</h4>
                            <p class="size-13 text-gray-500 uppercase tracking-wide">Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="is-box is-box-6 box-autofit is-content-bottom edge-y-4">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-G5ip1.jpg'); background-position: 50% 30%;">
                <div class="is-overlay-color opacity-10"></div>
            </div>
        </div>
        <div class="is-container bg-white p-8 shadow-lg is-content-left size-15 leading-14 edge-x-4 v3 is-content-400" style="background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-3">Available Now</p>
                    <h4 class="size-48 font-light leading-none pb-2">1,280</h4>
                    <p class="size-15 text-gray-800 leading-14">Premium masterclasses available for instant streaming.</p>

                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-233b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui bg-gray-50 is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1200 content-py-100 pb-8 v3 leading-17 size-17 pt-12">
        <div class="row" style="gap: 80px;">
            <div class="column">
                <div class="w-full overflow-hidden relative mb-8" style="aspect-ratio: 4/5;">
                    <img src="[%IMAGE_PATH%]images/ai-y7Rvk.jpg" alt="Creative Workshops" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-12 uppercase tracking-widest text-gray-500 mb-3">Education</p>
                <h3 class="size-32 font-light text-black mb-4">Creative Workshops</h3>
                <p class="text-gray-600">Immersive learning experiences designed to spark curiosity and foster innovation in young minds.</p>
            </div>
            <div class="column">
                <div class="spacer height-100"></div>
                <div class="w-full overflow-hidden relative mb-8" style="aspect-ratio: 4/5;">
                    <img src="[%IMAGE_PATH%]images/ai-1aIZ0.jpg" alt="Digital Learning" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-12 uppercase tracking-widest text-gray-500 mb-3">Technology</p>
                <h3 class="size-32 font-light text-black mb-4">Digital Accessibility</h3>
                <p class="text-gray-600">Making knowledge accessible through intuitive digital platforms and simplified interfaces.</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-233c.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 size-17 leading-17 v3 pt-16 pb-12">
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 40%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-white" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-G5ip1.jpg" alt="Design Studio" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="pt-6">
                    <p class="size-18 font-normal leading-16">"We don't just build websites; we craft digital legacies that stand the test of time."</p>
                    <p class="size-14 text-gray-500 mt-2">— Alex Thorne, Founder</p>
                </div>
            </div>
            <div class="column">
                <div class="pb-12">
                    <p class="uppercase tracking-150 size-12 text-gray-400 mb-4">Distinctions</p>
                    <h2 class="size-48 leading-12 font-light text-black">Why leading brands choose us.</h2>
                </div>
                <div class="flex pb-10 mb-10 transition-transform duration-300 ease-out hover:translate-x-2" style="border-bottom: 1px solid #e0e0e0;">
                    <div class="pr-6 pt-5">
                        <i class="bi bi-globe size-24 text-black"></i>
                    </div>
                    <div>
                        <h3 class="size-24 font-normal mb-3">Global Perspective</h3>
                        <p class="size-16 leading-17 text-gray-600">
                            Our team spans three continents, bringing diverse cultural insights to every project. We design experiences that transcend borders while respecting local nuances, ensuring your brand resonates globally.
                        </p>
                    </div>
                </div>
                <div class="flex pb-10 mb-10 transition-transform duration-300 ease-out hover:translate-x-2" style="border-bottom: 1px solid #e0e0e0;">

                    <div class="pr-6 pt-5">
                        <i class="bi bi-graph-up-arrow size-24 text-black"></i>
                    </div>
                    <div>
                        <h3 class="size-24 font-normal mb-3">Data-Driven Design</h3>
                        <p class="size-16 leading-17 text-gray-600">
                            We move beyond intuition. Every design decision is backed by rigorous analytics and user testing. We continuously monitor performance metrics to optimize engagement and conversion rates.
                        </p>
                    </div>
                </div>
                <div class="flex pb-10 mb-10 transition-transform duration-300 ease-out hover:translate-x-2" style="border-bottom: 1px solid #e0e0e0;">

                    <div class="pr-6 pt-5">
                        <i class="bi bi-cpu size-24 text-black"></i>
                    </div>
                    <div>
                        <h3 class="size-24 font-normal mb-3">Future-Proof Tech</h3>
                        <p class="size-16 leading-17 text-gray-600">
                            Utilizing the latest frameworks and headless architecture, we build platforms designed for longevity. Our code is modular, scalable, and ready to integrate with tomorrow's technologies.
                        </p>
                    </div>
                </div>
                <div class="flex transition-transform duration-300 ease-out hover:translate-x-2">

                    <div class="pr-6 pt-5">
                        <i class="bi bi-flower1 size-24 text-black"></i>
                    </div>
                    <div>
                        <h3 class="size-24 font-normal mb-3">Sustainable Digital</h3>
                        <p class="size-16 leading-17 text-gray-600">
                            We prioritize low-carbon coding practices and efficient asset delivery. Our digital solutions are optimized for energy efficiency, reducing your brand's digital carbon footprint.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-233d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom edge-y-4 hover-zoom">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-T6RPD.jpg&quot;); background-position: 50% 28%; opacity: 1;">
            <div class="is-overlay-color bg-black opacity-20"></div>
        </div>
    </div>
    <div class="is-container is-content-1000 text-center v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <i class="bi bi-quote size-48 text-white mb-8 inline-block opacity-60"></i>
                <h2 class="font-light size-54 leading-12 text-white mb-10">"I am thoroughly impressed. It provided me with a comprehensive education and I am confident in my newfound abilities. I highly recommend this course."</h2>
                <div class="w-16 h-1 bg-white mx-auto mb-8 opacity-50"></div>
                <h3 class="font-normal text-white size-20 tracking-wide">Nina Mathiesen</h3>
                <p class="size-14 text-gray-300 uppercase tracking-widest mt-2">Senior Developer</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-233f.png',
			'category': '7',
			'html': `
<div class="is-section is-box min-height-60 type-system-ui is-content-bottom edge-y-2 is-section-85 is-light-text hover-zoom">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-tX8fm.jpg'); background-position: 50% 43%;">
            <div class="is-overlay-color opacity-35" style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%);"></div>
        </div>
    </div>
    <div class="is-container v2 size-18 is-content-1200 v3 leading-17">
        <div class="row">
            <div class="column" style="width: 60%; flex: 0 0 auto;">
                <p class="size-13 uppercase tracking-widest text-white opacity-80 pb-4">Master Class Series</p>
                <h2 class="size-72 leading-11 font-light text-white pb-6">Define your own<br>path forward.</h2>
                <div class="flex items-center">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-8 font-normal leading-14 border-white text-white rounded-full size-15 tracking-wide hover:bg-white hover:text-black">
                        Start Learning
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-232a.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom edge-y-4">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-rBr7e.jpg&quot;); background-position: 50% 60%;" data-bottom-top="transform:translateY(-70px) scale(1);" data-top-bottom="transform:translateY(50px) scale(1.1)">
            <div class="is-overlay-color opacity-10"></div>
        </div>
    </div>
    <div class="is-container v3 size-18 leading-17 p-12 bg-white is-content-left edge-x-4 is-content-500 pl-9 pr-9 pb-14 pt-14" style="background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);">

        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-200 text-gray-500 mb-4 text-left">Philosophy</p>
                <h1 class="size-54 font-light mb-6 leading-11 text-left">Make space for who you are.</h1>
                <p class="text-gray-600 mb-8 text-left">
                    This isn’t about trends. It’s about presence. We help creatives and thinkers build visual identities rooted in stillness, strength, and authenticity.
                </p>
                <div class="spacer height-20"></div>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-2 px-8 size-15 border-black text-black hover:bg-black hover:text-white rounded-full border-current hover:border-transparent" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                        Our Process
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-232b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 leading-14 size-18 v3 is-content-1660">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end border-b-2 border-black pb-6" style="border-bottom: 1px solid #e5e5e5;">
                    <div>
                        <p class="size-12 uppercase tracking-150 text-gray-500 mb-2">Portfolio 2024</p>
                        <h2 class="size-72 leading-11 font-normal tracking-tight">Visual Narratives</h2>
                    </div>
                    <div class="xs-hidden">
                        <p class="size-14 text-gray-500 text-right">Curated Selection<br>Vol. 01 — Edition</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 4 / 3;">
                    <img src="[%IMAGE_PATH%]images/ai-hFEzM-editxycVNUw.jpg" alt="Architecture" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between items-baseline">
                    <h3 class="size-18 font-medium">The Silent Facade</h3>
                    <p class="size-12 text-gray-500">01</p>
                </div>
                <p class="size-14 text-gray-600 mt-2">Modernist structures in urban decay.</p>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 4 / 3;">
                    <img src="[%IMAGE_PATH%]images/ai-QbTCz-editzeBGTOQ.jpg" alt="Interior" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between items-baseline">
                    <h3 class="size-18 font-medium">Interior Dialogue</h3>
                    <p class="size-12 text-gray-500">02</p>
                </div>
                <p class="size-14 text-gray-600 mt-2">Spaces that speak without words.</p>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 4 / 3;">
                    <img src="[%IMAGE_PATH%]images/ai-N2SlX-editDoSEy8b.jpg" alt="Detail" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div class="flex justify-between items-baseline">
                    <h3 class="size-18 font-medium">Material Truth</h3>
                    <p class="size-12 text-gray-500">03</p>
                </div>
                <p class="size-14 text-gray-600 mt-2">Textures of the natural world.</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-232c.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 size-18 is-content-1200 v3 leading-15">
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row w-full">
            <div class="column" style="width: 50%; flex: 0 0 auto;">
                <h2 class="size-60 font-normal leading-12">We Create<br><span class="text-gray-400">Brands</span></h2>
            </div>
            <div class="column flex flex-col justify-center">
                <ul class="text-gray-600 size-16" style="list-style: none; padding: 0; margin: 0;">
                    <li class="pb-2">Corporate Identity Design</li>
                    <li class="pb-2">Visual Communication</li>
                    <li class="pb-2">Logo Design &amp; Systems</li>
                    <li>Brand Guidelines</li>
                </ul>
            </div>
            <div class="column flex flex-col justify-center">
                <ul class="text-gray-600 size-16" style="list-style: none; padding: 0; margin: 0;">
                    <li class="pb-2">Print Design</li>
                    <li class="pb-2">Packaging</li>
                    <li class="pb-2">Rebranding</li>
                    <li>Art Direction</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row w-full">
            <div class="column" style="width: 50%; flex: 0 0 auto;">
                <h2 class="size-60 font-normal leading-12">We Build<br><span class="text-gray-400">Websites</span></h2>
            </div>
            <div class="column flex flex-col justify-center">
                <ul class="text-gray-600 size-16" style="list-style: none; padding: 0; margin: 0;">
                    <li class="pb-2">Web Design</li>
                    <li class="pb-2">User Interface Design</li>
                    <li class="pb-2">User Experience</li>
                    <li>Front-end Development</li>
                </ul>
            </div>
            <div class="column flex flex-col justify-center">
                <ul class="text-gray-600 size-16" style="list-style: none; padding: 0; margin: 0;">
                    <li class="pb-2">eCommerce Solutions</li>
                    <li class="pb-2">Web Applications</li>
                    <li class="pb-2">SEO Optimization</li>
                    <li>CMS Integration</li>
                </ul>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-232d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-80">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 pb-12 pt-8 leading-17 size-17">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-4 border-b border-black">
                    <h2 class="size-120 leading-none font-bold tracking-tight" style="margin-bottom: -10px;">REVIEWS</h2>
                    <p class="size-14 uppercase tracking-widest text-gray-500 pb-2">07 — What They Say</p>
                </div>
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column">
                <p class="size-14 text-gray-400 mb-6">01 / BRANDING</p>
                <p class="leading-12 size-42 font-light mb-8">"I highly recommend this agency. I got a brand identity that truly feels timeless, impressive, and uniquely ours."</p>
                <div class="flex items-center">
                    <div class="w-2 h-2 bg-black rounded-full mr-3"></div>
                    <p class="size-14 font-bold uppercase tracking-wide">The Studio</p>
                </div>
            </div>
            <div class="column">
                <p class="size-14 text-gray-400 mb-6">02 / PRODUCT</p>
                <p class="leading-12 size-42 font-light mb-8">"Super awesome products with great support! The team went above and beyond to ensure our launch was flawless."</p>
                <div class="flex items-center">
                    <div class="w-2 h-2 bg-black rounded-full mr-3"></div>
                    <p class="size-14 font-bold uppercase tracking-wide">A Magazine</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-232f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-85">
    <div class="is-overlay"></div>
    <div class="is-container v2 pt-16 pb-12 v3 is-content-1320 size-17 leading-17">
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 55%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/5;">
                    <img src="[%IMAGE_PATH%]images/ai-2Rer7-editpUYkthl.jpg" alt="Office Culture" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>

            <div class="column flex flex-col justify-center">
                <div class="pb-8 border-b border-gray-200 mb-8 w-full" style="border-bottom: 1px solid #e5e5e5;">
                    <p class="uppercase tracking-widest size-12 text-gray-500">Careers</p>
                </div>

                <h2 class="font-normal size-60 leading-11 pb-6">Ready to work with us?</h2>

                <p class="leading-17 text-gray-600 pb-8 size-17">
                    We are always looking for exceptional talent to join our diverse team of thinkers, makers, and doers. If you are passionate about design and technology, we want to hear from you.
                </p>

                <div class="flex justify-between items-center w-full py-4 border-b border-gray-100" style="border-bottom: 1px solid #f5f5f5;">
                    <span class="size-15 font-medium">Senior Designer</span>
                    <span class="size-13 text-gray-400">Remote</span>
                </div>
                <div class="flex justify-between items-center w-full py-4 border-b border-gray-100" style="border-bottom: 1px solid #f5f5f5;">
                    <span class="size-15 font-medium">Frontend Developer</span>
                    <span class="size-13 text-gray-400">London</span>
                </div>
                <div class="spacer height-40"></div>
                <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-10 border-black hover:bg-black hover:text-white font-normal leading-relaxed rounded-full size-15 tracking-wide border-current hover:border-transparent" style="color: rgb(0, 0, 0);" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                    View All Openings
                </a>
            </div>
        </div>
    </div>
</div>
		`
		},


		{
			'thumbnail': 'preview/item-239a.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui bg-gray-50 is-section-40">
    <div class="is-overlay"></div>
    <div class="is-container is-content-980 v3">
        <div class="row">
            <div class="column">
                <p class="size-14 text-center text-gray-400 uppercase tracking-widest mb-6">— The Vision</p>
                <h2 class="size-48 text-center text-black leading-13 font-light">
                    "Beyond what you see, there is what you feel. We design for the subconscious experience of space."
                </h2>
            </div>
        </div>
    </div>
</div>
<div class="is-section is-box type-system-ui is-section-60 is-content-bottom edge-y-0-25">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-MhBT8.jpg'); background-position: 50% 50%;">
            <div class="is-overlay-color" style="background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);"></div>
        </div>
    </div>
    <div class="is-container is-content-1400 v3 is-content-left edge-x-2">
        <div class="row">
            <div class="column">
                <div class="p-12 bg-white" style="max-width: 500px;">
                    <div class="flex justify-between items-center mb-6">
                        <span class="size-12 uppercase tracking-widest text-gray-400">Residential</span>
                        <span class="size-12 uppercase tracking-widest text-gray-400">2024</span>
                    </div>
                    <h2 class="size-42 leading-12 text-black mb-4">The Nordic Villa</h2>
                    <p class="size-16 text-gray-600 leading-17 mb-8">
                        A study in light and shadow. The Nordic Villa represents a return to essential forms and natural materials.
                    </p>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-b-2 border-solid pb-1 font-medium size-15 tracking-wide border-black text-black hover:text-gray-600 hover:border-gray-600">
                        View Case Study
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-239b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 content-py-100 pt-10 pb-11 v3 leading-17 size-17 is-content-1580">
        <div class="row mb-12">
            <div class="column">
                <h2 class="size-14 uppercase tracking-widest text-gray-400">Our Expertise</h2>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column">
                <div class="border-t border-gray-200 pt-6">
                    <span class="block size-14 font-mono text-gray-400 mb-6">01</span>
                    <div class="w-full overflow-hidden relative bg-gray-50 mb-8" style="aspect-ratio: 3 / 4;">
                        <img src="[%IMAGE_PATH%]images/ai-I2V4d.jpg" alt="Residential Interiors" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                    <h3 class="size-24 font-normal text-black mb-2">Residential</h3>
                    <p class="size-15 text-gray-600">Creating intimate living spaces that reflect personal style and comfort.</p>
                </div>
            </div>
            <div class="column">
                <div class="border-t border-gray-200 pt-6">
                    <span class="block size-14 font-mono text-gray-400 mb-6">02</span>
                    <div class="w-full overflow-hidden relative bg-gray-50 mb-8" style="aspect-ratio: 3 / 4;">
                        <img src="[%IMAGE_PATH%]images/ai-2EkuF.jpg" alt="Business Interiors" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                    <h3 class="size-24 font-normal text-black mb-2">Commercial</h3>
                    <p class="size-15 text-gray-600">Functional workspaces designed to enhance productivity and collaboration.</p>
                </div>
            </div>
            <div class="column">
                <div class="border-t border-gray-200 pt-6">
                    <span class="block size-14 font-mono text-gray-400 mb-6">03</span>
                    <div class="w-full overflow-hidden relative bg-gray-50 mb-8" style="aspect-ratio: 3 / 4;">
                        <img src="[%IMAGE_PATH%]images/ai-Tj9zz.jpg" alt="Architectural Design" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                    <h3 class="size-24 font-normal text-black mb-2">Architecture</h3>
                    <p class="size-15 text-gray-600">Structural design that balances aesthetic vision with engineering precision.</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-239c.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 bg-gray-50">
    <div class="is-overlay"></div>
    <div class="is-container v2 size-18 is-content-1400 v3 leading-17">
        <div class="row" style="gap: 60px;">
            <div class="column flex flex-col justify-center" style="width: 40%; flex: 0 0 auto;">
                <p class="uppercase tracking-150 size-12 text-gray-400 pb-6">Our Distinction</p>
                <h2 class="size-48 font-light pb-6">What makes us unique.</h2>
                <p class="size-17 text-gray-600">
                    We don't just design; we engineer outcomes. Our unique blend of data-driven strategy and world-class aesthetics ensures that every pixel serves a purpose.
                </p>
                <div class="spacer height-20"></div>
                <div class="flex justify-between items-center pb-4 pt-4" style="border-bottom: 1px solid #ddd;">
                    <span class="size-15 font-medium">Client Satisfaction</span>
                    <span class="size-15 font-bold">100%</span>
                </div>
                <div class="flex justify-between items-center pb-4 pt-4" style="border-bottom: 1px solid #ddd;">
                    <span class="size-15 font-medium">Awards Gained</span>
                    <span class="size-15 font-bold">15</span>
                </div>
                <div class="flex justify-between items-center pb-4 pt-4" style="border-bottom: 1px solid #ddd;">
                    <span class="size-15 font-medium">Repeat Business</span>
                    <span class="size-15 font-bold">85%</span>
                </div>
            </div>

            <div class="column">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 5/4;">
                    <img src="[%IMAGE_PATH%]images/ai-RRa3F.jpg" alt="Team working" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-239d.png',
			'category': '5',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-6 is-light-text hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-xF2lG.jpg'); background-position: 50% 60%;">
                <div class="is-overlay-color opacity-20"></div>
            </div>
        </div>
        <div class="is-container is-content-540 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-white pb-6 opacity-70">01 — Residential</p>
                    <div class="spacer height-40"></div>
                    <h3 class="size-32 font-light leading-13 text-white">"The team transformed our vision into a reality that exceeded every expectation. The attention to light and space is simply masterful."</h3>
                    <div class="spacer height-40"></div>
                    <div class="flex items-center">
                        <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.5); margin-right: 15px;"></div>
                        <p class="size-14 text-white uppercase tracking-wider">Emilie Petersen, Homeowner</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-6 is-light-text hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-N2SlX.jpg&quot;); background-position: 18% 60%;" data-bg-lg="background-position: 18% 60%;" data-bg-ori="background-position: 18% 60%;">
                <div class="is-overlay-color opacity-20"></div>
            </div>
        </div>
        <div class="is-container is-content-540 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-white pb-6 opacity-70">02 — Commercial</p>
                    <div class="spacer height-40"></div>
                    <h3 class="size-32 font-light leading-13 text-white">"Functionality meets aesthetics. They understood our workflow needs while delivering a space that inspires our entire team daily."</h3>
                    <div class="spacer height-40"></div>
                    <div class="flex items-center">
                        <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.5); margin-right: 15px;"></div>
                        <p class="size-14 text-white uppercase tracking-wider">Jennifer Clarke, CEO</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-239f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-900 size-18 leading-14 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 text-center pb-6">Get Started</p>
                <h2 class="size-64 font-light leading-11 text-center tracking-tight pb-6">Ready to transform your space?</h2>
                <p class="size-18 leading-17 text-gray-600 text-center">We partner with forward-thinking brands to create environments that inspire, engage, and endure. Let's discuss how we can bring your vision to life.</p>
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
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-8 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(255, 255, 255); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">Schedule a Consultation</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-240a.png',
			'category': '1',
			'html': `
<div class="is-section type-system-ui is-box is-section-40">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 size-17 leading-17 v3">
        <div class="row">
            <div class="column">
                <div style="height: 1px; background-color: #e5e5e5; width: 100%; margin-bottom: 30px;"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 25%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-gray-500 mb-2">Expertise</p>
                <p class="size-14 text-black font-medium">Branding &amp; Digital Marketing</p>
            </div>
            <div class="column">
                <h1 class="size-64 leading-12 font-light text-black mb-10" style="max-width: 960px;">We've put together a special combination of design, strategy, and digital expertise.</h1>

                <div class="flex items-center" style="gap: 20px;">
                    <div style="height: 1px; background-color: #000; width: 40px;"></div>
                    <p class="size-13 uppercase tracking-150 text-black">Since 2014</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="is-section type-system-ui is-section-60">
    <div class="is-box is-box-7">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-zBxAB.jpg'); background-position: 50% 50%;">
            </div>
        </div>
    </div>
    <div class="is-box bg-gray-50 is-box-5">
        <div class="is-overlay"></div>
        <div class="is-container is-content-440 is-content-left leading-17 v3 size-16">
            <div class="row">
                <div class="column">
                    <p class="size-96 font-light text-gray-200 leading-none select-none" style="margin-left: -6px;">01</p>
                    <div class="spacer height-40"></div>
                    <h3 class="size-24 font-normal leading-13 mb-4">Strategic Approach</h3>
                    <p class="size-16 leading-17 text-gray-600 mb-10">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
                    </p>
                    <div>
                        <a href="#" class="inline-block size-13 uppercase tracking-150 font-semibold no-underline text-black pb-1 transition-all hover:opacity-60" style="border-bottom: 1px solid #000;">
                            Start a Project
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-240b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui bg-black text-white is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1640 content-py-100 pb-12 pt-10 v3 leading-17 size-17">
        <div class="row mb-12">
            <div class="column" style="width: 60%; flex: 0 0 auto;">
                <h2 class="font-light size-60 mb-6 leading-11">We deliver extraordinary results for visionary clients.</h2>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="text-gray-400 max-w-md">From concept to completion, our portfolio showcases a commitment to excellence and detail in every project we undertake.</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 20px;">
            <div class="column">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 1/1;">
                    <img src="[%IMAGE_PATH%]images/ai-Ut2xJ.jpg" alt="Minimal Design" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 opacity-90 hover:opacity-100">
                    <div class="absolute bottom-0 left-0 p-6">
                        <p class="size-14 uppercase tracking-widest text-white">Project Alpha</p>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 1/1;">
                    <img src="[%IMAGE_PATH%]images/ai-C3F7U.jpg" alt="Abstract Concept" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 opacity-90 hover:opacity-100">
                    <div class="absolute bottom-0 left-0 p-6">
                        <p class="size-14 uppercase tracking-widest text-white">Project Beta</p>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 1/1;">
                    <img src="[%IMAGE_PATH%]images/ai-cvPRF.jpg" alt="Interior Detail" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 opacity-90 hover:opacity-100">
                    <div class="absolute bottom-0 left-0 p-6">
                        <p class="size-14 uppercase tracking-widest text-white">Project Gamma</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-240c.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui box-autofit min-height-60 is-section-60">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-eQUHO.jpg&quot;); background-position: 50% 39%;" data-bg-lg="background-position: 50% 39%;" data-bg-ori="background-position: 50% 39%;"></div>
    </div>
</div>
<div class="is-section is-box type-system-ui min-height-80 is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 content-py-80 v3 size-16 leading-15">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-widest text-gray-500 font-semibold pb-4">Our Methodology</p>
                <h2 class="font-light size-48 leading-12 text-black" style="max-width: 600px;">Systematic approach to digital evolution.</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 24px;">
                <p class="size-14 font-bold text-black pb-6">01</p>
                <h3 class="size-24 font-normal leading-13 pb-3">Discovery</h3>
                <p class="text-gray-600">We analyze your current infrastructure to identify bottlenecks and opportunities for scalable growth.</p>
            </div>
            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 24px;">
                <p class="size-14 font-bold text-black pb-6">02</p>
                <h3 class="size-24 font-normal leading-13 pb-3">Strategy</h3>
                <p class="text-gray-600">Developing a comprehensive roadmap that aligns technical capabilities with your business objectives.</p>
            </div>
            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 24px;">
                <p class="size-14 font-bold text-black pb-6">03</p>
                <h3 class="size-24 font-normal leading-13 pb-3">Execution</h3>
                <p class="text-gray-600">Implementing solutions with precision, ensuring minimal downtime and maximum system integrity.</p>
            </div>
            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 24px;">
                <p class="size-14 font-bold text-black pb-6">04</p>
                <h3 class="size-24 font-normal leading-13 pb-3">Optimization</h3>
                <p class="text-gray-600">Continuous monitoring and refinement to ensure your systems evolve alongside your needs.</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-240d.png',
			'category': '5',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-kaLAG.jpg&quot;); opacity: 1; background-position: 73% 60%;" data-bg-lg="background-position: 73% 60%;" data-bg-ori="background-position: 73% 60%;"></div>
        </div>
    </div>
    <div class="is-box is-box-7 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 v3 pt-11 pb-11 size-18 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-150 text-gray-400 pb-2">Client Feedback</p>
                    <h2 class="size-60 font-light leading-11 text-black">Curated Reviews</h2>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                </div>
            </div>
            <div class="row" style="border-top: 1px solid #e5e5e5;">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row" style="gap: 30px;">
                <div class="column" style="width: 30%; flex: 0 0 auto;">
                    <p class="size-14 font-semibold text-black">Modern Villa</p>
                    <p class="size-14 text-gray-500">June 2023</p>
                </div>
                <div class="column">
                    <p class="size-18 leading-16 text-gray-800 pb-4">"An absolute pleasure to work with. The design process was collaborative and transparent, resulting in a home that feels uniquely ours."</p>
                    <p class="size-14 text-gray-400 uppercase tracking-wider">— Emilie Petersen</p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row" style="border-top: 1px solid #e5e5e5;">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row" style="gap: 30px;">
                <div class="column" style="width: 30%; flex: 0 0 auto;">
                    <p class="size-14 font-semibold text-black">Urban Loft</p>
                    <p class="size-14 text-gray-500">August 2023</p>
                </div>
                <div class="column">
                    <p class="size-18 leading-16 text-gray-800 pb-4">"They navigated complex zoning regulations with ease and delivered a renovation that maximized every inch of space."</p>
                    <p class="size-14 text-gray-400 uppercase tracking-wider">— Vincent Nelson</p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row" style="border-top: 1px solid #e5e5e5;">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row" style="gap: 30px;">
                <div class="column" style="width: 30%; flex: 0 0 auto;">
                    <p class="size-14 font-semibold text-black">Retail Space</p>
                    <p class="size-14 text-gray-500">October 2023</p>
                </div>
                <div class="column">
                    <p class="size-18 leading-16 text-gray-800 pb-4">"Our flagship store has never looked better. The traffic flow and lighting design have noticeably improved customer engagement."</p>
                    <p class="size-14 text-gray-400 uppercase tracking-wider">— Sofia Rossi</p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-240e.png',
			'category': '6',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-11 pt-11 leading-17 size-16">
        <div class="row">
            <div class="column">
                <p class="uppercase tracking-150 size-12 text-gray-400 mb-4">Help Center</p>
                <h1 class="size-96 leading-11 font-light tracking-tight text-black">Frequently<br>Asked Questions</h1>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap:40px">
            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 24px;">
                <p class="size-14 font-medium text-gray-400 pb-6">01</p>
                <h3 class="size-24 font-normal leading-13 pb-4">Booking &amp; Reservations</h3>
                <p class="leading-17 text-gray-600">Our booking process is seamless and secure. You can reserve your next adventure online or speak with our travel concierges for a tailored itinerary.</p>
                <div class="spacer height-20"></div>
                <p><a href="#" class="size-14 text-black underline border-transparent">Learn about bookings</a></p>
            </div>
            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 24px;">
                <p class="size-14 font-medium text-gray-400 pb-6">02</p>
                <h3 class="size-24 font-normal leading-13 pb-4">Travel Insurance</h3>
                <p class="leading-17 text-gray-600">We strongly recommend comprehensive travel insurance. We partner with top providers to offer coverage for cancellations, medical emergencies, and lost luggage.</p>
                <div class="spacer height-20"></div>
                <p><a href="#" class="size-14 text-black underline border-transparent">View insurance options</a></p>
            </div>
            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 24px;">
                <p class="size-14 font-medium text-gray-400 pb-6">03</p>
                <h3 class="size-24 font-normal leading-13 pb-4">Cancellations</h3>
                <p class="leading-17 text-gray-600">Life happens. Our flexible cancellation policy allows you to reschedule or refund your trip up to 14 days before departure for most packages.</p>
                <div class="spacer height-20"></div>
                <p><a href="#" class="size-14 text-black underline border-transparent">Read refund policy</a></p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-240f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-50">
    <div class="is-overlay" style="background-color: rgb(255, 255, 255);"></div>
    <div class="is-container is-content-1200 size-18 leading-14 size-17 leading-17 v3">
        <div class="row" style="gap:60px">
            <div class="column flex flex-col justify-center" style="width: 55%; flex: 0 0 auto;">
                <h2 class="size-42 font-normal leading-12 pb-4">Let's create something remarkable together.</h2>
                <p class="size-17 leading-17 text-gray-600">From initial concept to final delivery, we guide you through every step of the creative process. Our collaborative approach ensures your project exceeds expectations.</p>
            </div>
            <div class="column flex flex-col justify-center">
                <div class="space-x-2">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(255, 255, 255); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">Start a Project</a>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 leading-14 underline underline-offset-4 border-transparent" style="color: rgb(24, 24, 27);">View Our Work</a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-242b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 content-py-100 pt-8 pb-10 v3 leading-17 size-17 is-content-1600">
        <div class="row mb-10">
            <div class="column text-center">
                <h2 class="font-light size-48 text-black">Popular Destinations</h2>
                <div class="spacer height-20"></div>
                <p class="text-gray-500">Explore our most visited locations this season</p>
            </div>
        </div>
        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="w-full overflow-hidden relative mb-6" style="aspect-ratio: 3 / 4;">
                    <img src="[%IMAGE_PATH%]images/ai-LzH7S-editeTI3oTj.jpg" alt="Iceland" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="font-normal text-black mb-2 size-24 leading-12">Icelandic Highlands</h3>
                <p class="text-gray-500 size-14">7 Day Expedition</p>

            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative mb-6" style="aspect-ratio: 1 / 1;">
                    <img src="[%IMAGE_PATH%]images/ai-ruexQ-editkpGWbCh.jpg" alt="Swiss Alps" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="font-normal text-black mb-2 size-24 leading-12">Swiss Alps</h3>
                <p class="text-gray-500 size-14">Ski &amp; Wellness</p>

            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative mb-6" style="aspect-ratio: 3 / 2;">
                    <img src="[%IMAGE_PATH%]images/ai-rF5E9.jpg" alt="Norwegian Fjords" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="font-normal text-black mb-2 size-24 leading-12">Norwegian Fjords</h3>
                <p class="text-gray-500 size-14">Coastal Cruise</p>

            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-241b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui bg-gray-50 is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1500 v3 size-17 leading-16">
        <div class="row">
            <div class="column" style="width: 50%; flex: 0 0 auto;">
                <p class="size-12 uppercase tracking-150 text-gray-500 mb-4">Our Expertise</p>
                <h2 class="size-60 font-light text-black">Strategic Infrastructure</h2>
            </div>
            <div class="column flex flex-col justify-end">
                <p class="text-gray-600" style="max-width: 400px;">
                    Delivering robust technological frameworks for the modern enterprise. We build systems that scale.
                </p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 30px;">
            <div class="column">
                <div class="pb-4 border-t border-gray-300 pt-4" style="border-top: 1px solid #d1d5db;">
                    <span class="size-14 font-mono text-gray-400">01</span>
                </div>
                <div class="w-full overflow-hidden relative bg-white mb-6" style="aspect-ratio:16/10">
                    <img src="[%IMAGE_PATH%]images/ai-vizM0-editodxNh73.jpg" alt="Managed IT" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="size-24 font-medium pb-3">Managed IT Services</h3>
                <p class="text-gray-600">Proactive maintenance and monitoring to ensure your operations never miss a beat.</p>
            </div>
            <div class="column">
                <div class="pb-4 border-t border-gray-300 pt-4" style="border-top: 1px solid #d1d5db;">
                    <span class="size-14 font-mono text-gray-400">02</span>
                </div>
                <div class="w-full overflow-hidden relative bg-white mb-6" style="aspect-ratio:16/10">
                    <img src="[%IMAGE_PATH%]images/ai-lOGSK.jpg" alt="Network Solutions" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="size-24 font-medium pb-3">Network Architecture</h3>
                <p class="text-gray-600">Designing secure, high-speed connectivity frameworks for global communication.</p>
            </div>
            <div class="column">
                <div class="pb-4 border-t border-gray-300 pt-4" style="border-top: 1px solid #d1d5db;">
                    <span class="size-14 font-mono text-gray-400">03</span>
                </div>
                <div class="w-full overflow-hidden relative bg-white mb-6" style="aspect-ratio:16/10">
                    <img src="[%IMAGE_PATH%]images/ai-S7FNW-editMDWjTeQ.jpg" alt="Consulting" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <h3 class="size-24 font-medium pb-3">Strategic Consulting</h3>
                <p class="text-gray-600">Expert guidance on digital transformation and technology roadmap planning.</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-241c.png',
			'category': '4',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-6 box-autofit">
        <div class="is-overlay" style="background-color: #ffffff;"></div>
        <div class="is-container is-content-600 content-py-80 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 pb-2">Infrastructure</p>

                    <h2 class="size-42 font-light leading-12 pb-6">Global Scale</h2>
                    <p class="size-16 text-gray-600 leading-17">
                        Our network spans across continents, providing low-latency access and redundant failovers for mission-critical applications.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/3;">
                        <img src="[%IMAGE_PATH%]images/ai-vizM0-editFdlRQzd.jpg" alt="Server Room" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row">
                <div class="column" style="border-left: 2px solid #000; padding-left: 20px;">
                    <p class="size-60 font-light leading-none">430+</p>
                    <p class="size-14 uppercase tracking-widest text-gray-500 pt-2">Active Terminals</p>
                </div>
            </div>
        </div>
    </div>

    <div class="is-box is-box-6 box-autofit" style="background-color: #f9f9f9;">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 content-py-80 v3 size-17 leading-17">

            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 pb-2">Security</p>
                    <h2 class="size-42 font-light leading-12 pb-6">Protected Nodes</h2>
                    <p class="size-16 text-gray-600 leading-17">
                        Advanced encryption and real-time threat monitoring ensure that your data remains secure against evolving cyber threats.
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 4/3;">
                        <img src="[%IMAGE_PATH%]images/ai-db1Kw.jpg" alt="Security Systems" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-40"></div>
                </div>
            </div>
            <div class="row">
                <div class="column" style="border-left: 2px solid rgb(0, 0, 0); padding-left: 20px;">
                    <div class="flex gap-12">
                        <div>
                            <p class="size-60 font-light leading-none">718</p>
                            <p class="size-14 uppercase tracking-widest text-gray-500 pt-2">Secure Nodes</p>
                        </div>
                        <div>
                            <p class="size-60 font-light leading-none">1.1k</p>
                            <p class="size-14 uppercase tracking-widest text-gray-500 pt-2">Clients</p>
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
			'thumbnail': 'preview/item-241d.png',
			'category': '5',
			'html': `
<div class="is-section is-box is-section-100 type-system-ui is-light-text">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-lOGSK.jpg&quot;); background-position: 50% 60%;" data-bottom-top="transform:translateY(-70px) scale(1);" data-top-bottom="transform:translateY(50px) scale(1.1)">
            <div class="is-overlay-color bg-black opacity-12"></div>
        </div>
    </div>
    <div class="is-container is-content-1000 v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <div class="text-center pb-8">
                    <i class="bi bi-quote size-60 text-white opacity-50"></i>
                </div>
                <h2 class="size-60 font-light leading-12 text-center text-white pb-10">
                    "The strategic insight provided by the team was invaluable. They didn't just build a structure; they engineered a solution that has stabilized our entire network infrastructure."
                </h2>
                <p class="size-16 uppercase tracking-150 text-center text-white opacity-80">
                    Director of Operations, TechGlobal
                </p>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-241e.png',
			'category': '6',
			'html': `
<div class="is-section type-system-ui is-section-100">
    <div class="is-box is-box-5">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-FtUhV-editJIClFpu.jpg&quot;); background-position: center center; background-size: cover;"></div>
        </div>
    </div>

    <div class="is-box is-box-7">
        <div class="is-overlay" style="background-color: #f9f9f9;"></div>
        <div class="is-container is-content-760 content-py-80 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="uppercase tracking-150 size-12 text-gray-400 mb-4">Help Center</p>
                    <h2 class="size-42 leading-13 font-normal pb-2">Frequently
                        Asked Questions</h2>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-60"></div>
                </div>
            </div>

            <div class="row">
                <div class="column p-8 bg-white mb-4" style="border-left: 2px solid rgb(0, 0, 0);">
                    <h3 class="size-18 font-medium pb-2">What services does your agency provide?</h3>
                    <p class="leading-17 text-gray-600">
                        We specialize in comprehensive digital transformation, including UI/UX design, full-stack web development, and strategic branding. Our team works at the intersection of technology and aesthetics to build robust digital products.
                    </p>
                </div>
            </div>

            <div class="row">
                <div class="column p-8 bg-white mb-4" style="border-left: 2px solid transparent;">
                    <h3 class="size-18 font-medium pb-2">How do we begin a collaboration?</h3>
                    <p class="leading-17 text-gray-600">
                        The process starts with a discovery session where we analyze your goals and technical requirements. Following this, we provide a detailed proposal outlining the scope, timeline, and investment required for your project.
                    </p>
                </div>
            </div>

            <div class="row">
                <div class="column p-8 bg-white mb-4" style="border-left: 2px solid transparent;">
                    <h3 class="size-18 font-medium pb-2">What is the typical project timeline?</h3>
                    <p class="leading-17 text-gray-600">
                        Timelines vary by complexity. A standard corporate website typically takes 6-8 weeks, while complex web applications or e-commerce platforms may require 12-16 weeks from concept to launch.
                    </p>
                </div>
            </div>

        </div>
    </div>
</div>
		`
		},
 
		{
			'thumbnail': 'preview/item-241f.png',
			'category': '7',
			'html': `
<div class="is-section type-system-ui is-section-70">
    <div class="is-box is-box-6 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-fiv8L.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>
    <div class="is-box is-box-6">
        <div class="is-overlay"></div>
        <div class="is-container is-content-540 v3 pb-14 pt-11 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <div class="pb-4 border-b border-gray-200 mb-6" style="border-bottom: 1px solid #e5e5e5;">
                        <div class="flex justify-between items-end">
                            <p class="uppercase tracking-150 size-12 text-gray-400 mb-0">Collaboration</p>
                            <p class="size-12 text-gray-400 mb-0">01</p>
                        </div>
                    </div>
                    <h2 class="size-60 font-light leading-11 text-black pb-6">Let's build something extraordinary.</h2>
                    <p class="leading-17 text-gray-600 pb-8">
                        We partner with visionaries to define the future. Our approach combines strategic insight with world-class design to create lasting impact.
                    </p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-7 size-15 leading-14 border-black hover:bg-black hover:text-white border-current hover:border-transparent" style="color: rgb(0, 0, 0);" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                            Start a Project
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-242a.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 leading-17 size-17 v3">
        <div class="row">
            <div class="column">
                <div class="flex justify-between items-end pb-6" style="border-bottom: 1px solid #000;">
                    <p class="size-12 uppercase tracking-widest font-bold">Expedition 01</p>
                    <p class="size-12 uppercase tracking-widest text-gray-500">Nordic Region</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 41.4179%; flex: 0 0 auto;">
                <h1 class="size-80 leading-11 font-light tracking-tight pb-8">
                    Silent<br>Horizons.
                </h1>
                <p class="size-18 text-gray-600 leading-16 pb-8" style="max-width: 480px;">
                    Disconnect to reconnect. Our curated Nordic expeditions offer a rare glimpse into the untouched wilderness, where time stands still and nature speaks.
                </p>

                <div class="flex items-center pb-12">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-8 size-14 uppercase tracking-widest leading-14 rounded-full border-black text-black hover:bg-black hover:text-white" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                        View Itinerary
                    </a>
                </div>

                <div class="row" style="gap: 20px;">
                    <div class="column">
                        <div class="pb-2" style="border-bottom: 1px solid #eee;">
                            <p class="size-12 uppercase text-gray-400 tracking-widest">Duration</p>
                            <p class="size-14">14 Days</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="pb-2" style="border-bottom: 1px solid #eee;">
                            <p class="size-12 uppercase text-gray-400 tracking-widest">Group Size</p>
                            <p class="size-14">Max 6 People</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="row" style="gap: 30px;">
                    <div class="column" style="width: 55%; flex: 0 0 auto;">
                        <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 3 / 4;">
                            <img src="[%IMAGE_PATH%]images/ai-LBMuG2.jpg" alt="Portrait" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                        </div>
                        <p class="size-12 text-gray-400 pt-3 text-right">01 — Highlands</p>
                    </div>
                    <div class="column flex flex-col justify-end">
                        <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio:1/1">
                            <img src="[%IMAGE_PATH%]images/ai-I8RfR.jpg" alt="Landscape" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                        </div>
                        <p class="size-12 text-gray-400">02 — Coastline</p>
                        <div class="spacer height-40"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-242c.png',
			'category': '4',
			'html': `
<div class="is-section is-box type-system-ui box-autofit is-section-70 min-height-50">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-q76Vr.jpg'); background-position: 50% 37%;"></div>
    </div>
</div>
<div class="is-section is-box type-system-ui box-autofit is-section-50">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 content-py-100 v3 pt-10 pb-14 size-16 leading-15">
        <div class="row">
            <div class="column">
                <h2 class="font-light leading-none size-48 pb-12">We're here to get you there.</h2>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column p-8 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <div class="pb-6">
                    <i class="bi bi-airplane size-32 text-black"></i>
                </div>
                <h3 class="font-medium size-20 pb-3">Global Logistics</h3>
                <p class="text-gray-600 leading-16">Seamless air freight solutions connecting major hubs with precision timing.</p>
            </div>
            <div class="column p-8 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <div class="pb-6">
                    <i class="bi bi-geo-alt size-32 text-black"></i>
                </div>
                <h3 class="font-medium size-20 pb-3">Real-time Tracking</h3>
                <p class="text-gray-600 leading-16">Advanced GPS integration for complete visibility of your assets anywhere.</p>
            </div>
            <div class="column p-8 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <div class="pb-6">
                    <i class="bi bi-house-door size-32 text-black"></i>
                </div>
                <h3 class="font-medium size-20 pb-3">Warehousing</h3>
                <p class="text-gray-600 leading-16">Secure, climate-controlled storage facilities for sensitive inventory.</p>
            </div>
            <div class="column p-8 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <div class="pb-6">
                    <i class="bi bi-star size-32 text-black"></i>
                </div>
                <h3 class="font-medium size-20 pb-3">Premium Care</h3>
                <p class="text-gray-600 leading-16">White-glove handling services for high-value and fragile shipments.</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-242d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-20 pt-14 size-17 leading-17">
        <div class="row">
            <div class="column">
                <p class="uppercase tracking-150 size-12 text-gray-400 mb-4">Reviews</p>
                <h2 class="size-72 font-light leading-12">Traveler Stories</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-20"></div>
            </div>
        </div>

        <div class="row items-center" style="gap: 60px;">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:4/5">
                    <img src="[%IMAGE_PATH%]images/ai-lhqln.jpg" alt="Traveler" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
            <div class="column">
                <div class="pb-6">
                    <i class="bi bi-quote size-42 text-gray-300"></i>
                </div>
                <h3 class="size-32 leading-13 font-light pb-6">"The attention to detail was incredible. From the private transfers to the curated local experiences, every moment felt exclusive and authentic."</h3>
                <p class="size-14 font-bold uppercase tracking-wide">Elena Rodriguez</p>
                <p class="size-14 text-gray-500">Kyoto &amp; Tokyo Tour, 2023</p>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row items-center" style="gap: 60px; flex-direction: row-reverse;">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:4/5">
                    <img src="[%IMAGE_PATH%]images/ai-EwZnx.jpg" alt="Traveler" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
            <div class="column">
                <div class="pb-6">
                    <i class="bi bi-quote size-42 text-gray-300"></i>
                </div>
                <h3 class="size-32 leading-13 font-light pb-6">"I've traveled with many agencies, but this was on another level. The guides were passionate historians who brought the ancient ruins to life."</h3>
                <p class="size-14 font-bold uppercase tracking-wide">Marcus Thorne</p>
                <p class="size-14 text-gray-500">Athens &amp; Santorini, 2023</p>
            </div>
        </div>

    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-242e.png',
			'category': '6',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 content-py-80 v3 leading-17 size-17">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Technical Support</p>
                <h2 class="size-48 leading-12 font-light">Platform &amp; Implementation</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column">
                <div class="pb-6" style="border-bottom: 1px solid #333;">
                    <p class="size-14 font-mono text-gray-400 pb-4">001</p>
                    <h3 class="size-20 font-normal pb-3">Integration Capabilities</h3>
                    <p class="leading-17 text-gray-600">
                        Our platform supports RESTful API and GraphQL integration, allowing seamless data synchronization with your existing CRM, ERP, and marketing tools.
                    </p>
                </div>
                <div class="spacer height-40"></div>
                <div class="pb-6" style="border-bottom: 1px solid #333;">
                    <p class="size-14 font-mono text-gray-400 pb-4">002</p>
                    <h3 class="size-20 font-normal pb-3">Security Protocols</h3>
                    <p class="leading-17 text-gray-600">
                        We adhere to SOC 2 Type II standards. All data is encrypted at rest and in transit using TLS 1.3 protocols to ensure maximum security for your enterprise data.
                    </p>
                </div>
            </div>

            <div class="column">
                <div class="pb-6" style="border-bottom: 1px solid #333;">
                    <p class="size-14 font-mono text-gray-400 pb-4">003</p>
                    <h3 class="size-20 font-normal pb-3">Custom Development</h3>
                    <p class="leading-17 text-gray-600">
                        Beyond standard features, we offer bespoke module development. Our engineering team can build custom functionality tailored to your specific business logic.
                    </p>
                </div>
                <div class="spacer height-40"></div>
                <div class="pb-6" style="border-bottom: 1px solid #333;">
                    <p class="size-14 font-mono text-gray-400 pb-4">004</p>
                    <h3 class="size-20 font-normal pb-3">Server Requirements</h3>
                    <p class="leading-17 text-gray-600">
                        The solution is cloud-native and agnostic. It can be deployed on AWS, Azure, or Google Cloud, or hosted on-premise depending on your compliance needs.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-242f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-60">
    <div class="is-overlay" style="background-color: rgb(248, 248, 248);"></div>
    <div class="is-container is-content-760 v3 pb-16 pt-16 size-17 leading-17">
        <div class="p-12 bg-white shadow-sm" style="box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
            <div class="row">
                <div class="column flex flex-col items-center">
                    <div class="pb-6 text-center">
                        <i class="bi bi-geo-alt size-32 text-gray-400"></i>
                    </div>
                    <h2 class="text-center font-light size-48 leading-12 pb-4">Where to next?</h2>
                    <div class="spacer height-20"></div>
                    <p class="text-center leading-17 text-gray-600 pb-8">
                        Curated expeditions for the modern explorer. From the peaks of the Alps to the coast of Amalfi, discover the world's most breathtaking destinations.
                    </p>
                    <div class="text-center">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-8 size-15 leading-14 border-transparent hover:border-transparent" style="color: rgb(255, 255, 255); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">
                            Book Your Journey
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-235a.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom edge-y-4">
    <div class="is-overlay" style="background-color: #000;">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-RVMvr.jpg'); background-position: 50% 60%; opacity: 0.8;">
            <div class="is-overlay-color" style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);"></div>
        </div>
    </div>
    <div class="is-container is-content-1400 size-17 leading-17 v3">
        <div class="row items-end" style="gap: 40px;">
            <div class="column" style="width: 60%; flex: 0 0 auto;">
                <p class="size-14 uppercase tracking-widest text-white pb-6 flex items-center">
                    <span style="width: 40px; height: 1px; background: white; display: inline-block; margin-right: 15px;"></span>
                    Premium Residences
                </p>
                <h1 class="size-96 leading-11 font-light text-white tracking-tight pb-2">
                    The Art of<br>Coming Home.
                </h1>
            </div>
            <div class="column pb-4">
                <div class="p-8 box-border" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
                    <p class="size-20 text-white font-light pb-4">Residence 8B</p>
                    <p class="size-15 text-gray-300 pb-8 leading-16">
                        Experience elevated living with panoramic city views. Designed for those who appreciate silence in the center of it all.
                    </p>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-8 size-14 uppercase tracking-widest leading-14 rounded-full border-white text-white hover:bg-white hover:text-black">
                        Schedule Tour
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-229b.png',
			'category': '3',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-6 is-content-bottom edge-y-2 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-Y3shy.jpg'); background-position: center;">
                <div class="is-overlay-color opacity-0"></div>
            </div>
        </div>
    </div>

    <div class="is-box is-box-6 bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <h2 class="font-light leading-11 size-54">Fields of Expertise</h2>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="spacer height-80"></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <p class="text-gray-500 mb-12">
                        We operate at the intersection of finance and technology, building secure ecosystems for the digital economy. Our multidisciplinary approach ensures holistic solutions.
                    </p>

                    <div class="py-6 border-t border-gray-200" style="border-top: 1px solid #e5e5e5;">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="size-24 font-normal text-black">Fintech Innovation</h3>
                            <span class="size-12 text-gray-400 uppercase tracking-150">01</span>
                        </div>
                        <p class="size-15 text-gray-600">Next-generation payment processing and blockchain integration.</p>
                    </div>

                    <div class="py-6 border-t border-gray-200" style="border-top: 1px solid #e5e5e5;">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="size-24 font-normal text-black">Secure Messaging</h3>
                            <span class="size-12 text-gray-400 uppercase tracking-150">02</span>
                        </div>
                        <p class="size-15 text-gray-600">End-to-end encrypted communication protocols for enterprise.</p>
                    </div>

                    <div class="py-6 border-t border-gray-200 border-b" style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="size-24 font-normal text-black">Internet of Things</h3>
                            <span class="size-12 text-gray-400 uppercase tracking-150">03</span>
                        </div>
                        <p class="size-15 text-gray-600">Connecting physical devices to digital intelligence networks.</p>
                    </div>

                    <div class="spacer height-40"></div>
                    <div class="mt-12">
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-2 px-6 size-15 border-transparent hover:border-transparent" style="color: rgb(24, 24, 27); background-color: rgb(240, 240, 241);" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';" data-bg="rgb(240, 240, 241)" data-hover-bg="rgb(236, 236, 238)" data-keep-background-color="" data-keep-background="">
                            View All Services
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-235b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui text-white is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 h-full flex flex-col justify-center is-content-1480 v3 size-18 leading-17 pb-10">
        <div class="row">
            <div class="column">
                <h2 class="text-center tracking-tight font-light mb-12 size-54">Move to what moves you.</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 20px;">
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-900" style="aspect-ratio:2/3">
                    <img src="[%IMAGE_PATH%]images/ai-OZKux-editOad8P7w.jpg" alt="Motion 1" class="w-full h-full object-cover transition duration-1500 hover:scale-105">
                </div>
                <p class="size-12 uppercase tracking-150 text-gray-400 mt-4 text-center">Urban Flow</p>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-900" style="aspect-ratio:2/3">
                    <img src="[%IMAGE_PATH%]images/ai-4NlMQ.jpg" alt="Motion 2" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-12 uppercase tracking-150 text-gray-400 mt-4 text-center">Stillness</p>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-900" style="aspect-ratio:2/3">
                    <img src="[%IMAGE_PATH%]images/ai-kyxGr-editsa5iUrS.jpg" alt="Motion 3" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-12 uppercase tracking-150 text-gray-400 mt-4 text-center">Connection</p>
            </div>
        </div>
    </div>
</div>

		`
		},
		{
			'thumbnail': 'preview/item-235c.png',
			'category': '4',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-6 box-autofit bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 content-py-100 v3 leading-16 size-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 font-semibold pb-4">Proposition</p>
                    <h2 class="font-light size-48 leading-12 pb-8">Value we deliver.</h2>
                </div>
            </div>

            <div class="row">
                <div class="column pb-6 pt-6" style="border-top: 1px solid #f0f0f0;">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="size-20 font-medium pb-2">Rapid Deployment</h3>
                            <p class="text-gray-600 max-w-md">Systems operational within 48 hours of approval.</p>
                        </div>
                        <i class="bi bi-arrow-right text-gray-400"></i>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column pb-6 pt-6" style="border-top: 1px solid rgb(240, 240, 240);">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="size-20 font-medium pb-2">Asset Protection</h3>
                            <p class="text-gray-600 max-w-md">Comprehensive insurance coverage for all transit items.</p>
                        </div>
                        <i class="bi bi-arrow-right text-gray-400"></i>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column pb-6 pt-6" style="border-top: 1px solid rgb(240, 240, 240);">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="size-20 font-medium pb-2">Custom Solutions</h3>
                            <p class="text-gray-600 max-w-md">Tailored logistics frameworks for unique requirements.</p>
                        </div>
                        <i class="bi bi-arrow-right text-gray-400"></i>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column pb-6 pt-6" style="border-top: 1px solid rgb(240, 240, 240); border-bottom: 1px solid rgb(240, 240, 240);">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="size-20 font-medium pb-2">Cost Efficiency</h3>
                            <p class="text-gray-600 max-w-md">Optimized routing to ensure the best market rates.</p>
                        </div>
                        <i class="bi bi-arrow-right text-gray-400"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="is-box is-box-6 box-autofit min-height-60 hover-zoom">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-Dv3Cv.jpg'); background-position: 41% 60%;">
                <div class="is-overlay-color opacity-0"></div>
            </div>
        </div>
        <div class="is-container flex flex-col justify-center items-center h-full v3">
            <div class="row">
                <div class="column">
                    <a href="#" class="inline-block transition-transform hover:scale-110">
                        <i class="bi bi-play-circle size-80 text-white opacity-90 hover:opacity-100"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-235d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui bg-gray-50 is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v3 pb-16 pt-8 is-content-1440 size-17 leading-15">
        <div class="row">
            <div class="column">
                <h2 class="size-96 font-light leading-11 text-black tracking-tight" style="margin-left: -4px;">Impact.</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column" style="border-top: 1px solid rgb(0, 0, 0); padding-top: 20px;">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">Strategy</p>
                <p class="size-18 leading-16 text-gray-800 pb-8">"The strategic overhaul provided by the consultancy was pivotal. We saw a 40% increase in efficiency within the first quarter alone."</p>
                <p class="size-14 font-semibold text-black">Global Corp</p>
            </div>
            <div class="column" style="border-top: 1px solid rgb(0, 0, 0); padding-top: 20px;">
                <p class="size-12 uppercase tracking-150 text-gray-500 pb-4">Execution</p>
                <p class="size-18 leading-16 text-gray-800 pb-8">"Precise execution and unwavering commitment to quality. A partner you can trust with your most critical projects."</p>
                <p class="size-14 font-semibold text-black">Future Systems</p>
            </div>
            <div class="column" style="width: 37.4342%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative bg-gray-200" style="aspect-ratio: 4/5;">
                    <img src="[%IMAGE_PATH%]images/ai-UChAJ.jpg" alt="Client Project" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-235f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-content-top edge-y-2 is-section-80 is-light-text hover-zoom">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-qm3HY.jpg'); background-position: 50% 60%;">
            <div class="is-overlay-color opacity-20" style="background-color: #000;"></div>
        </div>
    </div>
    <div class="is-container is-content-1200 text-center v3 size-17 leading-17">
        <div class="row">
            <div class="column">
                <p class="uppercase tracking-widest size-14 text-white opacity-80 pb-6">Est. 2024</p>
                <h2 class="size-80 font-light text-white leading-11 pb-8">Elevate your brand<br>to new heights.</h2>
                <div class="spacer height-20"></div>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-10 size-16 leading-16 border-white hover:bg-white hover:text-black" style="color: #ffffff;">
                        Explore Collection
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-236a.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 size-17 leading-17 v3">
        <div class="row" style="gap: 60px;">
            <div class="column flex flex-col justify-center" style="width: 40%; flex: 0 0 auto;">
                <div style="border-top: 1px solid #000; width: 60px; margin-bottom: 30px;"></div>
                <p class="size-14 uppercase tracking-widest text-gray-500 pb-4">The Collection</p>
                <h1 class="size-60 leading-12 font-light pb-6">Bring Calm to Every Corner</h1>
                <p class="size-17 leading-17 text-gray-600">Our curated vases and minimalist arrangements are designed to elevate your everyday spaces. Thoughtfully styled to blend serenity with modern living.</p>
                <div class="spacer height-60"></div>
                <div class="space-x-2">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-8 size-15 leading-14 rounded-full border-black bg-black text-white hover:opacity-80">Shop Now</a>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-8 size-15 leading-14 rounded-full border-gray-300 text-black hover:border-black">Lookbook</a>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:4/5">
                    <img src="[%IMAGE_PATH%]images/ai-6KJRn.jpg" alt="Vases" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-236b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-auto">
    <div class="is-overlay"></div>
    <div class="is-container v2 content-py-80 is-content-1380 v3 leading-17 size-18">
        <div class="row">
            <div class="column">
                <h2 class="size-120 font-light leading-09 text-gray-100 select-none" style="position: absolute; top: -40px; left: 0; z-index: 0;">WORKS</h2>
                <div class="spacer height-20"></div>
                <div style="position: relative; z-index: 1;">
                    <p class="size-12 uppercase tracking-150 text-black mb-2">Selected Projects</p>
                    <h2 class="size-48 font-medium">Recent Commissions</h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 60px;">
            <div class="column">
                <div class="mb-12">
                    <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio:4/3">
                        <img src="[%IMAGE_PATH%]images/ai-dafDP.jpg" alt="Project 1" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <h4 class="font-medium">Aesop Headquarters</h4>
                        <p class="size-14 text-gray-500">Tokyo</p>
                    </div>
                </div>

                <div class="mb-12">
                    <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio:3/4">
                        <img src="[%IMAGE_PATH%]images/ai-7bWtw.jpg" alt="Project 2" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <h4 class="font-medium">Mono Residence</h4>
                        <p class="size-14 text-gray-500">Copenhagen</p>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="spacer height-80 xs-hidden"></div>

                <div class="mb-12">
                    <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio:3/4">
                        <img src="[%IMAGE_PATH%]images/ai-Ut2xJ.jpg" alt="Project 3" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <h4 class="font-medium">The Void Gallery</h4>
                        <p class="size-14 text-gray-500">Berlin</p>
                    </div>
                </div>

                <div class="mb-12">
                    <div class="w-full overflow-hidden relative bg-gray-50 mb-4" style="aspect-ratio:4/3">
                        <img src="[%IMAGE_PATH%]images/ai-KbaGV.jpg" alt="Project 4" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-2">
                        <h4 class="font-medium">Nordic Light Office</h4>
                        <p class="size-14 text-gray-500">Oslo</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-236c.png',
			'category': '4',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-5 box-autofit min-height-60">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-lOGSK.jpg'); background-position: 50% 60%;"></div>
        </div>
    </div>

    <div class="is-box is-box-7 box-autofit bg-gray-50">
        <div class="is-overlay"></div>
        <div class="is-container is-content-800 content-py-100 v3 size-17 leading-17">
            <div class="row">
                <div class="column">
                    <p class="size-12 uppercase tracking-widest text-gray-400 font-semibold pb-4">Services</p>
                    <h2 class="size-42 font-light leading-12 pb-10">Technical Capabilities</h2>
                </div>
            </div>

            <div class="row" style="gap: 30px;">
                <div class="column" style="width: 10%; flex: 0 0 auto;">
                    <p class="size-24 font-light text-gray-400">01</p>
                </div>
                <div class="column">
                    <h3 class="size-24 font-normal pb-3">IT Support</h3>
                    <p class="size-16 text-gray-600 leading-17 pb-8" style="border-bottom: 1px solid #e0e0e0;">
                        24/7 dedicated support teams ready to resolve hardware and software issues remotely or on-site to minimize operational disruption.
                    </p>
                </div>
            </div>

            <div class="row pt-8" style="gap: 30px;">
                <div class="column" style="width: 10%; flex: 0 0 auto;">
                    <p class="size-24 font-light text-gray-400">02</p>
                </div>
                <div class="column">
                    <h3 class="size-24 font-normal pb-3">Cloud Consulting</h3>
                    <p class="size-16 text-gray-600 leading-17 pb-8" style="border-bottom: 1px solid #e0e0e0;">
                        Strategic migration planning and architecture design for scalable, secure cloud environments on AWS, Azure, or Google Cloud.
                    </p>
                </div>
            </div>

            <div class="row pt-8" style="gap: 30px;">
                <div class="column" style="width: 10%; flex: 0 0 auto;">
                    <p class="size-24 font-light text-gray-400">03</p>
                </div>
                <div class="column">
                    <h3 class="size-24 font-normal pb-3">Infrastructure Management</h3>
                    <p class="size-16 text-gray-600 leading-17 pb-8" style="border-bottom: 1px solid #e0e0e0;">
                        End-to-end lifecycle management of physical and virtual assets, ensuring optimal performance and compliance standards.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

		`
		},
		{
			'thumbnail': 'preview/item-236d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 pt-11 pb-11 size-17 leading-15">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-2 text-center">Community</p>
                <h2 class="size-48 font-light leading-12 text-black text-center">Voices from the Field</h2>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column flex flex-col items-center">
                <div class="w-3/4 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-3DyrB-editYuuh5W8.jpg" alt="Portrait" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-16 leading-16 text-gray-800 pb-4 text-center">"A transformative experience that redefined our brand identity."</p>
                <p class="size-13 text-gray-500 uppercase tracking-wider text-center">Anna K., Director</p>
            </div>
            <div class="column flex flex-col items-center">
                <div class="w-3/4 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-4643D-editBX7oTCS.jpg" alt="Portrait" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-16 leading-16 text-gray-800 pb-4 text-center">"Professionalism at its finest. They delivered ahead of schedule."</p>
                <p class="size-13 text-gray-500 uppercase tracking-wider text-center">Sophia L., Architect</p>
            </div>
            <div class="column flex flex-col items-center">
                <div class="w-3/4 overflow-hidden relative bg-gray-50 mb-6" style="aspect-ratio: 1 / 1; border-radius: 1000px;">
                    <img src="[%IMAGE_PATH%]images/ai-3A86k-editRvJJp05.jpg" alt="Portrait" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <p class="size-16 leading-16 text-gray-800 pb-4 text-center">"Creative solutions that actually work in the real world."</p>
                <p class="size-13 text-gray-500 uppercase tracking-wider text-center">Vincent N., Founder</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-236f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-70">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pt-16 pb-12 size-17 leading-17">
        <div class="row" style="gap:60px">
            <div class="column flex flex-col justify-center" style="width: 40%; flex: 0 0 auto;">
                <div class="pb-2 border-b border-gray-200 mb-8" style="border-bottom: 1px solid #000;">
                    <p class="uppercase tracking-150 size-12 text-black font-bold">Partnership</p>
                </div>
                <h2 class="size-54 leading-12 font-normal pb-6">Connect and collaborate to create change.</h2>
                <p class="leading-17 text-gray-600 pb-8">
                    We believe in the power of collective intelligence. Join our network of industry leaders and innovators to tackle the world's most pressing challenges.
                </p>
                <div>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer border-2 border-solid mt-2 mb-1 font-normal tracking-normal py-2 size-15 leading-14 underline underline-offset-4 border-transparent text-black" style="padding-left:0;">
                        Get Started →
                    </a>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:4/3">
                    <img src="[%IMAGE_PATH%]images/ai-x1gtv.jpg" alt="Team Collaboration" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-244a.png',
			'category': '1',
			'html': `
<div class="is-section is-box is-section-100 box-autofit type-system-ui is-content-bottom edge-y-0">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-9JTwR.jpg'); background-position: 50% 60%;">
            <div class="is-overlay-color opacity-50" style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);"></div>
        </div>
    </div>
    <div class="is-container v2 size-18 is-content-1400 content-pb-60 leading-17 v3">
        <div class="row" style="gap: 60px;">
            <div class="column flex flex-col justify-center">
                <h1 class="size-96 font-normal text-white tracking-tight leading-11">
                    Taste the<br><span style="font-style: italic; font-family: serif;">Untamed.</span>
                </h1>
                <p class="size-13 uppercase tracking-widest text-gray-300 pb-6">Seasonal Tasting Menu</p>
            </div>
            <div class="column flex flex-col justify-center" style="width: 40%; flex: 0 0 auto;">
                <p class="size-18 text-gray-300 pb-10 font-light text-left" style="max-width: 500px;">
                    A narrative of flavors crafted from the wild. Experience the story of the season on your plate.
                </p>

                <div class="space-x-2">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-10 size-15 leading-14 rounded-full border-white bg-white text-black hover:bg-transparent hover:text-white">
                        Reserve Table
                    </a>
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid py-3 px-10 size-15 leading-14 rounded-full border-white text-white hover:bg-white hover:text-black">
                        View Menu
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-244b.png',
			'category': '3',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container v2 is-content-1360 v3 size-17 leading-15 pb-16">
        <div class="row">
            <div class="column">
                <div class="w-px h-12 bg-black mb-6"></div>
                <h2 class="text-center size-48 font-normal uppercase tracking-wide">Culinary Arts</h2>
                <p class="text-center text-gray-500 mt-4 italic font-serif">"A recipe has no soul. You, as the cook, must bring soul to the recipe."</p>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column flex flex-col justify-between h-full">
                <div class="pb-8">
                    <h3 class="size-24 font-normal mb-4">Sourcing</h3>
                    <p class="text-gray-600">We believe in the integrity of ingredients. Our partnerships with local farmers ensure that every dish begins with the purest elements of the season.</p>
                    <div class="w-8 h-px bg-gray-300 mt-6"></div>
                </div>
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-tN3Ki.jpg" alt="Ingredients" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>

            <div class="column flex flex-col justify-between h-full">
                <div class="w-full overflow-hidden relative bg-gray-50 mb-8" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-bL1SB.jpg" alt="Plating" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
                <div>
                    <h3 class="size-24 font-normal mb-4">Craftsmanship</h3>
                    <p class="text-gray-600">The kitchen is our studio. Every plate is a canvas where texture, flavor, and color converge to create an edible masterpiece.</p>
                    <div class="w-8 h-px bg-gray-300 mt-6"></div>
                </div>
            </div>

            <div class="column flex flex-col justify-between h-full">
                <div class="pb-8">
                    <h3 class="size-24 font-normal mb-4">Experience</h3>
                    <p class="text-gray-600">Dining is a communal act. We curate environments that foster connection, conversation, and the shared joy of nourishment.</p>
                    <div class="w-8 h-px bg-gray-300 mt-6"></div>
                </div>
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio:3/4">
                    <img src="[%IMAGE_PATH%]images/ai-Ttnkm.jpg" alt="Atmosphere" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-244c.png',
			'category': '4',
			'html': `
<div class="is-section is-section-100 type-system-ui">
    <div class="is-box is-box-6 box-autofit min-height-60 hover-zoom is-content-top edge-y-0-75">
        <div class="is-overlay">
            <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-bL1SB.jpg'); background-position: 50% 60%;">
                <div class="is-overlay-color bg-black opacity-20"></div>
            </div>
        </div>
        <div class="is-container justify-center items-center v3 leading-17 size-16 is-content-480">
            <div class="row">
                <div class="column text-center">
                    <h2 class="size-60 font-light text-white tracking-tight">The Art of Food</h2>
                    <p class="size-16 text-white opacity-90 pt-4 tracking-wide uppercase">Culinary Excellence</p>
                </div>
            </div>
        </div>
    </div>

    <div class="is-box is-box-6 box-autofit bg-white">
        <div class="is-overlay"></div>
        <div class="is-container is-content-600 content-py-80 v3 size-16 leading-15">

            <div class="row">
                <div class="column">
                    <div class="flex flex-col items-center text-center p-8 border border-gray-100 hover:border-gray-300 transition-colors">
                        <i class="bi bi-egg-fried size-42 text-black pb-4"></i>
                        <h3 class="size-20 font-medium pb-2">Fresh Ingredients</h3>
                        <p class="text-gray-600">Sourced daily from local organic farms.</p>
                    </div>
                </div>
                <div class="column">
                </div>
            </div>

            <div class="row">
                <div class="column">
                </div>
                <div class="column">
                    <div class="flex flex-col items-center text-center p-8 border border-gray-100 hover:border-gray-300 transition-colors mt-8">
                        <i class="bi bi-book size-42 text-black pb-4"></i>
                        <h3 class="size-20 font-medium pb-2">Curated Recipes</h3>
                        <p class="text-gray-600">Developed by award-winning chefs.</p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="column">
                    <div class="flex flex-col items-center text-center p-8 border border-gray-100 hover:border-gray-300 transition-colors mt-8">
                        <i class="bi bi-heart size-42 text-black pb-4"></i>
                        <h3 class="size-20 font-medium pb-2">Superb Service</h3>
                        <p class="text-gray-600">Attention to detail in every interaction.</p>
                    </div>
                </div>
                <div class="column">
                </div>
            </div>

        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-244d.png',
			'category': '5',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 pt-14 pb-14 size-17 leading-15">
        <div class="row" style="gap: 60px;">
            <div class="column" style="width: 45%; flex: 0 0 auto;">
                <div class="w-full overflow-hidden relative" style="aspect-ratio: 3/4;">
                    <img src="[%IMAGE_PATH%]images/ai-EwZnx.jpg" alt="Featured Client" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
            <div class="column flex flex-col justify-center">
                <i class="bi bi-quote size-48 text-gray-300 pb-6"></i>
                <h3 class="size-48 font-light leading-12 text-black pb-8">"We needed a partner who could understand the nuance of our heritage while pushing us into the future. They struck that balance perfectly."</h3>
                <div style="width: 60px; height: 1px; background: #000; margin-bottom: 20px;"></div>
                <p class="size-18 font-medium text-black">Nathan Williams</p>
                <p class="text-gray-500">Curator, Modern Arts Museum</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-244e.png',
			'category': '6',
			'html': `
<div class="is-section is-box type-system-ui is-section-50">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-XG1Am.jpg&quot;); background-position: 50% 50%;"></div>
    </div>
</div>
<div class="is-section is-box type-system-ui is-section-50">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 pb-16 pt-9 size-16 leading-17">
        <div class="row">
            <div class="column">
                <h2 class="size-48 font-light leading-12 pb-10 text-center">Support Channels</h2>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column p-10 bg-gray-50 text-center transition-all hover:bg-gray-100">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Availability</p>
                <h3 class="size-24 font-normal pb-2">Opening Hours</h3>
                <p class="size-16 text-gray-600">Mon - Fri: 08:00 - 20:00<br>Sat: 10:00 - 16:00</p>
            </div>
            <div class="column p-10 bg-gray-50 text-center transition-all hover:bg-gray-100">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Online</p>
                <h3 class="size-24 font-normal pb-2">Live Chat</h3>
                <p class="size-16 text-gray-600">Available 24/7 for urgent<br>travel assistance.</p>
            </div>
            <div class="column p-10 bg-gray-50 text-center transition-all hover:bg-gray-100">
                <p class="size-12 uppercase tracking-150 text-gray-400 pb-4">Vouchers</p>
                <h3 class="size-24 font-normal pb-2">Gift Cards</h3>
                <p class="size-16 text-gray-600">Redeem or purchase travel<br>credits online.</p>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-244f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-100 is-content-bottom edge-y-2 hover-zoom">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url('[%IMAGE_PATH%]images/ai-jRxUW.jpg'); background-position: 50% 44%;">
            <div class="is-overlay-color opacity-5" style="background-color: #000;"></div>
        </div>
    </div>
    <div class="is-container is-content-left v3 is-content-1200 leading-17 size-17">
        <div class="row">
            <div class="column" style="width: 60%; flex: 0 0 auto;">
                <div class="p-10 bg-white" style="backdrop-filter: blur(10px); background-color: rgba(255,255,255,0.95);">
                    <p class="uppercase tracking-150 size-12 text-gray-500 pb-4">Fine Dining</p>
                    <h2 class="font-light size-64 leading-11 pb-6 text-black">We're always in the mood for food.</h2>
                    <p class="leading-17 text-gray-600 pb-8 max-w-lg">
                        Experience a symphony of flavors crafted with passion and precision. Our seasonal menu celebrates the finest local ingredients.
                    </p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-none py-3 px-8 size-15 leading-14 border-black hover:bg-black hover:text-white border-current hover:border-transparent" style="color: rgb(0, 0, 0);" data-hover-bg="rgb(0, 0, 0)" data-bg="" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor=''">
                            Reserve a Table
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-229a.png',
			'category': '1',
			'html': `
<div class="is-section is-box type-system-ui is-section-100">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1400 v3 size-18 leading-17 pt-11 pb-16">
        <div class="row">
            <div class="column">
                <p class="size-14 uppercase tracking-150 font-bold text-black mb-6">/// Mobile Development</p>
                <h1 class="size-96 font-medium leading-10 tracking-tight mb-8" style="max-width: 1000px;">
                    Next generation apps<br><span class="text-gray-400">with a spark of creativity.</span>
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-180"></div>
            </div>
        </div>
        <div class="row" style="gap: 40px;">
            <div class="column" style="width: 30%; flex: 0 0 auto;">
                <div class="spacer height-20"></div>
                <p class="text-gray-600 mb-8">
                    We build native mobile applications that scale. From initial concept to App Store launch, we handle the entire lifecycle.
                </p>
                <div class="pt-6 border-t border-gray-100">
                    <a href="#" class="size-14 uppercase tracking-widest text-black font-semibold underline-offset-4 hover:text-gray-600 transition-colors">View Showreel
                        →</a>
                </div>
            </div>
            <div class="column">
                <div class="w-full overflow-hidden relative bg-gray-50 rounded-xl" style="aspect-ratio: 21/9;">
                    <img src="[%IMAGE_PATH%]images/ai-vizM0-editrQY6Myk.jpg" alt="App Development" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		
		`
		},
		{
			'thumbnail': 'preview/item-229c.png',
			'category': '4',
			'html': `
<div class="is-section is-box is-section-100 type-system-ui box-autofit">
    <div class="is-overlay bg-white"></div>
    <div class="is-container is-content-1400 content-py-100 v3 pb-16 pt-12 size-17 leading-17">
        <div class="row">
            <div class="column">
                <p class="size-12 uppercase tracking-widest text-gray-500 font-semibold pb-4">The Roadmap</p>
                <h2 class="size-54 font-light leading-12 max-w-3xl">From concept to launch and beyond.</h2>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row" style="border-top: 1px solid #000;">
            <div class="column pt-8 pb-12">
                <div class="row">
                    <div class="column" style="width: 20%; flex: 0 0 auto;">
                        <h3 class="size-80 font-light leading-none text-gray-900">01</h3>
                    </div>
                    <div class="column" style="width: 40%; flex: 0 0 auto;">
                        <h4 class="size-24 font-normal pb-4">Strategic Planning</h4>
                        <p class="text-gray-600 leading-17">We begin with a deep dive into your business goals, auditing existing systems and defining the technical requirements needed for success.</p>
                    </div>
                    <div class="column">
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="gap: 40px;">
            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 30px;">
                <h3 class="size-48 font-light text-gray-400 pb-4">02</h3>
                <h4 class="size-20 font-medium pb-2">Development</h4>
                <p class="text-gray-600 pb-8">Agile sprints focused on delivering core functionality.</p>
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 3/2;">
                    <img src="[%IMAGE_PATH%]images/ai-Y42RR-editVOu6juF.jpg" alt="Development" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>

            <div class="column" style="border-top: 1px solid rgb(229, 229, 229); padding-top: 30px;">
                <h3 class="size-48 font-light text-gray-400 pb-4">03</h3>
                <h4 class="size-20 font-medium pb-2">Deployment</h4>
                <p class="text-gray-600 pb-8">Seamless integration and live environment setup.</p>
                <div class="w-full overflow-hidden relative bg-gray-50" style="aspect-ratio: 3/2;">
                    <img src="[%IMAGE_PATH%]images/ai-dafDP-editTCqNbl9.jpg" alt="Deployment" class="w-full h-full object-cover transition-transform duration-1500 hover:scale-105">
                </div>
            </div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-229d.png',
			'category': '5',
			'html': `
<div class="is-section is-box is-section-100 type-system-ui is-light-text">
    <div class="is-overlay">
        <div class="is-overlay-bg" style="background-image: url(&quot;[%IMAGE_PATH%]images/ai-CDSif.jpg&quot;); background-position: 50% 60%;" data-bottom-top="transform:translateY(-70px) scale(1);" data-top-bottom="transform:translateY(50px) scale(1.1)">
            <div class="is-overlay-color bg-black opacity-25"></div>
        </div>
    </div>
    <div class="is-container is-content-1200 v3 size-17 leading-15">
        <div class="row">
            <div class="column">
                <div class="spacer height-80"></div>
            </div>
        </div>

        <div class="row">
            <div class="column xs-hidden" style="width: 50%;"></div>
            <div class="column">
                <div class="p-10" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
                    <p class="size-24 leading-14 font-light text-white pb-6">"A masterclass in design thinking. The outcome speaks for itself."</p>
                    <p class="size-14 uppercase tracking-wider text-white opacity-80">Jessica McKay, User</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="spacer height-60"></div>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <div class="p-10" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
                    <p class="size-24 leading-14 font-light text-white pb-6">"Efficiency, elegance, and excellence. Highly recommended."</p>
                    <p class="size-14 uppercase tracking-wider text-white opacity-80">Morten Andersen, User</p>
                </div>
            </div>
            <div class="column xs-hidden" style="width: 50%;"></div>
        </div>
    </div>
</div>
		`
		},
		{
			'thumbnail': 'preview/item-229f.png',
			'category': '7',
			'html': `
<div class="is-section is-box type-system-ui is-section-60">
    <div class="is-overlay"></div>
    <div class="is-container is-content-1200 v3 leading-17 size-18">
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
                <div class="w-full" style="border-top: 1px solid #e5e5e5;"></div>
                <div class="spacer height-40"></div>
            </div>
        </div>
        <div class="row">
            <div class="column flex flex-col justify-center">
                <p class="uppercase tracking-150 size-12 text-gray-400 pb-4">System Access</p>
                <h2 class="leading-11 size-60 font-light text-left pb-4">Ready to optimize your workflow?</h2>
                <p class="size-18 text-gray-600 max-w-2xl leading-17">
                    Join over 500+ companies using our platform to streamline operations and drive growth.
                </p>
            </div>
            <div class="column flex flex-col justify-center items-end" style="width: 30%; flex: 0 0 auto;">
                <div class="text-right">
                    <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal rounded-full py-3 px-10 size-16 leading-16 border-transparent hover:border-transparent" style="color: rgb(255, 255, 255); background-color: rgb(24, 24, 27);" data-bg="rgb(24, 24, 27)" data-hover-bg="rgb(63, 63, 70)" onmouseover="if(this.getAttribute('data-hover-bg'))this.style.backgroundColor=this.getAttribute('data-hover-bg');" onmouseout="if(this.getAttribute('data-bg'))this.style.backgroundColor=this.getAttribute('data-bg');else this.style.backgroundColor='';">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="spacer height-40"></div>
                <div class="w-full" style="border-top: 1px solid #e5e5e5;"></div>
                <div class="spacer height-40"></div>
            </div>
        </div>
    </div>
</div>
		`
		},

		{
			'thumbnail': 'preview/item-229g.png',
			'category': '7',
			'html': `
<div class="is-section type-system-ui is-section-70">
    <div class="is-box is-box-7">
        <div class="is-overlay" style="background-color: rgb(250, 250, 250);"></div>
        <div class="is-container is-content-540 content-py-60 size-17 leading-17 v3">
            <div class="row">
                <div class="column">
                    <p class="size-72 font-light leading-none pb-6" style="color: #e5e5e5;">01</p>
                    <h2 class="size-38 font-normal leading-12 pb-4">Have a project in mind?</h2>
                    <p class="size-16 leading-17 text-gray-600 pb-6">Tell us about your vision. We'll respond within 24 hours to schedule an introductory call.</p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal py-2 px-6 size-15 leading-14 border-current hover:border-current" style="color: rgb(24, 24, 27);">Get in Touch</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="is-box is-box-5">
        <div class="is-overlay" style="background-color: rgb(255, 255, 255);"></div>
        <div class="is-container is-content-380 content-py-60 size-17 leading-17 v3">
            <div class="row">
                <div class="column">
                    <p class="size-72 font-light leading-none pb-6" style="color: #e5e5e5;">02</p>
                    <h2 class="size-38 font-normal leading-12 pb-4">Join our team.</h2>
                    <p class="size-16 leading-17 text-gray-600 pb-6">We're always looking for talented designers, strategists, and creative thinkers.</p>
                    <div>
                        <a href="#" role="button" class="transition-all inline-block whitespace-nowrap cursor-pointer no-underline border-2 border-solid mt-2 mb-1 font-normal tracking-normal py-2 px-6 size-15 leading-14 border-current hover:border-current" style="color: rgb(24, 24, 27);">View Careers</a>
                    </div>
                </div>
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