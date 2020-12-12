const searchResultPage = require('../pageobjects/searchResult.page');
const data = require('../helpers/data.helper');

describe('Search result page suite', () => {  
    beforeEach(() => {
        browser.reloadSession();
        browser.setWindowSize(1280, 720); 
        browser.url("https://develop.terapeutica.digital/#/search");
    })

    it('URL change after click filter from search result page', () => {
        let urlWithFilterSelected = data.getURLWithFilterSelected();
        let i = 0;
        searchResultPage.specialtyFilterSearchResult.forEach(element => {
            element.waitForClickable();
            element.click();
            expect(browser).toHaveUrlContaining(urlWithFilterSelected[i])
            i++
        });
    });

    it('Search terapist from search result page', () => {
        let name = data.getNameForSearchTests();       
        searchResultPage.searchInput.setValue(name);
        searchResultPage.searchButton.waitForClickable();
        searchResultPage.searchButton.click();
        searchResultPage.verifyNameInFirstResult(name);   
    });

    it('Hide map from search result page', () => {
        searchResultPage.view_hideMapButton.waitForClickable();
        searchResultPage.view_hideMapButton.click();
        searchResultPage.mapFromSearchResultPage.waitForDisplayed({ reverse: true });       
    });
});


