/**
Track the trade of a article from one trader to another
* @param {org.acme.product.auction.Trade} trade - the trade to be processed
* @transaction
*/
function tradeArticle(trade) {
  trade.article.owner = trade.newOwner;
  var NS = 'org.acme.product.auction';
  return getAssetRegistry('org.acme.product.auction.Article')
    .then(function (assetRegistry) {
      return assetRegistry.update(trade.article);
    }).then(function () {
      var factory = getFactory();
      // Generate event
      var event = factory.newEvent(NS, 'TradeEvent');
      // Set properties
      event.type = "Start Trade";
      event.articleId = trade.article.articleId;
      event.articleName = trade.article.articleName;
      event.owner = trade.newOwner.ownerName;

      // Emit
      emit(event);
    });
}