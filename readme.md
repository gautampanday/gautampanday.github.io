## Functions

<dl>
<dt><a href="#handler">handler(req, res, callback)</a></dt>
<dd><p>middleware to be called from index.js, it creates parallel calls for order_history and collections</p>
</dd>
<dt><a href="#getCollectionMiddleware">getCollectionMiddleware(req, res)</a></dt>
<dd><p>This middleware call cache.route middleware internally so that it can serve the 
generic response from cache, then process to create collections</p>
</dd>
<dt><a href="#cacheGenericResponse">cacheGenericResponse(cacheName, genericResponse)</a></dt>
<dd><p>set the data in response</p>
</dd>
<dt><a href="#getCollection">getCollection(event, context, callback)</a></dt>
<dd><p>orginal function which was directly called from index.js in &lt;=v4 apis,
moved to a new function since we need to make order history call parallely</p>
</dd>
<dt><a href="#getQuickMeals">getQuickMeals(callbackCollection, areaId)</a> ⇒ <code>Object</code></dt>
<dd><p>: if quick meals is present, request more data from public API (and config) and create response structure for app,</p>
</dd>
<dt><a href="#createUnavailableBanner">createUnavailableBanner(metaData, events, explicitKey, isNoServiceTime:)</a> ⇒ <code>Object</code></dt>
<dd><p>: this function creates a banner if any event has a configuration / or soldout</p>
</dd>
<dt><a href="#getVendorsWithMenu">getVendorsWithMenu(vendorIds, areaId, callback:)</a> ⇒</dt>
<dd><p>: this function returns a vendors list with menu items included,</p>
</dd>
<dt><a href="#getCurrentSlot">getCurrentSlot(slots)</a> ⇒ <code>String</code></dt>
<dd><p>: returns the current slot to show the banners, uses nextAvailable and background image(if there)</p>
</dd>
<dt><a href="#checkIfSlotHasCurrentTime">checkIfSlotHasCurrentTime(string, string)</a> ⇒ <code>Boolean</code></dt>
<dd><p>: check if the menu time supports the current time or not</p>
</dd>
<dt><a href="#getBannersFromAreaCityId">getBannersFromAreaCityId(cityId, areaId)</a></dt>
<dd><p>: Filter all the active banner respective to areaId and cityId and save it to redis</p>
</dd>
<dt><a href="#getMetaDataPretch">getMetaDataPretch(areaId, budget, deliveryTimings:, cityId, customer_token, versionOfApi, cachedData, cb_parent)</a></dt>
<dd><p>: Filter all the active banner respective to areaId and cityId and save it to redis</p>
</dd>
<dt><a href="#getCollectionDataAndCacheToRedis">getCollectionDataAndCacheToRedis(versionOfApi)</a></dt>
<dd><p>: Get all explore-dashboard active collections and stores into redis</p>
</dd>
<dt><a href="#getCollectionData">getCollectionData(areaId, budget, deliveryTimings, customer_token, callback, versionOfApi, response)</a></dt>
<dd><p>: Filter all the active banner respective to areaId and cityId and save it to redis</p>
</dd>
<dt><a href="#customCriteriaFilter">customCriteriaFilter(getFilterData, cb)</a></dt>
<dd><p>: Filter all the active banner respective to areaId and cityId and save it to redis</p>
</dd>
</dl>

<a name="handler"></a>

## handler(req, res, callback)
middleware to be called from index.js, it creates parallel calls for order_history and collections

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | request object |
| res | <code>\*</code> | response object |
| callback | <code>\*</code> | function passed from index.js |

<a name="handler..processingStack"></a>

### handler~processingStack
stack of different parallel calls:
1. order_history
2. Rest of collections

**Kind**: inner property of [<code>handler</code>](#handler)  
<a name="getCollectionMiddleware"></a>

## getCollectionMiddleware(req, res)
This middleware call cache.route middleware internally so that it can serve the 
generic response from cache, then process to create collections

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | request object |
| res | <code>\*</code> | response object |

<a name="cacheGenericResponse"></a>

## cacheGenericResponse(cacheName, genericResponse)
set the data in response

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cacheName | <code>\*</code> | its "exploreRedisName" property of response |
| genericResponse | <code>\*</code> | response which is common for all users of that area |

<a name="getCollection"></a>

## getCollection(event, context, callback)
orginal function which was directly called from index.js in <=v4 apis,
moved to a new function since we need to make order history call parallely

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>\*</code> | object containing the data to be used (query paramas, version, cachedData) |
| context | <code>\*</code> | nothing as of now, empty object |
| callback | <code>\*</code> | to be called upon final data creation |

<a name="getQuickMeals"></a>

## getQuickMeals(callbackCollection, areaId) ⇒ <code>Object</code>
: if quick meals is present, request more data from public API (and config) and create response structure for app,

**Kind**: global function  
**Returns**: <code>Object</code> - response body after filtering  

| Param | Type | Description |
| --- | --- | --- |
| callbackCollection | <code>String</code> | : the collection data created by explore-api |
| areaId | <code>Number</code> | : areaId provided by parent(req query param) |

<a name="createUnavailableBanner"></a>

## createUnavailableBanner(metaData, events, explicitKey, isNoServiceTime:) ⇒ <code>Object</code>
: this function creates a banner if any event has a configuration / or soldout

**Kind**: global function  
**Returns**: <code>Object</code> - banner: unavailable banner with background, title and desc  

| Param | Type | Description |
| --- | --- | --- |
| metaData | <code>Array</code> | : metadata of collection |
| events | <code>Array</code> | : array of events coming from metadata call |
| explicitKey | <code>Array</code> | : explicit key to override the banner, events will be ignored(right now sold_out only) |
| isNoServiceTime: | <code>Boolean</code> | boolean flag to show banner only if a noServiceSlots is choosen as current |

<a name="getVendorsWithMenu"></a>

## getVendorsWithMenu(vendorIds, areaId, callback:) ⇒
: this function returns a vendors list with menu items included,

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| vendorIds | <code>String</code> | : array of vendors whose menu is needed |
| areaId | <code>Number</code> | : areaId provided by parent(req query param) |
| callback: | <code>function</code> | to be called with response body |

<a name="getCurrentSlot"></a>

## getCurrentSlot(slots) ⇒ <code>String</code>
: returns the current slot to show the banners, uses nextAvailable and background image(if there)

**Kind**: global function  
**Returns**: <code>String</code> - nextSlotValue : Object from slots collection  

| Param | Type | Description |
| --- | --- | --- |
| slots | <code>String</code> | : slots arrays of the collection, fetched right now from config |

<a name="checkIfSlotHasCurrentTime"></a>

## checkIfSlotHasCurrentTime(string, string) ⇒ <code>Boolean</code>
: check if the menu time supports the current time or not

**Kind**: global function  
**Returns**: <code>Boolean</code> - isMenu available at that time or not  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>start</code> | : start with structure eg: 04:40 |
| string | <code>end</code> | : end with structure eg: 12:40 |

<a name="getBannersFromAreaCityId"></a>

## getBannersFromAreaCityId(cityId, areaId)
: Filter all the active banner respective to areaId and cityId and save it to redis

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cityId | <code>Number</code> | : areaId provided by parent(req query param) |
| areaId | <code>Number</code> | : areaId provided by parent(req query param) |

<a name="getMetaDataPretch"></a>

## getMetaDataPretch(areaId, budget, deliveryTimings:, cityId, customer_token, versionOfApi, cachedData, cb_parent)
: Filter all the active banner respective to areaId and cityId and save it to redis

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| areaId | <code>Number</code> | : areaId provided by parent(req query param) |
| budget | <code>Number</code> | : By default set budget value = 1 |
| deliveryTimings: | <code>Number</code> | By Default set deliveryTimings = 60 |
| cityId | <code>Number</code> | : areaId provided by parent(req query param) |
| customer_token | <code>Number</code> | : user login token |
| versionOfApi | <code>Number</code> | : version of api check |
| cachedData | <code>Boolean</code> | : Check data is in cache or not |
| cb_parent | <code>function</code> | : callback function return all explore-dashboard filtered callection with related vendor data |

<a name="getCollectionDataAndCacheToRedis"></a>

## getCollectionDataAndCacheToRedis(versionOfApi)
: Get all explore-dashboard active collections and stores into redis

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| versionOfApi | <code>Number</code> | : version of api check |

<a name="getCollectionData"></a>

## getCollectionData(areaId, budget, deliveryTimings, customer_token, callback, versionOfApi, response)
: Filter all the active banner respective to areaId and cityId and save it to redis

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| areaId | <code>Number</code> | : areaId provided by parent(req query param) |
| budget | <code>Number</code> | : By default set budget value = 1 |
| deliveryTimings | <code>Number</code> | : By Default set deliveryTimings = 60 |
| customer_token | <code>Number</code> | : user login token |
| callback | <code>function</code> | : callback function return all explore-dashboard filtered callection with related vendor data |
| versionOfApi | <code>Number</code> | : version of api check |
| response | <code>Object</code> | : all the api(v5/vendor,v5/discount, collectionsetactive etc) response result |

<a name="customCriteriaFilter"></a>

## customCriteriaFilter(getFilterData, cb)
: Filter all the active banner respective to areaId and cityId and save it to redis

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| getFilterData | <code>Object</code> | : all collection object of explore-dashboard |
| cb | <code>function</code> | : callback function return all explore dashboard response with filterd vendor data |

**Example**  
```js
Filter Criteria to show collection-


1- By WeekDays(Sunday,Monday etc)
if (getFilterData && getFilterData.weekDays && getFilterData.weekDays[0] && getFilterData.weekDays[0].name) {
        var getWeekDays = [];
        for (var index in getFilterData.weekDays) {
            getWeekDays.push(getFilterData.weekDays[index].id);
        }
        if (!_.includes(getWeekDays, new Date().getDay())) {
            getFilterData.datafilter = [];
        }

     }
```
**Example**  
```js
2- By hours(Morning -9:00-11:00AM or same for noon,evening, night)
// Check if collection exists for given collection time slot
if (getFilterData && hoursNow >= getFilterData.startTime && hoursNow <= getFilterData.endTime) { 
 }
```
**Example**  
```js
3- By FoodCharacteristics Id
// filter all FoodCharacteristics id of collection
  var foodCharacteristicsItems = _.filter(getFilterData.datafilter, ['name', 'food_characteristics']);
        _.forEach(foodCharacteristicsItems, function (value) {
            characteristicsOfFood.push(value.criteria); // store all foodchar id
        });

        // check if foodchar id found for collection
        if (characteristicsOfFood.length && collectionData.length) { // collection data is all vlp data
            var isFoodCharacteristics = false;
            _.filter(collectionData, function (p) {
                //check if vlp data has foodchar array 
                if (p.food_characteristics && p.food_characteristics.length) {
                    _.forEach(p.food_characteristics, function (getID) {

                        if (characteristicsOfFood.indexOf(getID.id) != -1) {
                            isFoodCharacteristics = true; // if foodchar id matched then set flag true
                            foodCharacteristicsFilter.push(p);
                            getFilterData.datafilter = foodCharacteristicsFilter;
                            collectionData = foodCharacteristicsFilter;
                        }

                    });

                }
            });
        }
```
**Example**  
```js
4- By vlp metadata object( for example - isexpressdelivery or any key of vendor metadata)
// if dashboard send filter by metadata for example -metadata.is_express_delivery_available-["==true"]
  var keyName = getFilterData.datafilter[obj]['name'].split('.', 2);
        if (keyName && keyName[0] == 'metadata') {
            metaDataKey = keyName[0] + "." + keyName[1];
            convertInObject[keyName[1]] = true;
        }
        _.find(collectionData, function (o) {
            var metaFilterKey = _.findKey(o, convertInObject);
            if (metaFilterKey) {
                isMeta = true;
                metaDataFilter.push(o);
                collectionData = metaDataFilter;
                getFilterData.datafilter = collectionData;
            }
        });
```
**Example**  
```js
5- Fliter by vlp discount array - dashboard filter - discounts-[{"discounts":"true"}]
var discountItem = _.filter(getFilterData.datafilter, ['name', 'discounts']);
 _.forEach(discountItem, function (value) {
            discountsData.push(value.criteria[0]); //push all the fliter criteria - [{"discounts":"true"}]
        });
            // there is 2 type of discount -By flat, By Text type discount like Buy one get one
            var discountData = discountArray.getBody();
            var discountVendors = [];
            var vendorsWithoutFlat = [];
            discountData.data.items.forEach(function (discountVendor) {
                collectionData.forEach(function (item) {
                    if (item.id === discountVendor.vendor_id
                        && discountVendor.discount_type === "amount"
                        && !item.is_promoted
                        && discountVendor.name !== "-"
                        && item.is_test === false) {
                        discountVendors.push(item);
                    }
                    else if (item.id === discountVendor.vendor_id
                        && item.is_test === false
                        && !item.is_promoted
                        && discountVendor.name !== "-") {
                        vendorsWithoutFlat.push(item);
                    }
                });
            });
            discountVendors = _.union(discountVendors, vendorsWithoutFlat);
            getFilterData.datafilter = discountVendors;
```
**Example**  
```js
6 - By Exclusion of Foodchar, cuisine, vendor
getFilterData.datafilter.forEach(function (item) {
                if (item.food_characteristics && excludedFoodCharacterstics.length) { // excluded foodchar id-[33,54] type
                    isFilterOfFoodChar = true;
                    var isBlacklistedFoodChar =_.find(item.food_characteristics, function(chr) {
                        return (_.includes(excludedFoodCharacterstics, chr.id));
                    });
                    if(!isBlacklistedFoodChar) {
                        foodCharWithOutBlacklisted.push(item);
                    }
                }
            });
```
**Example**  
```js
7- By direct object key of filter 
var names = _.map(getFilterData.datafilter, 'name');
var ignoreArrayOfElements = ['food_characteristics', 'cuisines', 'banners', 
'discounts', 'exclusion-id', 'exclusion-cuisines', 'exclusion-foodCharacterstics'];
// loop for all vlp data
for (var j = 0; j < vlpData.length; j++) {
        vlpConditionCriteria[j] = '';
        for (var i = 0; i < names.length; i++) { // for all datafilter of collection
            var matchIds = ignoreArrayOfElements.indexOf(names[i]);
            if (matchIds == -1 && names[i] != metaDataKey) { // ignore all array,object type of vlp data
                vlpConditionCriteria[j] += vlpData[j][names[i]] + criterias[i] + " && "; // combine the condition 
                for example - (rating > 4 && minimu_delivery_time < 45) etc
            }
        }
        vlpConditionCriteria[j] = vlpConditionCriteria[j].slice(0, -3);
        if (!vlpConditionCriteria[0]) {
            isVlpMatched = false;
        }
        var vendorMetaData = _.find(metaData.data.items, { id: vlpData[j].id });
        vlpData[j]['metadata'] = vendorMetaData ? vendorMetaData.metadata : ''; // check for metadata object value

        if (isVlpMatched && vendorMetaData && (vendorMetaData.metadata.is_delivery_available ||
            vendorMetaData.metadata.is_pickup_available) && vlpData[j].is_test === false) { // check if vendor is open and not a test vendor
            vendorIds.push(vlpData[j].id);
            if (eval(vlpConditionCriteria[j]) && !_.includes(allBlacklistVendorList, vlpData[j].id)) {
                collectionData.push(vlpData[j]);
                getFilterData.datafilter = collectionData; // push all filter vlp data to collectiondata array 
            }
        }
      }
```
**Example**  
```js
8 - Filter all cuisine for collection Browse by cuisine with using key given by explore dashboard
Find all cuisine and count of cuisine from all vlp data and show them with count desc order
```
**Example**  
```js
9 - Filter banner 
Filter all banner for collection Banner with using key given by explore dashboard 
and it is search from areaId and cityId

```
