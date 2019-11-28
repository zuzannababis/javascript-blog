'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagsLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

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
    optSingleTagSelector = 'a[href^="#tag-"]',
    optTagsListSelector = '.tags .list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors .list';

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

        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 99999,
  };
  for(let tag in tags){
    console.log(tag + 'is used' + tags[tag] + 'times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  const cloudClass = optCloudClassPrefix + classNumber;

  return cloudClass;
}
console.log(calculateTagClass, 'calculate');

function generateTags (){

    /* [NEW] create a new variable allTags with an empty object */
    
    let allTags = {};

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

            //const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
            const tagHTMLData = {id: 'tag-' + tag, title: tag};
            const tagHTML = templates.tagsLink(tagHTMLData);

            /* add generated code to html variable */

            html = html + tagHTML;
            console.log(html, 'html');

            /* [NEW] check if this link is NOT already in allTags */
      
            if(!allTags.hasOwnProperty(tag)){

            /* [NEW] add tag to allTags object */

            allTags[tag] = 1;

            } else {
              allTags[tag]++;
            }
            
        }
        /* END LOOP: for each tag */
        /* insert HTML of all the links into the tags wrapper */

        tagsWrapper.innerHTML = html;

    }
    /* END LOOP: for every article: */
    /* [NEW] find list of tags in right column */
    
    const tagList = document.querySelector('.tags');
    console.log(tagList, 'tagList');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    //let allTagsHTML = '';

    const allTagsData = {tags: []};

     /* [NEW] START LOOP: for each tag in allTags: */

     for(let tag in allTags){
       /* [NEW] generate code of a link and add it to allTagsHTML: */
       
       //allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '' + '</a></li>';
      
       allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      console.log(allTagsData, 'tagsdata');
      
      }

     /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add html from allTagsHTML to tagList */
    
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData, 'alltagsdata');
    
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
    console.log(links, 'links');

    /* START LOOP: for each link */

    for (let link of links){
  
      /* add tagClickHandler as event listener for that link */
  
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
}

addClickListenersToTags();


function generateAuthors (){

    /* [NEW] create a new variable allAuthors with an empty object */

    let allAuthors = {};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for(let article of articles){

        /* find authors wrapper */

        const authorsWrapper = article.querySelector(optArticleAuthorSelector);

        /* make html variable with empty string */

        let html = '';

        /* get author from the attribute */

        const author = article.getAttribute('data-author');
        

        console.log('articleAuthor', author);

        /* generate HTML of the link */

        //const authorHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';

        const authorHTMLData = {id: 'author-' + author, title: author};
        const authorHTML = templates.authorLink(authorHTMLData);

        /* add generated code to html variable */

        html = html + authorHTML;
        console.log(html, 'html');

        /* [NEW] check if this link is NOT already in allTags */
      
        if(!allAuthors.hasOwnProperty(author)){

          /* [NEW] add authors to allAuthors object */

          allAuthors[author] = 1;

         } else {

            allAuthors[author]++;

          }

        /* insert HTML of all the links into the tags wrapper */

        authorsWrapper.innerHTML = html;

      }
        /* [NEW] find list of tags in right column */
  
        const authorsList = document.querySelector('.authors');

        

        /* [NEW] create variable for all links HTML code */

        //let allAuthorsHTML = '';
        const allAuthorsData = {authors: []};

        /* [NEW] START LOOP: for each author in allAuthors */

        for(let author in allAuthors){
          /* NEW generate code of a link and add it to allAuthorsHTML */
          
          //allAuthorsHTML += '<li><a class="' + calculateAuthorClass(allAuthors[articleAuthor], authorsParams) + '"href="#author-' + articleAuthor + '">' + articleAuthor + '' + '</a></li>'; 
          allAuthorsData.authors.push({
            author: author,
            count: allAuthors[author], 
            /* className: calculateAuthorClass(allAuthors[author], authorsParams) */
          });
          console.log(allAuthorsData,'authorsdata');
        }

        /* [NEW] END LOOP: for each author in allAuthors */
        /* [NEW] add html from allAuthorsHTML to authorsList */
        
        authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
        

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