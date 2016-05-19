# Getting started

-------------------------------

## Modules

<dl>
<dt><a href="#module_mojax">mojax</a></dt>
<dd><p>mojax module</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#chainAddons">chainAddons(addons, params)</a> ⇒ <code>object</code> | <code>undefined</code> ℗</dt>
<dd></dd>
<dt><a href="#finalizeParams">finalizeParams(c)</a> ℗</dt>
<dd></dd>
<dt><a href="#mapCallbacks">mapCallbacks(v)</a> ⇒ <code>Array.&lt;function()&gt;</code> | <code>array</code> ℗</dt>
<dd></dd>
<dt><a href="#parseResponse">parseResponse(xhr)</a> ⇒ <code>object</code> | <code>string</code> ℗</dt>
<dd></dd>
<dt><a href="#parseXML">parseXML(data)</a> ⇒ <code>xml</code> ℗</dt>
<dd></dd>
<dt><a href="#responseListener">responseListener(xhr, c)</a> ℗</dt>
<dd></dd>
<dt><a href="#xhrFactory">xhrFactory(c)</a> ⇒ <code>object</code> | <code>undefined</code> ℗</dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#requester">requester</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#params">params</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_mojax"></a>

## mojax
mojax module

<a name="module_mojax.createRequester"></a>

### mojax.createRequester() ⇒ <code>[requester](#requester)</code>
**Kind**: static method of <code>[mojax](#module_mojax)</code>  
**Summary**: creates a requester instance, which can be extended with middleware/addons,
and from which HTTP requests can be dispatched  
**Access:** public  
<a name="chainAddons"></a>

## chainAddons(addons, params) ⇒ <code>object</code> &#124; <code>undefined</code> ℗
**Kind**: global function  
**Summary**: simplified middleware pipe  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| addons | <code>Array.&lt;function()&gt;</code> | array of middleware used by the requester object |
| params | <code>object</code> | configuration object of the request being made |

<a name="finalizeParams"></a>

## finalizeParams(c) ℗
**Kind**: global function  
**Summary**: enforces required properties of the request configuration object.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>object</code> | request configuration object |

<a name="mapCallbacks"></a>

## mapCallbacks(v) ⇒ <code>Array.&lt;function()&gt;</code> &#124; <code>array</code> ℗
**Kind**: global function  
**Summary**: Maps a function to an array containing the function, otherwise returns an empty array.  
**Returns**: <code>Array.&lt;function()&gt;</code> &#124; <code>array</code> - - array of functions or empty array  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>function</code> &#124; <code>Array.&lt;function()&gt;</code> &#124; <code>undefined</code> | initial value to map to an array |

<a name="parseResponse"></a>

## parseResponse(xhr) ⇒ <code>object</code> &#124; <code>string</code> ℗
**Kind**: global function  
**Summary**: parses the response data based on provided responseType  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| xhr | <code>object</code> | XMLHttpRequest object |

<a name="parseXML"></a>

## parseXML(data) ⇒ <code>xml</code> ℗
**Kind**: global function  
**Summary**: Parses XML string content  
**Access:** private  
**Author:** jQuery  
**License**: https://github.com/jquery/jquery/blob/master/LICENSE.txt  
**Copyright**: jQuery foundation  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | content |

<a name="responseListener"></a>

## responseListener(xhr, c) ℗
**Kind**: global function  
**Summary**: triggers provided listeners based on state of XMLHttpRequest.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| xhr | <code>object</code> | XMLHttpRequest instance of the request |
| c | <code>[params](#params)</code> | configuration object |

<a name="xhrFactory"></a>

## xhrFactory(c) ⇒ <code>object</code> &#124; <code>undefined</code> ℗
**Kind**: global function  
**Summary**: creates a XMLHttpRequest instance, builds it according to the provided params, executes the XMLHttpRequest  
**Returns**: <code>object</code> &#124; <code>undefined</code> - XMLHttpRequest instance  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>[params](#params)</code> | request configuration hash |

<a name="requester"></a>

## requester : <code>object</code>
**Kind**: global typedef  
**Summary**: environment/interface used to add middleware and make HTTP requests  

* [requester](#requester) : <code>object</code>
    * [.use(fn)](#requester+use) ⇒ <code>object</code>
    * [.req(params)](#requester+req) ⇒ <code>object</code>

<a name="requester+use"></a>

### requester.use(fn) ⇒ <code>object</code>
**Kind**: instance method of <code>[requester](#requester)</code>  
**Summary**: adds a middleware function to the requester pipeline  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | middleware function to add to the requester's request pipeline |

<a name="requester+req"></a>

### requester.req(params) ⇒ <code>object</code>
**Kind**: instance method of <code>[requester](#requester)</code>  
**Summary**: starts an async HTTP request, passing the configuration object through the middleware pipeline, and finally sending the request  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>[params](#params)</code> | configuration object used for the request |

<a name="params"></a>

## params : <code>object</code>
**Kind**: global typedef  
**Summary**: configuration object for a HTTP request,
which gets piped through the requester's middleware functions  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | URL used as the HTTP request target |
| method | <code>string</code> |  | GET, POST, PUT, DELETE |
| responseType | <code>string</code> | <code>&quot;text&quot;</code> | json, text, xml, text/xml, text/html, arraybuffer, blob |
| headers | <code>object</code> | <code>{X-Requested-With:XMLHttpRequest}</code> | request headers |
| data | <code>string</code> |  | data to send on POST or PUT request |
| onSuccess | <code>function</code> &#124; <code>Array.&lt;function()&gt;</code> |  | callbacks triggered on successful request completion |
| onFailure | <code>function</code> &#124; <code>Array.&lt;function()&gt;</code> |  | callbacks triggered on failed request completion |
| onHeaders | <code>function</code> &#124; <code>Array.&lt;function()&gt;</code> |  | callbacks triggered when response headers are received from server |
| onOpen | <code>function</code> &#124; <code>Array.&lt;function()&gt;</code> |  | callbacks triggered when request is opened |
| timeout | <code>number</code> |  | sets the timeout value of the underlying XMLHttpRequest object (if supported) |

