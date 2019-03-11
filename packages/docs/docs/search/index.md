---
id: index
title: Search
sidebar_label: Search
---

> TODO: Make these notes readable

data flows

The postgres database contains different tables. Each table is owned by a
service. It is designed so that each service could use its own database,
although currently all tables are in the same database.

The database is queried with a getMany API: GET with query params for filtering,
applied like AND

search index can be rebuilt completely or incrementally updated, e.g. if one
specimen is updated in the UI it will trigger an incremental update. but say if
a storage location is updated and it is related to many (a number that can be
configured)specimens, then a rebuild of the whole index is done.

elasticsearch there are objects with flat structure and has all data used for

we build the nested format of the specimen, with all data joined in, and then
apply transformations on it to create the object for elasticsearch.

API query is a POST and in the body we can then do more advanced filtering with
both AND and OR

when interacting with the filter form in the UI there's a queryBuilder method
that builds the query object that is used for the API query. then the backend
transforms that query object into an elastic query, and then we get a result
from elastic search and transform it and return it so it can be displayed in the
UI. for specimens the response is a list of specimen ids

for UI components used to specify a filter, the query build uses both the
general filter form content and the input from the specific field component.
then what is returned from elasticsearch is an aggregation
