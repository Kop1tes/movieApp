const API_KEY = "00f8a37d-8e08-4204-8daf-9edd97b20c58";
const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=6";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const form = document.querySelector('form');
const search = document.querySelector('.header__search');


getMovies(API_URL);

async function getMovies(url) {
    
    const resp = await fetch(url, {
        headers: {
            "Content-tipe": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    }

    if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = ''; // очищаем предыдущие фильмы

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie__cover">
        <div class="movie__cover--inner">
        <img src="${movie.posterUrlPreview}"
        alt="${movie.nameRu}" class="movie__cover--img">
        <div class="movie__cover--darkened"></div>
        </div>
                <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
                ${movie.rating && `<div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>`}
                </div>
            </div>
        `;
        movieEl.addEventListener('click', () => openModal(movie.filmId));
        moviesEl.appendChild(movieEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
                
    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl);
    }

    search.value = '';
})

// // Modal

// const modalEl = document.querySelector('.modal');

// async function openModal(id) {
//     const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
//         headers: {
//             "Content-tipe": "application/json",
//             "X-API-KEY": API_KEY,
//         },
//     });
//     const respData = await resp.json();
    
//     modalEl.classList.add('modal--show');
//     document.body.classList.add('stop-scrolling');

//     modalEl.innerHTML = `
// <div class="modal__card">
//     <img src="${respData.posterUrl}" alt="" class="modal__movie--backdrop">
//     <h2>
//         <span class="modal__movie--title">${respData.nameRu}</span>
//         <span class="modal__movie--release"> - ${respData.year}</span>
//     </h2>
//     <ul class="modal__movie--info">
//         <div class="loader"></div>
//         <li class="modal__movie--genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
//         ${respData.filmLength ? `<li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>` : ' '}
//         <li>Сайт: <a href="${respData.webUrl}" class="modal__movie--site">${respData.webUrl}</a></li>
//         <li class="modal__movie--overview">${respData.description}</li>
//     </ul>
//     <button type="button" class="modal__button--close">Закрыть</button>
// </div>
// `;
//     const btnClose = document.querySelector('.modal__button--close');
//     btnClose.addEventListener('click', () => closeModal())
// }

// function closeModal() { // добавляем функцию для закрытия модалки по кнопке
//     modalEl.classList.remove('modal--show');
//     document.body.classList.remove('stop-scrolling');
// }

// window.addEventListener('click', (e) => { // добавляем закрытие модалки по клику рядом с ней
//     if (e.target === modalEl) {
//         closeModal();
//     }
// })

// window.addEventListener('keydown', (e) => { // добавляем закрытие модалки по кнопке Esc
//     if (e.keyCode === 27) {
//         closeModal();
//     }
// })


//////////////////////////////////////////////////////////////////////////////

(function($) { "use strict";

	//Switch dark/light
	
	$(".switch").on('click', function () {
		if ($("body").hasClass("light")) {
			$("body").removeClass("light");
			$(".switch").removeClass("switched");
		}
		else {
			$("body").addClass("light");
			$(".switch").addClass("switched");
		}
	});
		
	$(document).ready(function(){"use strict";
	
		//Scroll back to top
		
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-wrap').addClass('active-progress');
			} else {
				jQuery('.progress-wrap').removeClass('active-progress');
			}
		});				
		jQuery('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
		
		
	});
	
})(jQuery); 