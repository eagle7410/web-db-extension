<a name="BrowserDataBaseClass"></a>

## BrowserDataBaseClass
Class for work this browsers databases.

**Kind**: global class  

* [BrowserDataBaseClass](#BrowserDataBaseClass)
    * _instance_
        * [.queryConst()](#BrowserDataBaseClass+queryConst) ⇒ <code>Object</code>
        * [.isOpen()](#BrowserDataBaseClass+isOpen) ⇒ <code>boolean</code>
        * [.drop()](#BrowserDataBaseClass+drop) ⇒ <code>Promise</code>
        * [.init(objectTables)](#BrowserDataBaseClass+init) ⇒ <code>Promise</code>
        * [.insert(table, fields, arInsert)](#BrowserDataBaseClass+insert) ⇒ <code>Promise</code>
        * [.isEmpty()](#BrowserDataBaseClass+isEmpty) ⇒ <code>Promise</code>
        * [.getAll(table)](#BrowserDataBaseClass+getAll) ⇒ <code>Promise</code>
        * [.getByPk(table, pkValue)](#BrowserDataBaseClass+getByPk) ⇒ <code>Promise</code>
        * [.getByRequire(table, indexRequire, indexValue)](#BrowserDataBaseClass+getByRequire) ⇒ <code>Promise</code>
        * [.upInsert(table, newFields)](#BrowserDataBaseClass+upInsert) ⇒ <code>Promise</code>
        * [.updateByPk(table, pkValue, changeFields)](#BrowserDataBaseClass+updateByPk) ⇒ <code>Promise</code>
        * [.removeAll(table)](#BrowserDataBaseClass+removeAll) ⇒ <code>Promise</code>
        * [.removeByPk(table, pkValue)](#BrowserDataBaseClass+removeByPk) ⇒ <code>Promise</code>
        * [.close()](#BrowserDataBaseClass+close)
    * _static_
        * [.driverConst()](#BrowserDataBaseClass.driverConst) ⇒ <code>Object</code>

<a name="BrowserDataBaseClass+queryConst"></a>

### browserDataBaseClass.queryConst() ⇒ <code>Object</code>
Query constants.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  
<a name="BrowserDataBaseClass+isOpen"></a>

### browserDataBaseClass.isOpen() ⇒ <code>boolean</code>
Check database be open

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  
<a name="BrowserDataBaseClass+drop"></a>

### browserDataBaseClass.drop() ⇒ <code>Promise</code>
Drop database.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  
<a name="BrowserDataBaseClass+init"></a>

### browserDataBaseClass.init(objectTables) ⇒ <code>Promise</code>
Init database. If database is empty crete tables

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| objectTables | <code>object</code> | Object structure tables. When key is name table, values is structure fields. |

<a name="BrowserDataBaseClass+insert"></a>

### browserDataBaseClass.insert(table, fields, arInsert) ⇒ <code>Promise</code>
Insert record to database.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| fields | <code>array</code> | Array name fields. |
| arInsert | <code>array</code> | Array values |

<a name="BrowserDataBaseClass+isEmpty"></a>

### browserDataBaseClass.isEmpty() ⇒ <code>Promise</code>
Check database have tables.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  
<a name="BrowserDataBaseClass+getAll"></a>

### browserDataBaseClass.getAll(table) ⇒ <code>Promise</code>
Get all record from table

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |

<a name="BrowserDataBaseClass+getByPk"></a>

### browserDataBaseClass.getByPk(table, pkValue) ⇒ <code>Promise</code>
Get record by primary key value.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| pkValue | <code>\*</code> | Primary key value. |

<a name="BrowserDataBaseClass+getByRequire"></a>

### browserDataBaseClass.getByRequire(table, indexRequire, indexValue) ⇒ <code>Promise</code>
Get record by require index.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| indexRequire | <code>string</code> | Name index what be require. |
| indexValue | <code>\*</code> | Value index |

<a name="BrowserDataBaseClass+upInsert"></a>

### browserDataBaseClass.upInsert(table, newFields) ⇒ <code>Promise</code>
Update or insert record to table.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| newFields | <code>object</code> | Object insert or update. |

<a name="BrowserDataBaseClass+updateByPk"></a>

### browserDataBaseClass.updateByPk(table, pkValue, changeFields) ⇒ <code>Promise</code>
Update record by primary key.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| pkValue | <code>\*</code> | Primary key value. |
| changeFields | <code>object</code> | Object change fields with new values. |

<a name="BrowserDataBaseClass+removeAll"></a>

### browserDataBaseClass.removeAll(table) ⇒ <code>Promise</code>
Remove all records from table

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |

<a name="BrowserDataBaseClass+removeByPk"></a>

### browserDataBaseClass.removeByPk(table, pkValue) ⇒ <code>Promise</code>
Remove record by primary key.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| pkValue | <code>\*</code> | Primary key value. |

<a name="BrowserDataBaseClass+close"></a>

### browserDataBaseClass.close()
Close database.

**Kind**: instance method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  
<a name="BrowserDataBaseClass.driverConst"></a>

### BrowserDataBaseClass.driverConst() ⇒ <code>Object</code>
Constant drivers.

**Kind**: static method of <code>[BrowserDataBaseClass](#BrowserDataBaseClass)</code>  
