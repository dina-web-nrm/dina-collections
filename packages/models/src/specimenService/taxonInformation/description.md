# taxonInformation

Information about an [individual's](__DOCLINK__individual/) taxon, for example its accepted name according to the local classification. This term can also hold other taxon names which are not part of a [determination](__DOCLINK__determination/).


## Short description

Information about the taxon to which an individual is assigned.


### Definition

Information about the taxon to which an [individual](__DOCLINK__individual/) is currently assigned according to the local classification, or other names that has been associated with the individual that do not qualify as [determinations](__DOCLINK__determination/).


### Examples

"Pusa hispida" is the accepted name for a taxon in the local classification, and “Phoca hispida” one of its synonyms. Consequently, "Pusa hispida" should be the locally accepted name (curatorial name) for a specimen that has been determined as "Phoca hispida".


### Notes

The purpose of this concept is:

1. to keep information of the currently accepted name for an individual, and
2. to accommodate taxon-related legacy data that do not fit into taxon in the taxonomyService or into determination.

The data model is flexible, and it is possible to treat a locally accepted name for a specimen as a determination. One might then ask if there are cases when this should not be done? In principle, you should not use determination *if you cannot assume that the taxon name properly represents an original determination, and if it is impossible to assess whether that is the case*.

Imagine for example that the text on a determination label reads "not taxon x", while the name "taxon x" has been recorded as the name for the specimen in an old system (this could happen in collections where taxonomy is tightly connected to storage and it is important to just record some name). Without other information, it would be impossible to know that "taxon x" was derived from the text "not taxon x". Since you cannot be sure of where the information comes from, there would be no way to correct the erroneous determination record.

Another case is when a name at a different rank, let say a family, has been recorded from a determination to a subfamily written on the label, without saying anything about how the transformation was done. There can also be undocumented taxonomic interpretations at the same level, like when an original determination to "Phoca hispida" is recorded as just "Pusa hispida".


### See also

[determination](__DOCLINK__determination/), [taxon](__DOCLINK__taxon/)
