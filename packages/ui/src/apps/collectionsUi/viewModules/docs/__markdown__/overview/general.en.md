# Datamodel documentation

This is the official data model documentation for DINA Collections. Browse the navigation to the left to explore the content.

The data model consists of three architectural layers:

* *Services* (e.g. agentService and specimenService)
* *Models* (e.g. acquisition and determination)
* *Properties* (e.g. remarks in the model acquisition)

The data model is generic, which means that it should eventually support all kinds of natural history collections. We have tried to define individual models so that it is clear how they should be be used. One of the biggest challenges in building a generic model is different cataloging practices. What a catalog number refers to can differ a lot between collections. To accommodate that variation, we have introduced a special model called *specimen*. Unlike the others, this model is extremely flexible: a specimen is simply the "things" you register under the same catalog number.

[individual.lid](__DOCLINK__individual/lid)
