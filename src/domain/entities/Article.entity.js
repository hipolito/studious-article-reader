function vowelComparator(word1, word2){
    const vowelsInWord1 = [...word1.matchAll('[aeiouy]')].length
    const vowelsInWord2 = [...word2.matchAll('[aeiouy]')].length
    
    if(vowelsInWord1 == vowelsInWord2)
        return word1.length - word2.length
    
    return vowelsInWord1 - vowelsInWord2
}

function findLongestVowelWord(title){
    let words = title.split(/[-\s]/).map(word => word.match(/[\w]+[']*[\w]*/)).map(arr => arr? arr[0] : "")
    return words.reduce((word1, word2) => vowelComparator(word1, word2) > 0 ? word1 : word2)
}

class Article {
    constructor({externalId, importDate, title, description, publicationDate, link, mainPicture}) {
        this.externalId = externalId
        this.importDate = importDate
        this.title = title
        this.description = description
        this.publicationDate = publicationDate
        this.link = link
        this.mainPicture = JSON.parse(mainPicture)
        this.vowelWord = findLongestVowelWord(title)
    }
}

module.exports = Article