<a name="BrowerDataBaseClass"></a>

## BrowerDataBaseClass
Class for work this browsers databases.

**Kind**: global class  

* [BrowerDataBaseClass](#BrowerDataBaseClass)
    * _instance_
        * [.queryConst()](#BrowerDataBaseClass+queryConst) ⇒ <code>Object</code>
        * [.isOpen()](#BrowerDataBaseClass+isOpen) ⇒ <code>boolean</code>
        * [.drop()](#BrowerDataBaseClass+drop) ⇒ <code>Promise</code>
        * [.init(objectTables)](#BrowerDataBaseClass+init) ⇒ <code>Promise</code>
        * [.insert(table, fields, arInsert)](#BrowerDataBaseClass+insert) ⇒ <code>Promise</code>
        * [.isEmpty()](#BrowerDataBaseClass+isEmpty) ⇒ <code>Promise</code>
        * [.getAll(table)](#BrowerDataBaseClass+getAll) ⇒ <code>Promise</code>
        * [.getByPk(table, pkValue)](#BrowerDataBaseClass+getByPk) ⇒ <code>Promise</code>
        * [.getByRequire(table, indexRequire, indexValue)](#BrowerDataBaseClass+getByRequire) ⇒ <code>Promise</code>
        * [.upInsert(table, newFields)](#BrowerDataBaseClass+upInsert) ⇒ <code>Promise</code>
        * [.updateByPk(table, pkValue, changeFields)](#BrowerDataBaseClass+updateByPk) ⇒ <code>Promise</code>
        * [.removeAll(table)](#BrowerDataBaseClass+removeAll) ⇒ <code>Promise</code>
        * [.removeByPk(table, pkValue)](#BrowerDataBaseClass+removeByPk) ⇒ <code>Promise</code>
        * [.close()](#BrowerDataBaseClass+close)
    * _static_
        * [.driverConst()](#BrowerDataBaseClass.driverConst) ⇒ <code>Object</code>

<a name="BrowerDataBaseClass+queryConst"></a>

### browerDataBaseClass.queryConst() ⇒ <code>Object</code>
Query constants.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  
<a name="BrowerDataBaseClass+isOpen"></a>

### browerDataBaseClass.isOpen() ⇒ <code>boolean</code>
Check database be open

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  
<a name="BrowerDataBaseClass+drop"></a>

### browerDataBaseClass.drop() ⇒ <code>Promise</code>
Drop database.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  
<a name="BrowerDataBaseClass+init"></a>

### browerDataBaseClass.init(objectTables) ⇒ <code>Promise</code>
Init database. If database is empty crete tables

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| objectTables | <code>object</code> | Object structure tables. When key is name table, values is structure fields. |

<a name="BrowerDataBaseClass+insert"></a>

### browerDataBaseClass.insert(table, fields, arInsert) ⇒ <code>Promise</code>
Insert record to database.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| fields | <code>array</code> | Array name fields. |
| arInsert | <code>array</code> | Array values |

<a name="BrowerDataBaseClass+isEmpty"></a>

### browerDataBaseClass.isEmpty() ⇒ <code>Promise</code>
Check database have tables.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  
<a name="BrowerDataBaseClass+getAll"></a>

### browerDataBaseClass.getAll(table) ⇒ <code>Promise</code>
Get all record from table

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |

<a name="BrowerDataBaseClass+getByPk"></a>

### browerDataBaseClass.getByPk(table, pkValue) ⇒ <code>Promise</code>
Get record by primary key value.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| pkValue | <code>\*</code> | Primary key value. |

<a name="BrowerDataBaseClass+getByRequire"></a>

### browerDataBaseClass.getByRequire(table, indexRequire, indexValue) ⇒ <code>Promise</code>
Get record by require index.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| indexRequire | <code>string</code> | Name index what be require. |
| indexValue | <code>\*</code> | Value index |

<a name="BrowerDataBaseClass+upInsert"></a>

### browerDataBaseClass.upInsert(table, newFields) ⇒ <code>Promise</code>
Update or insert record to table.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| newFields | <code>object</code> | Object insert or update. |

<a name="BrowerDataBaseClass+updateByPk"></a>

### browerDataBaseClass.updateByPk(table, pkValue, changeFields) ⇒ <code>Promise</code>
Update record by primary key.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| pkValue | <code>\*</code> | Primary key value. |
| changeFields | <code>object</code> | Object change fields with new values. |

<a name="BrowerDataBaseClass+removeAll"></a>

### browerDataBaseClass.removeAll(table) ⇒ <code>Promise</code>
Remove all records from table

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |

<a name="BrowerDataBaseClass+removeByPk"></a>

### browerDataBaseClass.removeByPk(table, pkValue) ⇒ <code>Promise</code>
Remove record by primary key.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Table name |
| pkValue | <code>\*</code> | Primary key value. |

<a name="BrowerDataBaseClass+close"></a>

### browerDataBaseClass.close()
Close database.

**Kind**: instance method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  
<a name="BrowerDataBaseClass.driverConst"></a>

### BrowerDataBaseClass.driverConst() ⇒ <code>Object</code>
Constant drivers.

**Kind**: static method of <code>[BrowerDataBaseClass](#BrowerDataBaseClass)</code>  
