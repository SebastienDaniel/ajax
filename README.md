# Getting started

-------------------------------

## Modules

<dl>
<dt><a href="#module_mojax">mojax</a></dt>
<dd><p>mojax module</p>
</dd>
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

