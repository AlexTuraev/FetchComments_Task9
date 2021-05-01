(async ()=>{
	const API_BASE = 'https://jsonplaceholder.typicode.com/comments';

	async function requestComments(url){
		return fetch(url)
			.then((response) => response.json());
	}

	/* ---------------------------------------------- */
	function createDomArticle({email, name, body, postId}){
		const templateArticle = 
		`<article class="comment">
			<h1 class="comment__title">${name}</h1>
			<a class="comment__email" href="mailto:${email}">E-mail: ${email}</a>
			<div class="comment__text">
				<span>${body}</span>
			</div>
			<div class="comment__postid">
				<span>Post ID: ${postId}</span>
			</div>
		</article>`;
		return templateArticle;
	}
	/* ---------------------------------------------- */
	function createDomElement({tag, options=[], cssClasses=[]}){
		const elem = document.createElement(tag, options);
		cssClasses.forEach(cssClass => elem.classList.add(cssClass));
		return elem;
	}
	/* ---------------------------------------------- */
	function createDomSection({tag='section', cssClasses=[]}){
		return createDomElement({tag, cssClasses});
	}
	/* ---------------------------------------------- */
	function createFilteredArticles(comments, emailFilter=''){
		const arr = comments.filter(item => (item.email.toUpperCase().indexOf(emailFilter.toUpperCase()) !== -1))
		let resultHtml = arr.reduce((accum, item)=>{
				const {email, name, body, postId} = item;
				return accum + createDomArticle({email, name, body, postId});
			}, '');

		resultHtml = `<div>${arr.length} records </div>` + resultHtml;
		return resultHtml;
	}
	/* ---------------------------------------------- */
	function handlerInputOnChange(event, comments){
		sectionElement.innerHTML = createFilteredArticles(comments, event.target.value);
	}


			/* ГЛАВНАЯ ПРОГРАММА */
	const rootElement = document.querySelector('#root');
	const inputElement = document.querySelector('#filter');
	const sectionElement = createDomSection({cssClasses: ['section-comments']});
	rootElement.appendChild(sectionElement);

	let comments;
	try{
		// throw(new Error); // для теста на обработку ошибок
		comments = await requestComments(API_BASE);	
		const resultHtml = createFilteredArticles([...comments], '');
		sectionElement.innerHTML = resultHtml;

		inputElement.addEventListener('input', (event)=>{
		handlerInputOnChange(event, [...comments]);
	})} catch(err){
		console.log('Произошла непредвиденная ошибка. Some error has been happened.');
		alert('Произошла непредвиденная ошибка. Some error has been happened.');
		//console.log(err);
	}

})();