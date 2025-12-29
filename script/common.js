//main typing
// const mainH2 = document.querySelector('.main .m-txt h2');
// const textH2 = '.main .m-txt h2';
// let  hdrl = 0;
// let txt = '';

// function typing(){
//     txt = textH2[hdrl++];
//     mainH2.innerText += txt;
//     if(hdrl > textH2){
//         hdrl = 0;
//         mainH2.innerText = '';
//     }
// }

// setInterval(typing, 125);



//about visual
$('.icon').on('click',function(){
    $('.icon-wrap').removeClass('active')
    $(this).parent().addClass('active')
});


// 1. ul안에 준비된 데이터 수만큼 li추가
//   ㄴ 이미지 주소, 상품명, 가격 각각 출력

// 2. 추가된 li클릭하면 팝업창 노출
//    ㄴ 이미지, 상품명, 가격, 디테일정보

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 15,
    slidesOffsetAfter: 50
});

let data;

$.ajax({
    url:"./script/data.json",
    success:function(json){   
        data = json;

        projectList();
        $('li').on('click',popupShow);
 
        setTimeout(pageScroll,500);
    }
});

function projectList(){
    let elData;
        $.each(data.project, function(key, value){
            elData = `<li class="swiper-slide" data-code=${value.code}>
                        <img src="${value.photo}" alt="img">
                        <div>
                            <p>${value.detail}</p>
                            <p>${value.year}</p>
                            <h4>${value.title}</h4>
                        </div>
                    </li>`;

            $('ul').append(elData);
        });

        $('ul').append('<li class="swiper-slide"></li>');
}


function popupShow(){
    // 클릭한 상품의 코드값을 찾아라!
    let code = $(this).data('code');

    // 데이터들 중에서 클릭한 상품 코드값과 같은 데이터를 찾아라!
    let p = data.project.filter(function(num){
        return num.code == code;
    });

    // 출력할 태그안에 값을 변경
    let elPopup = `<div class="popup-txt" style="background-color:${p[0].color}">
                        <div class="title">
                            <p>${p[0].project}</p>
                            <h2>${p[0].title}</h2>
                        </div>
                        <div class="about">
                            <p>${p[0].date}</p>
                            <p>${p[0].ver}</p>
                        </div>
                        <div class="comment">
                            ${p[0].comment}
                        </div>
                        <div class="btn">
                            <a href="${p[0].origin}" target="blank">기존 사이트</a>
                            <a href="${p[0].url}" target="blank">PROJECT</a>
                        </div>
                    </div>
                    <div class="popup-img">
                        <div class="slide">
                            <img src="${p[0].img1}" alt="image">
                            <img src="${p[0].img2}" alt="image">
                            <img src="${p[0].img3}" alt="image">
                            <img src="${p[0].img4}" alt="image">
                            <img src="${p[0].img5}" alt="image">
                        </div>
                    </div>
                    <div class="close"></div>`;


    $(".popup").css({
        "display":"flex",
        "top": (($(window).height()-$(".popup").outerHeight())/2+$(window).scrollTop())+"px",
        "left": (($(window).width()-$(".popup").outerWidth())/2+$(window).scrollLeft())+"px"
        //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정
    });

    $(".popup-shadow").css("display","block");
    $("body").css("overflow","hidden");//body 스크롤바 없애기
    $('.popup').html(elPopup);
  

    if(p[0].ver == '[MOBILE]'){
        $('.slide').width(360);
    }else{
        $('.slide').width(  $('.popup-img').width()*0.9 );
    }

    if(p[0].origin == ''){
        $('.btn a:nth-of-type(1)').css('display','none');}
    

    $('.popup .img').scrollTop(0);
        
    // popup클래스안에 elPopup값으로 변경
  
    // $('.popup').addClass('active');

    $('.close, .popup-shadow').on('click',function(){
        
        
        $('.popup').hide();
        $(".popup-shadow").css("display","none");
        $("body").css("overflow","auto");//body 스크롤바 생성
        
    });
}



// nav 클릭이벤트 스크롤 이동

// let idx = $(this).index(); //메뉴의 순번을 변수로 담기
// let conTop = $('main').eq(idx).offset().top;

// $('nav a').eq(0).on('click', function(){ 
//     $('html').animate({scrollTop:0},800);
// });

// $('nav a').eq(1).on('click', function(){ 
//     $('html').animate({scrollTop:1080},800);
// });

// $('nav a').eq(2).on('click', function(){ 
//     $('html').animate({scrollTop:2000},800);
// });

// $('nav a').eq(3).on('click', function(){ 
//     $('html').animate({scrollTop:3000},1000);
// });

function pageScroll(){
    
    const domHeight =  $('.container').height();
    $('html').height(domHeight);

    let offsetTop = [
        $('.main').offset().top,
        $('.about').offset().top,
        $('.project').offset().top,
        $('.contact').offset().top
    ];

    let i = 0, k=0, play;
    let scrollState = {y:0,y2:0,state:'down'}

    $('header nav a').on('click', function(){ 
        event.preventDefault();
        i = $(this).index();
        // console.log(i)
        if(i>k){
            k=i; i--;
        }else{
            k=i; i++;
        }
        $(window).scrollTop($(window).height()*k);    
        update();
    });
    function update(){
        $('nav a').removeClass('active')
        $('nav a').eq(k).addClass('active')
    }

    //header color

    //scroll 
    $(window).on('scroll',function(){
        scrollState.y = $(window).scrollTop();

        if(scrollState.y > scrollState.y2){
            scrollState.state = true;  
        }else{
            scrollState.state = false;
        }
    

        clearTimeout(play);
        play = setTimeout(function(){
            
            if(scrollState.state){
                if(i<3) i++;
            }else{
                if(i>0) i--;
            }
            k=i;
            update();
                
            $('.container').css({
                transform:`translateY(-${offsetTop[i]}px)`
            });
        },50);
    

        scrollState.y2 = scrollState.y;
    })
}


//mouse cursor 수정해야함!!!! 아직 안 됨!!!!!
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
let r = 10, alpha = 0;

function cursorFn(x,y){
    alpha += 0.1;

    if(alpha < 0.8){
        alpha=0.4;
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }else{
        requestAnimationFrame(function(){ cursorFn(x,y) })
    }
    
    // ctx.clearRect(0,0,canvas.width,canvas.height); //지워야하는 지점

    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.globalAlpha = alpha;
    ctx.arc(x+15,y,r,0,Math.PI*2,false); //커서의 위치
    ctx.fill();


}

window.addEventListener('mousemove',function(e){
    cursorFn(e.clientX, e.clientY);
});