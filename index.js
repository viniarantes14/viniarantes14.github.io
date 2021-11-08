const submitButton = document.querySelector('#submit');
const input = document.querySelector('#input');
const errorSpan = document.querySelector('#error');
const resultsContainer = document.querySelector('#results');
const resultsEmail = document.getElementById('email');
const resultsSenha = document.getElementById('senha');

const endpoint = 'https://en.wikipedia.org/w/api.php?';
const params = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exchars: 250,
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 10,
};

const disableUi = () => {
    input.disabled = true;
    submitButton.disabled = true;
};

const enableUi = () => {
    input.disabled = false;
    submitButton.disabled = false;
};

const clearPreviousResults = () => {
    resultsContainer.innerHTML = '';
    errorSpan.innerHTML = '';
};

const isInputEmpty = input => {
    if (!input || input === '') return true;
    return false;
};

const showError = error => {
    errorSpan.innerHTML = `🚨 ${error} 🚨`;
};

const showResults = results => {
    results.forEach(result => {
        resultsContainer.innerHTML += `
        <div class="results__item">
            <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class="card animated bounceInUp">
                <h2 class="results__item__title">${result.title}</h2>
                <p class="results__item__intro">${result.intro}</p>
            </a>
        </div>
    `;
    });
};

const gatherData = pages => {
    const results = Object.values(pages).map(page => ({
        pageId: page.pageid,
        title: page.title,
        intro: page.extract,
    }));
    showResults(results);
};

const getData = async () => {
    const userInput = input.value;
    if (isInputEmpty(userInput)) return;

    params.gsrsearch = userInput;
    clearPreviousResults();
    disableUi();

    try {
        const { data } = await axios.get(endpoint, { params });

        if (data.error) throw new Error(data.error.info);
        gatherData(data.query.pages);
    } catch (error) {
        showError(error);
    } finally {
        enableUi();
    }
};


const handleKeyEvent = e => {
    if (e.key === 'Enter') {
        getData();
    }
};

const registerEventHandlers = () => {
    input.addEventListener('keydown', handleKeyEvent);
    submitButton.addEventListener('click', getData);
};



function openDialog() {
  
    var trigger = document.getElementById('loggin');
    
      trigger.addEventListener('click', function() {
      dialog1.showModal();

    });
    
  };
  
  function salvarInformações() {
    
    document.addEventListener("keypress", function(e){

        if(e.key === "Enter"){
    
            const btn = this.querySelector("#send");
            btn.click();
        
        }
    
    });
   

    localStorage.setItem("email",document.getElementById('email').value);
    localStorage.setItem("senha",document.getElementById('senha').value);

    resultsEmail.value = '';
    resultsSenha.value = '';
    
    dialog1.close();
    
    
  };

  function showPassword(){

    var statusPassword = document.getElementById('senha');
    if(senha.type == "password"){
        senha.type = "text";
    }else{
        senha.type = "password";
    }
  }
