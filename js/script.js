'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    console.log('Link was clicked!');
    console.log(event);


    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement: ', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    console.log('articleSelector', articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    console.log('targetArticle', targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

    console.log('targetArticle', 'active');

}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optSingleTagSelector = '.post-tags a';

function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
     
    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for(let article of articles){       
        
        /* get the article id */

        const articleId = article.getAttribute('id');

        /* find the title element */
        /* get the title from the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log('linkHTML', linkHTML);

        /* insert link into html variable */

        html = html + linkHTML;
        
        console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();

function generateTags (){
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for(let article of articles){

        /* find tags wrapper */

        const tagsWrapper = article.querySelector(optArticleTagsSelector);

        /* make html variable with empty string */

        let html = '';

        /* get tags from data-tags attribute */

        const articleTags = article.getAttribute('data-tags');

        console.log('articleTags', articleTags);

        /* split tags into array */

        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray, 'articleTagsArray');

        /* START LOOP: for each tag */

        for(let tag of articleTagsArray){
        console.log(tag);    

            /* generate HTML of the link */

            const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

            /* add generated code to html variable */

            html = html + tagHTML;
            console.log(html, 'html');

        }
        /* END LOOP: for each tag */
        /* insert HTML of all the links into the tags wrapper */

        tagsWrapper.innerHTML = html;

    }
    /* END LOOP: for every article: */

}

generateTags();

const tagClickHandler = function(event) {
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href, 'href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  
    /* START LOOP: for each active tag link */
  
    for (let activeTag of activeTags){

      /* remove class active */
  
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
  
    for (let tagLink of tagLinks){

      /* add class active */
  
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
    
}
  
function addClickListenersToTags(){
    
    /* find all links to tags */
  
    const links = document.querySelectorAll(optSingleTagSelector);

    /* START LOOP: for each link */

    for (let link of links){
  
      /* add tagClickHandler as event listener for that link */
  
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
}

addClickListenersToTags();

function generateAuthors (){

    
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for(let article of articles){

        /* find authors wrapper */

        const authorsWrapper = article.querySelector(optArticleAuthorSelector);

        /* make html variable with empty string */

        let html = '';

        /* get author from the attribute */

        const articleAuthor = article.getAttribute('data-author');
        

        console.log('articleAuthor', articleAuthor);

        /* generate HTML of the link */

        const authorHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';

        /* add generated code to html variable */

        html = html + authorHTML;
        console.log(html, 'html');

        /* insert HTML of all the links into the tags wrapper */

        authorsWrapper.innerHTML = html;
        
    }

}

generateAuthors();

const authorClickHandler = function(event) {
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href, 'href');

    /* make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');

    /* find all author links with class active */

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  
    /* START LOOP: for each active author link */
  
    for (let activeAuthor of activeAuthors){

      /* remove class active */
  
      activeAuthor.classList.remove('active');

    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
  
    for (let authorLink of authorLinks){

      /* add class active */
  
      authorLink.classList.add('active');

    /* END LOOP: for each found author link */
  
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');
    
}

function addClickListenersToAuthors(){
    /* find all links to authors */
  
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */

    for (let authorLink of authorLinks){
  
      /* add tagClickHandler as event listener for that link */
  
      authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}
  
addClickListenersToAuthors();