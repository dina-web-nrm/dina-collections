### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

#### [v0.17.5](https://github.com/DINA-Web/dina-collections/compare/v0.17.2...v0.17.5)

- Exclude tags containing "test" in changelog [`#447`](https://github.com/DINA-Web/dina-collections/pull/447)

#### [v0.17.2](https://github.com/DINA-Web/dina-collections/compare/v0.17.1...v0.17.2)

> 21 February 2019

- Tune search [`#445`](https://github.com/DINA-Web/dina-collections/pull/445)
- Fix relationship bugs [`#443`](https://github.com/DINA-Web/dina-collections/pull/443)

#### [v0.17.1](https://github.com/DINA-Web/dina-collections/compare/v0.17.0...v0.17.1)

> 19 February 2019

- Change export format: array to pipe-separated string, null to empty string [`#442`](https://github.com/DINA-Web/dina-collections/pull/442)
- Fix issues with saving records and other misc. bugs [`#439`](https://github.com/DINA-Web/dina-collections/pull/439)
- Fix no matches on mounting wall search [`#441`](https://github.com/DINA-Web/dina-collections/pull/441)
- Use wildcard for tag search [`#440`](https://github.com/DINA-Web/dina-collections/pull/440)

#### [v0.17.0](https://github.com/DINA-Web/dina-collections/compare/v0.16.4...v0.17.0)

> 19 February 2019

- Fix record event times, filter open-close effects, keyboard shortcuts bug and storage dropdown text [`#438`](https://github.com/DINA-Web/dina-collections/pull/438)
- Replace empty array with null in export [`#437`](https://github.com/DINA-Web/dina-collections/pull/437)
- Fix specimen record event timestamps & resource activity relationships [`#436`](https://github.com/DINA-Web/dina-collections/pull/436)

#### [v0.16.4](https://github.com/DINA-Web/dina-collections/compare/v0.16.3...v0.16.4)

> 18 February 2019

- Fix simple worker not doing non search jobs [`#435`](https://github.com/DINA-Web/dina-collections/pull/435)

#### [v0.16.3](https://github.com/DINA-Web/dina-collections/compare/v0.16.1...v0.16.3)

> 14 February 2019

- Fix rebuild search in docker [`#434`](https://github.com/DINA-Web/dina-collections/pull/434)
- Fix create agent with affiliation & focus edit button in agent dropdown [`#433`](https://github.com/DINA-Web/dina-collections/pull/433)
- Repair data export [`#432`](https://github.com/DINA-Web/dina-collections/pull/432)
- [BACKEND] Fix missing sanitized tag [`#431`](https://github.com/DINA-Web/dina-collections/pull/431)
- Log UI errors on the server and notify on Slack [`#430`](https://github.com/DINA-Web/dina-collections/pull/430)
- WIP Anton/fix search specimen [`#428`](https://github.com/DINA-Web/dina-collections/pull/428)

#### [v0.16.1](https://github.com/DINA-Web/dina-collections/compare/v0.16.0...v0.16.1)

> 12 February 2019

- Fix issues found in specimen form [`#426`](https://github.com/DINA-Web/dina-collections/pull/426)
- Help text updates [`#427`](https://github.com/DINA-Web/dina-collections/pull/427)

#### [v0.16.0](https://github.com/DINA-Web/dina-collections/compare/v0.15.2...v0.16.0)

> 12 February 2019

- Add dev script to export and import sql [`#424`](https://github.com/DINA-Web/dina-collections/pull/424)
- Make specimen search index update when non specimen resources are updated [`#421`](https://github.com/DINA-Web/dina-collections/pull/421)
- Fix content and bugs in search filter [`#423`](https://github.com/DINA-Web/dina-collections/pull/423)
- Update sample data [`#422`](https://github.com/DINA-Web/dina-collections/pull/422)
- Display storageLocation full text in physicalObjects header [`#420`](https://github.com/DINA-Web/dina-collections/pull/420)
- Fix navigation issue after creating and deleting [`#418`](https://github.com/DINA-Web/dina-collections/pull/418)
- Fix origin visibility in specimen form [`#419`](https://github.com/DINA-Web/dina-collections/pull/419)
- Show collecting position and other minor improvements [`#416`](https://github.com/DINA-Web/dina-collections/pull/416)
- Make origin fields initially hidden and fix some display of data [`#417`](https://github.com/DINA-Web/dina-collections/pull/417)
- Improve scripts - checkout tag branch, rebuild elastic, remote exec cmd [`#404`](https://github.com/DINA-Web/dina-collections/pull/404)
- Fix miscellaneous issues in specimen search and form [`#414`](https://github.com/DINA-Web/dina-collections/pull/414)
- Update external events text [`#415`](https://github.com/DINA-Web/dina-collections/pull/415)

#### [v0.15.2](https://github.com/DINA-Web/dina-collections/compare/v0.15.1...v0.15.2)

> 4 February 2019

- Anton prompt the user when leaving create form [`#410`](https://github.com/DINA-Web/dina-collections/pull/410)
- Implement search improvements [`#411`](https://github.com/DINA-Web/dina-collections/pull/411)
- Fix content update [`#412`](https://github.com/DINA-Web/dina-collections/pull/412)
- Add missing georeferenceSourcesText to migrations [`#409`](https://github.com/DINA-Web/dina-collections/pull/409)
- Ignore release candidates in changelog [`#408`](https://github.com/DINA-Web/dina-collections/pull/408)
- Fix checkboxes for appearance and selective breeding [`#407`](https://github.com/DINA-Web/dina-collections/pull/407)
- Fix issue storage locations missing from import [`#406`](https://github.com/DINA-Web/dina-collections/pull/406)
- Update sample data [`#405`](https://github.com/DINA-Web/dina-collections/pull/405)
- Update length & weight input & filters [`#403`](https://github.com/DINA-Web/dina-collections/pull/403)
- Fix bug focusing wrong specimen when sorting [`#402`](https://github.com/DINA-Web/dina-collections/pull/402)
- Fix elastic index not updated in time [`#398`](https://github.com/DINA-Web/dina-collections/pull/398)
- Add disambiguatingDescription in agent name filter [`#400`](https://github.com/DINA-Web/dina-collections/pull/400)
- Fix help texts [`#399`](https://github.com/DINA-Web/dina-collections/pull/399)
- Add validation for unique agent name + disambiguating desc [`#396`](https://github.com/DINA-Web/dina-collections/pull/396)
- Fix nested to core - always set array relationships [`#394`](https://github.com/DINA-Web/dina-collections/pull/394)
- Implement content updates [`#395`](https://github.com/DINA-Web/dina-collections/pull/395)

#### [v0.15.1](https://github.com/DINA-Web/dina-collections/compare/v0.15.0...v0.15.1)

> 28 January 2019

- Change shortcut select in picker from enter to space [`#393`](https://github.com/DINA-Web/dina-collections/pull/393)
- Fix agent filter suggestions dropdown [`#397`](https://github.com/DINA-Web/dina-collections/pull/397)

#### [v0.15.0](https://github.com/DINA-Web/dina-collections/compare/v0.14.0...v0.15.0)

> 25 January 2019

- Improve navigation and weight & length filter [`#392`](https://github.com/DINA-Web/dina-collections/pull/392)
- Improve tree data root  [`#387`](https://github.com/DINA-Web/dina-collections/pull/387)
- Add changelog and improve admin scripts [`#384`](https://github.com/DINA-Web/dina-collections/pull/384)
- Align behavior on creating new record of any type [`#391`](https://github.com/DINA-Web/dina-collections/pull/391)
- Add checkboxes for appearance and selective breeding [`#389`](https://github.com/DINA-Web/dina-collections/pull/389)
- Implement disambiguating description in agent [`#388`](https://github.com/DINA-Web/dina-collections/pull/388)
- Add help text in header [`#386`](https://github.com/DINA-Web/dina-collections/pull/386)
- Add help texts and header help icon [`#385`](https://github.com/DINA-Web/dina-collections/pull/385)
- Integration/update search [`#378`](https://github.com/DINA-Web/dina-collections/pull/378)
- [FEATURE] Implement tag type dropdown filter [`#382`](https://github.com/DINA-Web/dina-collections/pull/382)
- Fredrik/fix non specimen filter form unmount [`#383`](https://github.com/DINA-Web/dina-collections/pull/383)

#### [v0.14.0](https://github.com/DINA-Web/dina-collections/compare/v0.13.0...v0.14.0)

> 16 January 2019

- Fredrik/fix bugs [`#380`](https://github.com/DINA-Web/dina-collections/pull/380)
- Ida/implement new labels [`#379`](https://github.com/DINA-Web/dina-collections/pull/379)

#### [v0.13.0](https://github.com/DINA-Web/dina-collections/compare/v0.12.0...v0.13.0)

> 14 January 2019

- Markus/Update-sample-data-3 [`#373`](https://github.com/DINA-Web/dina-collections/pull/373)
- [UI] Fix delete storage without physical object [`#377`](https://github.com/DINA-Web/dina-collections/pull/377)
- Fredrik/fix section validation bug [`#375`](https://github.com/DINA-Web/dina-collections/pull/375)
- Anton/fix json api client [`#372`](https://github.com/DINA-Web/dina-collections/pull/372)
- fredrik/fix-taxon-name-pre-hook [`#374`](https://github.com/DINA-Web/dina-collections/pull/374)
- Fredrik/add validation resource forms [`#371`](https://github.com/DINA-Web/dina-collections/pull/371)

#### [v0.12.0](https://github.com/DINA-Web/dina-collections/compare/v0.11.1...v0.12.0)

> 10 January 2019

- Fredrik/fix remove bug [`#370`](https://github.com/DINA-Web/dina-collections/pull/370)
- Fredrik/improve record navigation bar [`#369`](https://github.com/DINA-Web/dina-collections/pull/369)

#### [v0.11.1](https://github.com/DINA-Web/dina-collections/compare/v0.11.0...v0.11.1)

> 20 December 2018

- Anton/fixes 8 [`#368`](https://github.com/DINA-Web/dina-collections/pull/368)

#### [v0.11.0](https://github.com/DINA-Web/dina-collections/compare/v0.10.1...v0.11.0)

> 20 December 2018

- Fredrik/add taxon delete post hook [`#364`](https://github.com/DINA-Web/dina-collections/pull/364)
- Anton/fixes 6 [`#367`](https://github.com/DINA-Web/dina-collections/pull/367)
- Markus/update-sample-data-2 [`#365`](https://github.com/DINA-Web/dina-collections/pull/365)
- Ida/add help icons [`#366`](https://github.com/DINA-Web/dina-collections/pull/366)
- [UI] Fix disabled submit button in ActionBar [`#363`](https://github.com/DINA-Web/dina-collections/pull/363)

#### [v0.10.1](https://github.com/DINA-Web/dina-collections/compare/v0.10.0...v0.10.1)

> 19 December 2018

- Anton/fixes 5 [`#362`](https://github.com/DINA-Web/dina-collections/pull/362)
- [UI] Fix closing behavior for specimen form modals [`#361`](https://github.com/DINA-Web/dina-collections/pull/361)
- Fredrik/fix specimens remove and agent misc [`#360`](https://github.com/DINA-Web/dina-collections/pull/360)

#### [v0.10.0](https://github.com/DINA-Web/dina-collections/compare/v0.9.3...v0.10.0)

> 18 December 2018

- Anton/add index for remove [`#359`](https://github.com/DINA-Web/dina-collections/pull/359)
- fredrik/implement-remove [`#329`](https://github.com/DINA-Web/dina-collections/pull/329)

#### [v0.9.3](https://github.com/DINA-Web/dina-collections/compare/v0.9.2...v0.9.3)

> 14 December 2018

- Anton/fix sql batch query [`#357`](https://github.com/DINA-Web/dina-collections/pull/357)

#### [v0.9.2](https://github.com/DINA-Web/dina-collections/compare/v0.9.1...v0.9.2)

> 14 December 2018

- Ingimar/binding images to version [`#356`](https://github.com/DINA-Web/dina-collections/pull/356)
- Ida/change parent dropdown to picker [`#351`](https://github.com/DINA-Web/dina-collections/pull/351)
- Anton/add simple migration script [`#355`](https://github.com/DINA-Web/dina-collections/pull/355)

#### [v0.9.1](https://github.com/DINA-Web/dina-collections/compare/v0.9.0...v0.9.1)

> 13 December 2018

- Markus/update sample data 1 [`#354`](https://github.com/DINA-Web/dina-collections/pull/354)

#### [v0.9.0](https://github.com/DINA-Web/dina-collections/compare/v0.8.6...v0.9.0)

> 12 December 2018

- Anton/add more agent types to search [`#348`](https://github.com/DINA-Web/dina-collections/pull/348)
- Markus/update sample data [`#352`](https://github.com/DINA-Web/dina-collections/pull/352)
- Markus/Update sample data [`#350`](https://github.com/DINA-Web/dina-collections/pull/350)
- [UI] Fix field widths [`#349`](https://github.com/DINA-Web/dina-collections/pull/349)
- Ida/set default value to radio ptions [`#342`](https://github.com/DINA-Web/dina-collections/pull/342)

#### [v0.8.6](https://github.com/DINA-Web/dina-collections/compare/v0.8.5...v0.8.6)

> 11 December 2018

- [SHARED] Use node:8-alpine docker image instead of pm2 [`#347`](https://github.com/DINA-Web/dina-collections/pull/347)

#### [v0.8.5](https://github.com/DINA-Web/dina-collections/compare/v0.8.4...v0.8.5)

> 10 December 2018

#### [v0.8.4](https://github.com/DINA-Web/dina-collections/compare/v0.8.3...v0.8.4)

> 10 December 2018

- Anton/stuff 2 [`#346`](https://github.com/DINA-Web/dina-collections/pull/346)
- [ROOT] Fix setup:loadTestData [`#345`](https://github.com/DINA-Web/dina-collections/pull/345)
- Anton/fix click magifying glass [`#344`](https://github.com/DINA-Web/dina-collections/pull/344)

#### [v0.8.3](https://github.com/DINA-Web/dina-collections/compare/v0.8.2...v0.8.3)

> 10 December 2018

- Anton/fix bug json api client [`#343`](https://github.com/DINA-Web/dina-collections/pull/343)

#### [v0.8.2](https://github.com/DINA-Web/dina-collections/compare/v0.7.2...v0.8.2)

> 10 December 2018

- Anton/show src data [`#341`](https://github.com/DINA-Web/dina-collections/pull/341)

#### [v0.7.2](https://github.com/DINA-Web/dina-collections/compare/v0.7.1...v0.7.2)

> 7 December 2018

- [ROOT] Updated make targets to match Makefile [`#340`](https://github.com/DINA-Web/dina-collections/pull/340)
- Anton/add sample data [`#339`](https://github.com/DINA-Web/dina-collections/pull/339)
- Anton/fix json api client bug [`#338`](https://github.com/DINA-Web/dina-collections/pull/338)
- Fredrik/fix record external events and rank class [`#337`](https://github.com/DINA-Web/dina-collections/pull/337)
- [UI] Add legacy data to agent form [`#332`](https://github.com/DINA-Web/dina-collections/pull/332)
- [UI] Fix fields width in forms [`#330`](https://github.com/DINA-Web/dina-collections/pull/330)

#### [v0.7.1](https://github.com/DINA-Web/dina-collections/compare/v0.7.0...v0.7.1)

> 6 December 2018

- [BACKEND] Fix inconsistent return [`#335`](https://github.com/DINA-Web/dina-collections/pull/335)

#### [v0.7.0](https://github.com/DINA-Web/dina-collections/compare/v0.6.4...v0.7.0)

> 6 December 2018

- [BACKEND] Bail storageLocation migration if no name [`#334`](https://github.com/DINA-Web/dina-collections/pull/334)
- Anton/adapt to new data [`#333`](https://github.com/DINA-Web/dina-collections/pull/333)

#### [v0.6.4](https://github.com/DINA-Web/dina-collections/compare/v0.6.3...v0.6.4)

> 5 December 2018

- [ROOT] Exclude master branch from build [`#331`](https://github.com/DINA-Web/dina-collections/pull/331)

#### [v0.6.3](https://github.com/DINA-Web/dina-collections/compare/v0.6.2...v0.6.3)

> 5 December 2018

- [UI] Change order of filters in mammal search [`#328`](https://github.com/DINA-Web/dina-collections/pull/328)

#### [v0.6.2](https://github.com/DINA-Web/dina-collections/compare/v0.6.1...v0.6.2)

> 5 December 2018

- Anton/fix deploy ui bug [`#327`](https://github.com/DINA-Web/dina-collections/pull/327)
- [UI] Fix style and change Dina Collections to DINA Collections [`#326`](https://github.com/DINA-Web/dina-collections/pull/326)

#### [v0.6.1](https://github.com/DINA-Web/dina-collections/compare/v0.6.0...v0.6.1)

> 3 December 2018

#### [v0.6.0](https://github.com/DINA-Web/dina-collections/compare/v0.5.2...v0.6.0)

> 3 December 2018

- Ida/implement start page [`#324`](https://github.com/DINA-Web/dina-collections/pull/324)

#### [v0.5.2](https://github.com/DINA-Web/dina-collections/compare/v0.5.1...v0.5.2)

> 30 November 2018

- [BACKEND] Fix place buildKey data transformation [`#325`](https://github.com/DINA-Web/dina-collections/pull/325)

#### [v0.5.1](https://github.com/DINA-Web/dina-collections/compare/v0.5.0...v0.5.1)

> 29 November 2018

- Ida/improve result options bar [`#320`](https://github.com/DINA-Web/dina-collections/pull/320)

#### [v0.5.0](https://github.com/DINA-Web/dina-collections/compare/v0.4.3...v0.5.0)

> 28 November 2018

- Fredrik/change curatorial name to taxon [`#323`](https://github.com/DINA-Web/dina-collections/pull/323)

#### [v0.4.3](https://github.com/DINA-Web/dina-collections/compare/v0.4.2...v0.4.3)

> 26 November 2018

- Anton/fix limit in rebuild view [`#322`](https://github.com/DINA-Web/dina-collections/pull/322)

#### [v0.4.2](https://github.com/DINA-Web/dina-collections/compare/v0.4.1...v0.4.2)

> 26 November 2018

- [BACKEND] Fix searchSpecimenRequestRebuildView limit [`#321`](https://github.com/DINA-Web/dina-collections/pull/321)
- [SCRIPTS] Add script update-master.sh [`#319`](https://github.com/DINA-Web/dina-collections/pull/319)

#### [v0.4.1](https://github.com/DINA-Web/dina-collections/compare/v0.4.0...v0.4.1)

> 26 November 2018

- [ROOT] Add exec script to package.json [`#318`](https://github.com/DINA-Web/dina-collections/pull/318)
- [SCRIPTS] Add, FULL_PATH is fetched with cmd [`#307`](https://github.com/DINA-Web/dina-collections/pull/307)

#### [v0.4.0](https://github.com/DINA-Web/dina-collections/compare/v0.3.1...v0.4.0)

> 26 November 2018

- Ida/refine tree design and Ida/add error color for determinations and agent roles [`#317`](https://github.com/DINA-Web/dina-collections/pull/317)
- Fredrik/misc fixes 3 [`#315`](https://github.com/DINA-Web/dina-collections/pull/315)
- Fredrik/fix date range migrations [`#313`](https://github.com/DINA-Web/dina-collections/pull/313)
- Ida/implement empty state for results [`#314`](https://github.com/DINA-Web/dina-collections/pull/314)
- Fredrik/implement frontend remove resource [`#312`](https://github.com/DINA-Web/dina-collections/pull/312)
- Ingimar/check services scripts [`#305`](https://github.com/DINA-Web/dina-collections/pull/305)

#### [v0.3.1](https://github.com/DINA-Web/dina-collections/compare/v0.3.0...v0.3.1)

> 21 November 2018

- Anton/fixes 3 [`#311`](https://github.com/DINA-Web/dina-collections/pull/311)
- Anton/fixes 2 [`#310`](https://github.com/DINA-Web/dina-collections/pull/310)

#### [v0.3.0](https://github.com/DINA-Web/dina-collections/compare/v0.2.2...v0.3.0)

> 21 November 2018

- Anton/small bugs fixes [`#309`](https://github.com/DINA-Web/dina-collections/pull/309)
- Fredrik/implement unified record action bar [`#308`](https://github.com/DINA-Web/dina-collections/pull/308)
- Ida/add agent role title affiliation [`#304`](https://github.com/DINA-Web/dina-collections/pull/304)

#### [v0.2.2](https://github.com/DINA-Web/dina-collections/compare/v0.2.1...v0.2.2)

> 19 November 2018

- Anton/v2 datamodel 2 [`#306`](https://github.com/DINA-Web/dina-collections/pull/306)

#### v0.2.1

> 19 November 2018

- Anton/v2 datamodel [`#302`](https://github.com/DINA-Web/dina-collections/pull/302)
- [UI] Forward showSectionsInNavigation [`#303`](https://github.com/DINA-Web/dina-collections/pull/303)
- [UI] Implement record history events in all forms [`#301`](https://github.com/DINA-Web/dina-collections/pull/301)
- Fredrik/fix picker [`#300`](https://github.com/DINA-Web/dina-collections/pull/300)
- Fredrik/implement browser back for modals and picker [`#299`](https://github.com/DINA-Web/dina-collections/pull/299)
- Fredrik/move storage location validation to frontend [`#298`](https://github.com/DINA-Web/dina-collections/pull/298)
- [UI] Log out user on 403 [`#297`](https://github.com/DINA-Web/dina-collections/pull/297)
- Fredrik/add validation error mapping [`#296`](https://github.com/DINA-Web/dina-collections/pull/296)
- Fredrik/fix reset table search and storage location relations issue [`#295`](https://github.com/DINA-Web/dina-collections/pull/295)
- Fredrik/implement new date filter [`#294`](https://github.com/DINA-Web/dina-collections/pull/294)
- [UI] Implement remove confirmation popup [`#288`](https://github.com/DINA-Web/dina-collections/pull/288)
- [MIGRATIONS] Fix number of init specimen [`#293`](https://github.com/DINA-Web/dina-collections/pull/293)
- [ROOT] Fix travis issue [`#292`](https://github.com/DINA-Web/dina-collections/pull/292)
- [ROOT] Fix syntax error .travis [`#291`](https://github.com/DINA-Web/dina-collections/pull/291)
- [-] Update yarn.lock with ajv-keywords [`#290`](https://github.com/DINA-Web/dina-collections/pull/290)
- Fredrik/fix taxon issues and misc bugs [`#289`](https://github.com/DINA-Web/dina-collections/pull/289)
- Anton/wip migrations [`#276`](https://github.com/DINA-Web/dina-collections/pull/276)
- Fredrik/implement notice for unsaved changes [`#286`](https://github.com/DINA-Web/dina-collections/pull/286)
- Add CONTRIBUTING.md with git guidelines [`#287`](https://github.com/DINA-Web/dina-collections/pull/287)
- [ROOT] Add, uploading dina-realm to keycloak [`#280`](https://github.com/DINA-Web/dina-collections/pull/280)
- [STYLE] Add error style to navigation step arrow [`#285`](https://github.com/DINA-Web/dina-collections/pull/285)
- Ida/miscellaneous issues fix [`#283`](https://github.com/DINA-Web/dina-collections/pull/283)
- Fredrik/add schema keyword and section validation [`#284`](https://github.com/DINA-Web/dina-collections/pull/284)
- Fredrik/fix docpad and memwatch [`#282`](https://github.com/DINA-Web/dina-collections/pull/282)
- Revert "Fredrik/replace yarn with npm and misc" [`#279`](https://github.com/DINA-Web/dina-collections/pull/279)
- [KEYCLOAK] Add, Timeout for 'SSO Session idle','SSO Session Max' and … [`#275`](https://github.com/DINA-Web/dina-collections/pull/275)
- Anton/search fixes [`#261`](https://github.com/DINA-Web/dina-collections/pull/261)
- Ida/implement record history events [`#273`](https://github.com/DINA-Web/dina-collections/pull/273)
- Fredrik/replace yarn with npm and misc [`#274`](https://github.com/DINA-Web/dina-collections/pull/274)
- Fredrik/fix wrap in column bug [`#271`](https://github.com/DINA-Web/dina-collections/pull/271)
- Integration/docker and scripts [`#258`](https://github.com/DINA-Web/dina-collections/pull/258)
- Fredrik/add agent fields [`#269`](https://github.com/DINA-Web/dina-collections/pull/269)
- Fredrik/implement taxon and storage forms [`#263`](https://github.com/DINA-Web/dina-collections/pull/263)
- [UI] Fix coordinateInput input field cursor jumps to end [`#267`](https://github.com/DINA-Web/dina-collections/pull/267)
- Ida/implement location and origin and fix remarks field with long content [`#266`](https://github.com/DINA-Web/dina-collections/pull/266)
- Fredrik/implement agent, locality, taxon name forms [`#256`](https://github.com/DINA-Web/dina-collections/pull/256)
- Anton/improve resource activity [`#255`](https://github.com/DINA-Web/dina-collections/pull/255)
- Anton/rm fixes [`#254`](https://github.com/DINA-Web/dina-collections/pull/254)
- Anton/fix shortcuts layer [`#253`](https://github.com/DINA-Web/dina-collections/pull/253)
- Anton/minor fixes [`#252`](https://github.com/DINA-Web/dina-collections/pull/252)
- [UI] Implement radio group in location and origin section [`#251`](https://github.com/DINA-Web/dina-collections/pull/251)
- Anton/minor fixes [`#250`](https://github.com/DINA-Web/dina-collections/pull/250)
- Anton/improve resource manager and search 2 [`#243`](https://github.com/DINA-Web/dina-collections/pull/243)
- Edit , map postgres-ports, postgres image version [`#248`](https://github.com/DINA-Web/dina-collections/pull/248)
- Add, pgAdmin 4 web-interface [`#249`](https://github.com/DINA-Web/dina-collections/pull/249)
- Fredrik/misc fixes [`#247`](https://github.com/DINA-Web/dina-collections/pull/247)
- Fredrik/form fixes [`#246`](https://github.com/DINA-Web/dina-collections/pull/246)
- Fredrik/implement section taxonomy [`#245`](https://github.com/DINA-Web/dina-collections/pull/245)
- [UI] Implement collectingAndDeath section [`#244`](https://github.com/DINA-Web/dina-collections/pull/244)
- Ida/features section  [`#242`](https://github.com/DINA-Web/dina-collections/pull/242)
- Fredrik/implement section physical objects [`#241`](https://github.com/DINA-Web/dina-collections/pull/241)
- Anton/improve resource manager and search [`#240`](https://github.com/DINA-Web/dina-collections/pull/240)
- Fredrik/implement form infrastructure [`#238`](https://github.com/DINA-Web/dina-collections/pull/238)
- Anton/support removing resources [`#237`](https://github.com/DINA-Web/dina-collections/pull/237)
- Ida/implement taxonomy section [`#239`](https://github.com/DINA-Web/dina-collections/pull/239)
- Anton/fixes for new stage [`#236`](https://github.com/DINA-Web/dina-collections/pull/236)
- integration/revamp record form [`#218`](https://github.com/DINA-Web/dina-collections/pull/218)
- Anton/allow exporting all models to csv [`#232`](https://github.com/DINA-Web/dina-collections/pull/232)
- Anton/add parameter error for duplicated catalog number [`#230`](https://github.com/DINA-Web/dina-collections/pull/230)
- wip setup-catalog-number-generation [`#226`](https://github.com/DINA-Web/dina-collections/pull/226)
- Revert "Ida/form section navigation" [`#228`](https://github.com/DINA-Web/dina-collections/pull/228)
- Anton/add schema to query [`#223`](https://github.com/DINA-Web/dina-collections/pull/223)
- [UI] Deactivate frontend api validation [`#221`](https://github.com/DINA-Web/dina-collections/pull/221)
- Fredrik/increase general font and em size [`#222`](https://github.com/DINA-Web/dina-collections/pull/222)
- Ida/result table sorting [`#214`](https://github.com/DINA-Web/dina-collections/pull/214)
- Anton/fix circular dependencies [`#215`](https://github.com/DINA-Web/dina-collections/pull/215)
- Fredrik/add search length filter [`#216`](https://github.com/DINA-Web/dina-collections/pull/216)
- [UI] Fix error delete in keyObjModule [`#213`](https://github.com/DINA-Web/dina-collections/pull/213)
- Add id/text togglable dropdown search [`#201`](https://github.com/DINA-Web/dina-collections/pull/201)
- Anton/fix file download [`#212`](https://github.com/DINA-Web/dina-collections/pull/212)
- Anton/add sql sorting [`#211`](https://github.com/DINA-Web/dina-collections/pull/211)
- Anton/fix memwatch issue [`#210`](https://github.com/DINA-Web/dina-collections/pull/210)
- Anton/add exports [`#209`](https://github.com/DINA-Web/dina-collections/pull/209)
- [UI] Replace query-string with query-string@5 [`#208`](https://github.com/DINA-Web/dina-collections/pull/208)
- Fredrik/field label fixes [`#207`](https://github.com/DINA-Web/dina-collections/pull/207)
- Fredrik/improve date [`#206`](https://github.com/DINA-Web/dina-collections/pull/206)
- Anton/add resource log [`#205`](https://github.com/DINA-Web/dina-collections/pull/205)
- Fredrik/add close icon to information sidebar [`#204`](https://github.com/DINA-Web/dina-collections/pull/204)
- Anton/fix fredrik review large mr [`#203`](https://github.com/DINA-Web/dina-collections/pull/203)
- Anton/fix inc update schema [`#202`](https://github.com/DINA-Web/dina-collections/pull/202)
- Ida/add remarks component [`#198`](https://github.com/DINA-Web/dina-collections/pull/198)
- Fredrik/fix logout bug [`#199`](https://github.com/DINA-Web/dina-collections/pull/199)
- Ida/remarks component [`#197`](https://github.com/DINA-Web/dina-collections/pull/197)
- fredrik/implement-form-section-navigation [`#196`](https://github.com/DINA-Web/dina-collections/pull/196)
- Ida/update form label [`#195`](https://github.com/DINA-Web/dina-collections/pull/195)
- Fredrik/wire up range filters [`#194`](https://github.com/DINA-Web/dina-collections/pull/194)
- Anton/fix remaning migrations 2 [`#193`](https://github.com/DINA-Web/dina-collections/pull/193)
- Anton/fix remaning migrations [`#192`](https://github.com/DINA-Web/dina-collections/pull/192)
- [UI] Add Filter title translations [`#191`](https://github.com/DINA-Web/dina-collections/pull/191)
- Fredrik/adapt search ui to backend [`#190`](https://github.com/DINA-Web/dina-collections/pull/190)
- Ida/improve result table [`#189`](https://github.com/DINA-Web/dina-collections/pull/189)
- Anton/add search search fields [`#188`](https://github.com/DINA-Web/dina-collections/pull/188)
- Anton/add search result fields [`#187`](https://github.com/DINA-Web/dina-collections/pull/187)
- Ida/add navigation url [`#184`](https://github.com/DINA-Web/dina-collections/pull/184)
- [UI] Add clear button in Dropdown [`#186`](https://github.com/DINA-Web/dina-collections/pull/186)
- Fredrik/refactor table data and implement filters [`#185`](https://github.com/DINA-Web/dina-collections/pull/185)
- Anton/fetch search result data from elastic [`#181`](https://github.com/DINA-Web/dina-collections/pull/181)
- Fredrik/specimen mammals fixes [`#183`](https://github.com/DINA-Web/dina-collections/pull/183)
- Fredrik/slim record navigation bar and add translations [`#182`](https://github.com/DINA-Web/dina-collections/pull/182)
- [UI] Add scrollTo behavior in ResultTable [`#180`](https://github.com/DINA-Web/dina-collections/pull/180)
- Anton/migrate taxonomy 2 [`#179`](https://github.com/DINA-Web/dina-collections/pull/179)
- fredrik/add specimens column settings [`#178`](https://github.com/DINA-Web/dina-collections/pull/178)
- Anton/add backend filter support [`#177`](https://github.com/DINA-Web/dina-collections/pull/177)
- Fredrik/add specimen filters, record navigation and fix result table scrolling [`#176`](https://github.com/DINA-Web/dina-collections/pull/176)
- Anton/fix docker compose data [`#175`](https://github.com/DINA-Web/dina-collections/pull/175)
- Anton/backend cleanup [`#164`](https://github.com/DINA-Web/dina-collections/pull/164)
- Result Table View [`#174`](https://github.com/DINA-Web/dina-collections/pull/174)
- [UI] Replace layout size calculations with flexbox [`#171`](https://github.com/DINA-Web/dina-collections/pull/171)
- Revert "Ida/result table view" [`#173`](https://github.com/DINA-Web/dina-collections/pull/173)
- Ida/result table view [`#170`](https://github.com/DINA-Web/dina-collections/pull/170)
- Fredrik/add multiple choice checkboxes and filter structure [`#169`](https://github.com/DINA-Web/dina-collections/pull/169)
- [UI] Add resultOptionsBar [`#167`](https://github.com/DINA-Web/dina-collections/pull/167)
- Fredrik/fix nav [`#168`](https://github.com/DINA-Web/dina-collections/pull/168)
- Fredrik/fix css import [`#166`](https://github.com/DINA-Web/dina-collections/pull/166)
- Fredrik/app cleanup and record navigation bar integration [`#165`](https://github.com/DINA-Web/dina-collections/pull/165)
- New conpoment RecordNavigationBar and add in storybook [`#160`](https://github.com/DINA-Web/dina-collections/pull/160)
- Fredrik/add mammals view skeleton [`#162`](https://github.com/DINA-Web/dina-collections/pull/162)
- [SHARED] Fix docker-compose.data.yaml [`#163`](https://github.com/DINA-Web/dina-collections/pull/163)
- Anton/search 2 back [`#161`](https://github.com/DINA-Web/dina-collections/pull/161)
- Fredrik/add layout components [`#158`](https://github.com/DINA-Web/dina-collections/pull/158)
- Anton/fix search deploy 1 [`#156`](https://github.com/DINA-Web/dina-collections/pull/156)
- [BACKEND] Make it possible to run worker when api inactive [`#155`](https://github.com/DINA-Web/dina-collections/pull/155)
- Fredrik/add date view component [`#153`](https://github.com/DINA-Web/dina-collections/pull/153)
- WIP Integration/search [`#148`](https://github.com/DINA-Web/dina-collections/pull/148)
- Anton/jobs [`#152`](https://github.com/DINA-Web/dina-collections/pull/152)
- Fredrik/scope search module [`#151`](https://github.com/DINA-Web/dina-collections/pull/151)
- Fredrik/make formatters async [`#150`](https://github.com/DINA-Web/dina-collections/pull/150)
- Anton/search v3 [`#149`](https://github.com/DINA-Web/dina-collections/pull/149)
- Fredrik/centralize relationships specification [`#145`](https://github.com/DINA-Web/dina-collections/pull/145)
- Anton/v1 search engine [`#146`](https://github.com/DINA-Web/dina-collections/pull/146)
- Update README [`#144`](https://github.com/DINA-Web/dina-collections/pull/144)
- Fredrik/fix preparation types storage location bugs [`#142`](https://github.com/DINA-Web/dina-collections/pull/142)
- [UI] Fix field label typo [`#141`](https://github.com/DINA-Web/dina-collections/pull/141)
- Fredrik/fix specimen read only [`#139`](https://github.com/DINA-Web/dina-collections/pull/139)
- Fredrik/add backend integrations and keycloak users [`#140`](https://github.com/DINA-Web/dina-collections/pull/140)
- Improve translations and help notifications [`#137`](https://github.com/DINA-Web/dina-collections/pull/137)
- Fredrik/create physical objects during migration [`#138`](https://github.com/DINA-Web/dina-collections/pull/138)
- Fredrik/add agent handling [`#136`](https://github.com/DINA-Web/dina-collections/pull/136)
- Anton/add form fields [`#135`](https://github.com/DINA-Web/dina-collections/pull/135)
- Anton/prettyfy json [`#134`](https://github.com/DINA-Web/dina-collections/pull/134)
- Anton/base mammal form on specimen [`#133`](https://github.com/DINA-Web/dina-collections/pull/133)
- Anton/datamodel cleanup [`#132`](https://github.com/DINA-Web/dina-collections/pull/132)
- [BACKEND] Fix wrong format exampleData identifierType [`#131`](https://github.com/DINA-Web/dina-collections/pull/131)
- Anton/avoid to large request headers [`#130`](https://github.com/DINA-Web/dina-collections/pull/130)
- Anton/connect storate taxonomy [`#129`](https://github.com/DINA-Web/dina-collections/pull/129)
- Fredrik/implement deactivate resource [`#127`](https://github.com/DINA-Web/dina-collections/pull/127)
- Anton/improve data fetching [`#128`](https://github.com/DINA-Web/dina-collections/pull/128)
- Fredrik/add-support-for-inverse-operation-id [`#126`](https://github.com/DINA-Web/dina-collections/pull/126)
- Fredrik/extend platform support for relationships [`#125`](https://github.com/DINA-Web/dina-collections/pull/125)
- Fredrik/replace resource plural and refactor operation id [`#123`](https://github.com/DINA-Web/dina-collections/pull/123)
- Markus/add descriptions [`#122`](https://github.com/DINA-Web/dina-collections/pull/122)
- Fredrik/add taxonomy crud [`#121`](https://github.com/DINA-Web/dina-collections/pull/121)
- [UI] Use REACT_APP_DISABLE_AUTH to disable auth [`#120`](https://github.com/DINA-Web/dina-collections/pull/120)
- Anton/remove not used model params [`#119`](https://github.com/DINA-Web/dina-collections/pull/119)
- Anton/v1 aq handling [`#118`](https://github.com/DINA-Web/dina-collections/pull/118)
- Anton/add identifiers type specimens as types [`#117`](https://github.com/DINA-Web/dina-collections/pull/117)
- Anton/add all specimens [`#116`](https://github.com/DINA-Web/dina-collections/pull/116)
- Anton/implement events [`#115`](https://github.com/DINA-Web/dina-collections/pull/115)
- Anton/crud manager [`#111`](https://github.com/DINA-Web/dina-collections/pull/111)
- Anton/add create with relations [`#114`](https://github.com/DINA-Web/dina-collections/pull/114)
- Display loading error when module loading fail [`#113`](https://github.com/DINA-Web/dina-collections/pull/113)
- Check for identifier type for catalog number [`#112`](https://github.com/DINA-Web/dina-collections/pull/112)
- Fredrik/add record history events [`#110`](https://github.com/DINA-Web/dina-collections/pull/110)
- Fredrik/type specimen handling and more [`#109`](https://github.com/DINA-Web/dina-collections/pull/109)
- Fredrik/fix inspect link event bug [`#108`](https://github.com/DINA-Web/dina-collections/pull/108)
- Anton/data model documentation improvements [`#107`](https://github.com/DINA-Web/dina-collections/pull/107)
- Fredrik/additional identifiers [`#105`](https://github.com/DINA-Web/dina-collections/pull/105)
- Fix wrong names on render functions [`#106`](https://github.com/DINA-Web/dina-collections/pull/106)
- Generalize CRUD blocks, refactor keyObjectModule, add StorageLocationManager [`#104`](https://github.com/DINA-Web/dina-collections/pull/104)
- Anton/docker fixes [`#102`](https://github.com/DINA-Web/dina-collections/pull/102)
- Anton/data model renamings [`#103`](https://github.com/DINA-Web/dina-collections/pull/103)
- Anton/normalize backend [`#100`](https://github.com/DINA-Web/dina-collections/pull/100)
- Fredrik/crud manager bug fixes [`#101`](https://github.com/DINA-Web/dina-collections/pull/101)
- Fredrik/move non crud from data modules [`#99`](https://github.com/DINA-Web/dina-collections/pull/99)
- Fredrik/create data modules concept [`#98`](https://github.com/DINA-Web/dina-collections/pull/98)
- Fix locality api bug [`#97`](https://github.com/DINA-Web/dina-collections/pull/97)
- Fredrik/several physical objects [`#87`](https://github.com/DINA-Web/dina-collections/pull/87)
- Fredrik/various refactoring [`#95`](https://github.com/DINA-Web/dina-collections/pull/95)
- Anton/update collecting information localities [`#94`](https://github.com/DINA-Web/dina-collections/pull/94)
- Mount data as volume [`#93`](https://github.com/DINA-Web/dina-collections/pull/93)
- Require css from main instead of from components [`#92`](https://github.com/DINA-Web/dina-collections/pull/92)
- Add first version read only data [`#83`](https://github.com/DINA-Web/dina-collections/pull/83)
- Anton/create advanced locality dropdown [`#91`](https://github.com/DINA-Web/dina-collections/pull/91)
- Fredrik/add initial not checked in data [`#89`](https://github.com/DINA-Web/dina-collections/pull/89)
- Anton/next step localities refactor next [`#88`](https://github.com/DINA-Web/dina-collections/pull/88)
- Fredrik/make general accordion component [`#86`](https://github.com/DINA-Web/dina-collections/pull/86)
- Refactor local dropdown to do filtering of options [`#85`](https://github.com/DINA-Web/dina-collections/pull/85)
- Fredrik/refactor search to use id [`#84`](https://github.com/DINA-Web/dina-collections/pull/84)
- Fix auth [`#82`](https://github.com/DINA-Web/dina-collections/pull/82)
- Fredrik/refactor taxonomy module [`#81`](https://github.com/DINA-Web/dina-collections/pull/81)
- Update backend index path in compose [`#80`](https://github.com/DINA-Web/dina-collections/pull/80)
- Update curated locality data [`#79`](https://github.com/DINA-Web/dina-collections/pull/79)
- Anton/fix api not deploying [`#78`](https://github.com/DINA-Web/dina-collections/pull/78)
- Integration/adapt to new services [`#58`](https://github.com/DINA-Web/dina-collections/pull/58)
- Fredrik/improve form loading time [`#77`](https://github.com/DINA-Web/dina-collections/pull/77)
- Improve form fields [`#76`](https://github.com/DINA-Web/dina-collections/pull/76)
- Fredrik/improve form performance [`#74`](https://github.com/DINA-Web/dina-collections/pull/74)
- Anton/migrate taxonomy [`#75`](https://github.com/DINA-Web/dina-collections/pull/75)
- Anton/cleanups [`#73`](https://github.com/DINA-Web/dina-collections/pull/73)
- Fix query param validation frontend [`#72`](https://github.com/DINA-Web/dina-collections/pull/72)
- Fredrik/rebuild feature observations [`#71`](https://github.com/DINA-Web/dina-collections/pull/71)
- Anton/add backend structure tests [`#70`](https://github.com/DINA-Web/dina-collections/pull/70)
- Anton/improve create build create [`#69`](https://github.com/DINA-Web/dina-collections/pull/69)
- Anton/improve endpoint factory [`#68`](https://github.com/DINA-Web/dina-collections/pull/68)
- Anton/next step locality server [`#66`](https://github.com/DINA-Web/dina-collections/pull/66)
- Anton/improve swagger errors [`#67`](https://github.com/DINA-Web/dina-collections/pull/67)
- Adapt to new curatedLocalities and featureObservationTypes [`#64`](https://github.com/DINA-Web/dina-collections/pull/64)
- Fredrik/add service redux modules [`#63`](https://github.com/DINA-Web/dina-collections/pull/63)
- Fredrik/adapt mammal form to storage service [`#61`](https://github.com/DINA-Web/dina-collections/pull/61)
- Rewrite error handling [`#60`](https://github.com/DINA-Web/dina-collections/pull/60)
- Normalize specimen v1 [`#59`](https://github.com/DINA-Web/dina-collections/pull/59)
- Fredrik/add service modules [`#57`](https://github.com/DINA-Web/dina-collections/pull/57)
- Anton/create form scenario runner [`#55`](https://github.com/DINA-Web/dina-collections/pull/55)
- Add test:unit:fast to not run component tests [`#54`](https://github.com/DINA-Web/dina-collections/pull/54)
- Anton/backend next steps [`#53`](https://github.com/DINA-Web/dina-collections/pull/53)
- Add getExample to configSchema [`#52`](https://github.com/DINA-Web/dina-collections/pull/52)
- Anton/next step server [`#50`](https://github.com/DINA-Web/dina-collections/pull/50)
- Fredrik/minor fixes [`#48`](https://github.com/DINA-Web/dina-collections/pull/48)
- Fix nginx auth path [`#47`](https://github.com/DINA-Web/dina-collections/pull/47)
- Fix order storageApi models [`#46`](https://github.com/DINA-Web/dina-collections/pull/46)
- New api [`#27`](https://github.com/DINA-Web/dina-collections/pull/27)
- Anton/add tests for get where [`#45`](https://github.com/DINA-Web/dina-collections/pull/45)
- Fredrik/fix update specimen [`#44`](https://github.com/DINA-Web/dina-collections/pull/44)
- Adapt to specimenApi [`#43`](https://github.com/DINA-Web/dina-collections/pull/43)
- Anton/adapt api to new spec [`#42`](https://github.com/DINA-Web/dina-collections/pull/42)
- Anton/update api paths [`#41`](https://github.com/DINA-Web/dina-collections/pull/41)
- Fredrik/adapt frontend to new api [`#40`](https://github.com/DINA-Web/dina-collections/pull/40)
- Anton/improve example mock [`#39`](https://github.com/DINA-Web/dina-collections/pull/39)
- Anton/add automatic api tests from example [`#38`](https://github.com/DINA-Web/dina-collections/pull/38)
- Anton/next step connectors [`#37`](https://github.com/DINA-Web/dina-collections/pull/37)
- Fredrik/move dependor to common [`#36`](https://github.com/DINA-Web/dina-collections/pull/36)
- Create test in createIndividualGroup endpoint [`#30`](https://github.com/DINA-Web/dina-collections/pull/30)
- Fredrik/refactor to use common api client [`#33`](https://github.com/DINA-Web/dina-collections/pull/33)
- Fredrik/fix login bug [`#32`](https://github.com/DINA-Web/dina-collections/pull/32)
- Add some form component tests [`#31`](https://github.com/DINA-Web/dina-collections/pull/31)
- Fix command to start postgres docker [`#26`](https://github.com/DINA-Web/dina-collections/pull/26)
- Anton/improve api [`#29`](https://github.com/DINA-Web/dina-collections/pull/29)
- Anton/small fixes [`#25`](https://github.com/DINA-Web/dina-collections/pull/25)
- Fix wrong api travis tag [`#24`](https://github.com/DINA-Web/dina-collections/pull/24)
- Anton/flatten common repo [`#23`](https://github.com/DINA-Web/dina-collections/pull/23)
- Update outdated snapshot [`#22`](https://github.com/DINA-Web/dina-collections/pull/22)
- Anton/fix bug config ref [`#21`](https://github.com/DINA-Web/dina-collections/pull/21)
- Anton/flatten api structure [`#20`](https://github.com/DINA-Web/dina-collections/pull/20)
- Anton/rename packages [`#19`](https://github.com/DINA-Web/dina-collections/pull/19)
- Fix travis build references [`#16`](https://github.com/DINA-Web/dina-collections/pull/16)
- Large refactor [`#15`](https://github.com/DINA-Web/dina-collections/pull/15)
- Anton/fix mock not working [`#14`](https://github.com/DINA-Web/dina-collections/pull/14)
- Anton/minor deploy fixes [`#13`](https://github.com/DINA-Web/dina-collections/pull/13)
- Anton/fix deploy script update path [`#12`](https://github.com/DINA-Web/dina-collections/pull/12)
- Deploy everything when merging into master [`#11`](https://github.com/DINA-Web/dina-collections/pull/11)
- Second deploy [`#10`](https://github.com/DINA-Web/dina-collections/pull/10)
- Anton/fix minor bugs [`#9`](https://github.com/DINA-Web/dina-collections/pull/9)
- V1 monorepo [`#8`](https://github.com/DINA-Web/dina-collections/pull/8)
- Anton/move config folders [`#7`](https://github.com/DINA-Web/dina-collections/pull/7)
- Anton/wrap up docker [`#6`](https://github.com/DINA-Web/dina-collections/pull/6)
- Anton/move server to separate package [`#5`](https://github.com/DINA-Web/dina-collections/pull/5)
- Anton/add dina semantic ui [`#4`](https://github.com/DINA-Web/dina-collections/pull/4)
- Point docker to correct Dockerfile [`#2`](https://github.com/DINA-Web/dina-collections/pull/2)
- Anton/add dina collections ui [`#1`](https://github.com/DINA-Web/dina-collections/pull/1)
