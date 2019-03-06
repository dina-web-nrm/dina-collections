--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Debian 10.5-2.pgdg90+1)
-- Dumped by pg_dump version 10.5 (Debian 10.5-2.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.taxons DROP CONSTRAINT "taxons_parentId_fkey";
ALTER TABLE ONLY public."taxonNames" DROP CONSTRAINT "taxonNames_vernacularToTaxonId_fkey";
ALTER TABLE ONLY public."taxonNames" DROP CONSTRAINT "taxonNames_synonymToTaxonId_fkey";
ALTER TABLE ONLY public."taxonNames" DROP CONSTRAINT "taxonNames_acceptedToTaxonId_fkey";
ALTER TABLE ONLY public."storageLocations" DROP CONSTRAINT "storageLocations_parentId_fkey";
ALTER TABLE ONLY public.places DROP CONSTRAINT "places_parentId_fkey";
ALTER TABLE ONLY public."physicalObjects" DROP CONSTRAINT "physicalObjects_storageLocationId_fkey";
DROP INDEX public.resource_activities_user_id;
DROP INDEX public.resource_activities_resource_id;
DROP INDEX public.resource_activities_resource;
DROP INDEX public.idx_storagelocation_rel_taxa;
DROP INDEX public.idx_specimen_rel_taxa;
DROP INDEX public.idx_specimen_rel_places;
DROP INDEX public.idx_specimen_rel_physicalobjects;
DROP INDEX public.idx_specimen_rel_normalizedagents;
DROP INDEX public.catalog_numbers_identifier_year_number;
ALTER TABLE ONLY public."typeSpecimenTypes" DROP CONSTRAINT "typeSpecimenTypes_pkey";
ALTER TABLE ONLY public.taxons DROP CONSTRAINT taxons_pkey;
ALTER TABLE ONLY public."taxonNames" DROP CONSTRAINT "taxonNames_pkey";
ALTER TABLE ONLY public."storageLocations" DROP CONSTRAINT "storageLocations_pkey";
ALTER TABLE ONLY public.specimens DROP CONSTRAINT specimens_pkey;
ALTER TABLE ONLY public."resourceActivities" DROP CONSTRAINT "resourceActivities_pkey";
ALTER TABLE ONLY public."preparationTypes" DROP CONSTRAINT "preparationTypes_pkey";
ALTER TABLE ONLY public.places DROP CONSTRAINT places_pkey;
ALTER TABLE ONLY public."physicalObjects" DROP CONSTRAINT "physicalObjects_pkey";
ALTER TABLE ONLY public."normalizedAgents" DROP CONSTRAINT "normalizedAgents_pkey";
ALTER TABLE ONLY public.jobs DROP CONSTRAINT jobs_pkey;
ALTER TABLE ONLY public."identifierTypes" DROP CONSTRAINT "identifierTypes_pkey";
ALTER TABLE ONLY public."featureTypes" DROP CONSTRAINT "featureTypes_pkey";
ALTER TABLE ONLY public."exportJobs" DROP CONSTRAINT "exportJobs_pkey";
ALTER TABLE ONLY public."establishmentMeansTypes" DROP CONSTRAINT "establishmentMeansTypes_pkey";
ALTER TABLE ONLY public."dataModelMigrationLogs" DROP CONSTRAINT "dataModelMigrationLogs_pkey";
ALTER TABLE ONLY public."customTaxonNameTypes" DROP CONSTRAINT "customTaxonNameTypes_pkey";
ALTER TABLE ONLY public."causeOfDeathTypes" DROP CONSTRAINT "causeOfDeathTypes_pkey";
ALTER TABLE ONLY public."catalogNumbers" DROP CONSTRAINT "catalogNumbers_pkey";
ALTER TABLE ONLY public."catalogNumbers" DROP CONSTRAINT "catalogNumbers_identifier_key";
ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
ALTER TABLE public."typeSpecimenTypes" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.taxons ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."taxonNames" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."storageLocations" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.specimens ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."resourceActivities" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."preparationTypes" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.places ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."physicalObjects" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."normalizedAgents" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.jobs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."identifierTypes" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."featureTypes" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."exportJobs" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."establishmentMeansTypes" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."dataModelMigrationLogs" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."customTaxonNameTypes" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."causeOfDeathTypes" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."catalogNumbers" ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public."typeSpecimenTypes_id_seq";
DROP TABLE public."typeSpecimenTypes";
DROP SEQUENCE public.taxons_id_seq;
DROP TABLE public.taxons;
DROP SEQUENCE public."taxonNames_id_seq";
DROP TABLE public."taxonNames";
DROP SEQUENCE public."storageLocations_id_seq";
DROP TABLE public."storageLocations";
DROP SEQUENCE public.specimens_id_seq;
DROP TABLE public.specimens;
DROP SEQUENCE public."resourceActivities_id_seq";
DROP TABLE public."resourceActivities";
DROP SEQUENCE public."preparationTypes_id_seq";
DROP TABLE public."preparationTypes";
DROP SEQUENCE public.places_id_seq;
DROP TABLE public.places;
DROP SEQUENCE public."physicalObjects_id_seq";
DROP TABLE public."physicalObjects";
DROP SEQUENCE public."normalizedAgents_id_seq";
DROP TABLE public."normalizedAgents";
DROP SEQUENCE public.jobs_id_seq;
DROP TABLE public.jobs;
DROP SEQUENCE public."identifierTypes_id_seq";
DROP TABLE public."identifierTypes";
DROP SEQUENCE public."featureTypes_id_seq";
DROP TABLE public."featureTypes";
DROP SEQUENCE public."exportJobs_id_seq";
DROP TABLE public."exportJobs";
DROP SEQUENCE public."establishmentMeansTypes_id_seq";
DROP TABLE public."establishmentMeansTypes";
DROP SEQUENCE public."dataModelMigrationLogs_id_seq";
DROP TABLE public."dataModelMigrationLogs";
DROP SEQUENCE public."customTaxonNameTypes_id_seq";
DROP TABLE public."customTaxonNameTypes";
DROP SEQUENCE public."causeOfDeathTypes_id_seq";
DROP TABLE public."causeOfDeathTypes";
DROP SEQUENCE public."catalogNumbers_id_seq";
DROP TABLE public."catalogNumbers";
DROP TABLE public."SequelizeMeta";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: catalogNumbers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."catalogNumbers" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    id integer NOT NULL,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    identifier character varying(255),
    number integer,
    year integer
);


ALTER TABLE public."catalogNumbers" OWNER TO postgres;

--
-- Name: catalogNumbers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."catalogNumbers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."catalogNumbers_id_seq" OWNER TO postgres;

--
-- Name: catalogNumbers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."catalogNumbers_id_seq" OWNED BY public."catalogNumbers".id;


--
-- Name: causeOfDeathTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."causeOfDeathTypes" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."causeOfDeathTypes" OWNER TO postgres;

--
-- Name: causeOfDeathTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."causeOfDeathTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."causeOfDeathTypes_id_seq" OWNER TO postgres;

--
-- Name: causeOfDeathTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."causeOfDeathTypes_id_seq" OWNED BY public."causeOfDeathTypes".id;


--
-- Name: customTaxonNameTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."customTaxonNameTypes" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."customTaxonNameTypes" OWNER TO postgres;

--
-- Name: customTaxonNameTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."customTaxonNameTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."customTaxonNameTypes_id_seq" OWNER TO postgres;

--
-- Name: customTaxonNameTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."customTaxonNameTypes_id_seq" OWNED BY public."customTaxonNameTypes".id;


--
-- Name: dataModelMigrationLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."dataModelMigrationLogs" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    id integer NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    status character varying(255),
    "dataModelVersion" character varying(255)
);


ALTER TABLE public."dataModelMigrationLogs" OWNER TO postgres;

--
-- Name: dataModelMigrationLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."dataModelMigrationLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."dataModelMigrationLogs_id_seq" OWNER TO postgres;

--
-- Name: dataModelMigrationLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."dataModelMigrationLogs_id_seq" OWNED BY public."dataModelMigrationLogs".id;


--
-- Name: establishmentMeansTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."establishmentMeansTypes" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."establishmentMeansTypes" OWNER TO postgres;

--
-- Name: establishmentMeansTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."establishmentMeansTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."establishmentMeansTypes_id_seq" OWNER TO postgres;

--
-- Name: establishmentMeansTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."establishmentMeansTypes_id_seq" OWNED BY public."establishmentMeansTypes".id;


--
-- Name: exportJobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."exportJobs" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    error text,
    "exportFields" jsonb,
    "exportIds" jsonb,
    "failedAt" timestamp with time zone,
    "filePath" character varying(255),
    "requestId" character varying(255),
    resource character varying(255),
    "startedAt" timestamp with time zone,
    "succeededAt" timestamp with time zone,
    "userId" character varying(255)
);


ALTER TABLE public."exportJobs" OWNER TO postgres;

--
-- Name: exportJobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."exportJobs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."exportJobs_id_seq" OWNER TO postgres;

--
-- Name: exportJobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."exportJobs_id_seq" OWNED BY public."exportJobs".id;


--
-- Name: featureTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."featureTypes" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."featureTypes" OWNER TO postgres;

--
-- Name: featureTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."featureTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."featureTypes_id_seq" OWNER TO postgres;

--
-- Name: featureTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."featureTypes_id_seq" OWNED BY public."featureTypes".id;


--
-- Name: identifierTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."identifierTypes" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."identifierTypes" OWNER TO postgres;

--
-- Name: identifierTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."identifierTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."identifierTypes_id_seq" OWNER TO postgres;

--
-- Name: identifierTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."identifierTypes_id_seq" OWNED BY public."identifierTypes".id;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    "group" character varying(255),
    id integer NOT NULL,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    error text,
    "failedAt" timestamp with time zone,
    "operationId" character varying(255),
    "operationRequest" jsonb,
    priority integer DEFAULT 0,
    "startedAt" timestamp with time zone,
    "succeededAt" timestamp with time zone
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: normalizedAgents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."normalizedAgents" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."normalizedAgents" OWNER TO postgres;

--
-- Name: normalizedAgents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."normalizedAgents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."normalizedAgents_id_seq" OWNER TO postgres;

--
-- Name: normalizedAgents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."normalizedAgents_id_seq" OWNED BY public."normalizedAgents".id;


--
-- Name: physicalObjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."physicalObjects" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    "storageLocationId" integer
);


ALTER TABLE public."physicalObjects" OWNER TO postgres;

--
-- Name: physicalObjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."physicalObjects_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."physicalObjects_id_seq" OWNER TO postgres;

--
-- Name: physicalObjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."physicalObjects_id_seq" OWNED BY public."physicalObjects".id;


--
-- Name: places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.places (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    "parentId" integer
);


ALTER TABLE public.places OWNER TO postgres;

--
-- Name: places_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.places_id_seq OWNER TO postgres;

--
-- Name: places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.places_id_seq OWNED BY public.places.id;


--
-- Name: preparationTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."preparationTypes" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."preparationTypes" OWNER TO postgres;

--
-- Name: preparationTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."preparationTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."preparationTypes_id_seq" OWNER TO postgres;

--
-- Name: preparationTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."preparationTypes_id_seq" OWNED BY public."preparationTypes".id;


--
-- Name: resourceActivities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."resourceActivities" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    action character varying(255),
    "hasSourceData" boolean,
    "requestId" character varying(255),
    resource character varying(255),
    "resourceId" character varying(255),
    service character varying(255),
    snapshot jsonb,
    "sourceData" jsonb,
    "srcCreatedAt" timestamp with time zone,
    "srcDeactivatedAt" timestamp with time zone,
    "srcSchemaVersion" character varying(255),
    "srcUpdatedAt" timestamp with time zone,
    "userId" character varying(255),
    username character varying(255)
);


ALTER TABLE public."resourceActivities" OWNER TO postgres;

--
-- Name: resourceActivities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."resourceActivities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."resourceActivities_id_seq" OWNER TO postgres;

--
-- Name: resourceActivities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."resourceActivities_id_seq" OWNED BY public."resourceActivities".id;


--
-- Name: specimens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specimens (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.specimens OWNER TO postgres;

--
-- Name: specimens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specimens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.specimens_id_seq OWNER TO postgres;

--
-- Name: specimens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specimens_id_seq OWNED BY public.specimens.id;


--
-- Name: storageLocations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."storageLocations" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    "parentId" integer
);


ALTER TABLE public."storageLocations" OWNER TO postgres;

--
-- Name: storageLocations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."storageLocations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."storageLocations_id_seq" OWNER TO postgres;

--
-- Name: storageLocations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."storageLocations_id_seq" OWNED BY public."storageLocations".id;


--
-- Name: taxonNames; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."taxonNames" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    "acceptedToTaxonId" integer,
    "synonymToTaxonId" integer,
    "vernacularToTaxonId" integer
);


ALTER TABLE public."taxonNames" OWNER TO postgres;

--
-- Name: taxonNames_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."taxonNames_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."taxonNames_id_seq" OWNER TO postgres;

--
-- Name: taxonNames_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."taxonNames_id_seq" OWNED BY public."taxonNames".id;


--
-- Name: taxons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taxons (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL,
    "parentId" integer
);


ALTER TABLE public.taxons OWNER TO postgres;

--
-- Name: taxons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.taxons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.taxons_id_seq OWNER TO postgres;

--
-- Name: taxons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.taxons_id_seq OWNED BY public.taxons.id;


--
-- Name: typeSpecimenTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."typeSpecimenTypes" (
    "createdAt" timestamp with time zone,
    "deactivatedAt" timestamp with time zone,
    diff jsonb,
    document jsonb,
    id integer NOT NULL,
    relationships jsonb,
    "schemaCompliant" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."typeSpecimenTypes" OWNER TO postgres;

--
-- Name: typeSpecimenTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."typeSpecimenTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."typeSpecimenTypes_id_seq" OWNER TO postgres;

--
-- Name: typeSpecimenTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."typeSpecimenTypes_id_seq" OWNED BY public."typeSpecimenTypes".id;


--
-- Name: catalogNumbers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."catalogNumbers" ALTER COLUMN id SET DEFAULT nextval('public."catalogNumbers_id_seq"'::regclass);


--
-- Name: causeOfDeathTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."causeOfDeathTypes" ALTER COLUMN id SET DEFAULT nextval('public."causeOfDeathTypes_id_seq"'::regclass);


--
-- Name: customTaxonNameTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."customTaxonNameTypes" ALTER COLUMN id SET DEFAULT nextval('public."customTaxonNameTypes_id_seq"'::regclass);


--
-- Name: dataModelMigrationLogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."dataModelMigrationLogs" ALTER COLUMN id SET DEFAULT nextval('public."dataModelMigrationLogs_id_seq"'::regclass);


--
-- Name: establishmentMeansTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."establishmentMeansTypes" ALTER COLUMN id SET DEFAULT nextval('public."establishmentMeansTypes_id_seq"'::regclass);


--
-- Name: exportJobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."exportJobs" ALTER COLUMN id SET DEFAULT nextval('public."exportJobs_id_seq"'::regclass);


--
-- Name: featureTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."featureTypes" ALTER COLUMN id SET DEFAULT nextval('public."featureTypes_id_seq"'::regclass);


--
-- Name: identifierTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."identifierTypes" ALTER COLUMN id SET DEFAULT nextval('public."identifierTypes_id_seq"'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: normalizedAgents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."normalizedAgents" ALTER COLUMN id SET DEFAULT nextval('public."normalizedAgents_id_seq"'::regclass);


--
-- Name: physicalObjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."physicalObjects" ALTER COLUMN id SET DEFAULT nextval('public."physicalObjects_id_seq"'::regclass);


--
-- Name: places id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places ALTER COLUMN id SET DEFAULT nextval('public.places_id_seq'::regclass);


--
-- Name: preparationTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."preparationTypes" ALTER COLUMN id SET DEFAULT nextval('public."preparationTypes_id_seq"'::regclass);


--
-- Name: resourceActivities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resourceActivities" ALTER COLUMN id SET DEFAULT nextval('public."resourceActivities_id_seq"'::regclass);


--
-- Name: specimens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specimens ALTER COLUMN id SET DEFAULT nextval('public.specimens_id_seq'::regclass);


--
-- Name: storageLocations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."storageLocations" ALTER COLUMN id SET DEFAULT nextval('public."storageLocations_id_seq"'::regclass);


--
-- Name: taxonNames id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taxonNames" ALTER COLUMN id SET DEFAULT nextval('public."taxonNames_id_seq"'::regclass);


--
-- Name: taxons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taxons ALTER COLUMN id SET DEFAULT nextval('public.taxons_id_seq'::regclass);


--
-- Name: typeSpecimenTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."typeSpecimenTypes" ALTER COLUMN id SET DEFAULT nextval('public."typeSpecimenTypes_id_seq"'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20181026113649-create-initial-tables.js
20181026113650-set-initial-datamodel.js
20181026113651-add-index.js
20190118112413-datamodel-add-is-root.js
20190201112413-bump-data-model-0.2.1.js
20190215105400-bump-data-model-0.2.2.js
\.


--
-- Data for Name: catalogNumbers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."catalogNumbers" ("createdAt", "deactivatedAt", diff, id, "schemaCompliant", "updatedAt", identifier, number, year) FROM stdin;
2019-03-06 16:16:34.062+00	\N	\N	1	\N	2019-03-06 16:16:34.062+00	985729	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	2	\N	2019-03-06 16:16:34.062+00	985093	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	3	\N	2019-03-06 16:16:34.062+00	956051	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	4	\N	2019-03-06 16:16:34.062+00	825005	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	5	\N	2019-03-06 16:16:34.062+00	805176	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	6	\N	2019-03-06 16:16:34.062+00	630096	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	7	\N	2019-03-06 16:16:34.062+00	628009	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	8	\N	2019-03-06 16:16:34.062+00	621445	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	9	\N	2019-03-06 16:16:34.062+00	620285	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	10	\N	2019-03-06 16:16:34.062+00	590325	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	11	\N	2019-03-06 16:16:34.062+00	587520	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	12	\N	2019-03-06 16:16:34.062+00	585522	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	13	\N	2019-03-06 16:16:34.062+00	583124	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	14	\N	2019-03-06 16:16:34.062+00	534406	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	15	\N	2019-03-06 16:16:34.062+00	530183	\N	\N
2019-03-06 16:16:34.062+00	\N	\N	16	\N	2019-03-06 16:16:34.062+00	500001	\N	\N
\.


--
-- Data for Name: causeOfDeathTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."causeOfDeathTypes" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:32.637+00	\N	\N	{"key": "put-to-death", "name": {"en": "put to death", "sv": "avlivad"}}	1	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "bycatch", "name": {"en": "bycatch", "sv": "bifångst"}}	2	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "construction", "name": {"en": "construction", "sv": "byggnation"}}	3	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "killed-by-other-animal", "name": {"en": "killed by other animal", "sv": "dödad av annat djur"}}	4	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "found-shot", "name": {"en": "found shot", "sv": "funnen skjuten"}}	5	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "collected", "name": {"en": "collected", "sv": "insamlad"}}	6	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "hunt-trap", "name": {"en": "hunt, trap", "sv": "jakt, fälla"}}	7	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "hunt-shot", "name": {"en": "hunt, shot", "sv": "jakt, skjuten"}}	8	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "disease", "name": {"en": "disease", "sv": "sjukdom"}}	9	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "traffic", "name": {"en": "traffic", "sv": "trafik"}}	10	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "other", "name": {"en": "other", "sv": "annan"}}	11	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "unknown", "name": {"en": "unknown", "sv": "okänd"}}	12	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "dead-in-captivity", "name": {"en": "dead in captivity", "sv": "död i fångenskap"}}	13	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "fossil", "name": {"en": "fossil", "sv": "fossil"}}	14	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "subfossil", "name": {"en": "subfossil", "sv": "subfossil"}}	15	\N	t	2019-03-06 16:16:32.637+00
2019-03-06 16:16:32.637+00	\N	\N	{"key": "found-dead", "name": {"en": "found dead", "sv": "funnen död"}}	16	\N	t	2019-03-06 16:16:32.637+00
\.


--
-- Data for Name: customTaxonNameTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."customTaxonNameTypes" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:32.672+00	\N	\N	{"key": "label-name", "name": {"en": "label name"}}	1	\N	t	2019-03-06 16:16:32.672+00
2019-03-06 16:16:32.672+00	\N	\N	{"key": "old-local-name", "name": {"en": "old local name"}}	2	\N	t	2019-03-06 16:16:32.672+00
2019-03-06 16:16:32.672+00	\N	\N	{"key": "old-scientific-name", "name": {"en": "old scientific name"}}	3	\N	t	2019-03-06 16:16:32.672+00
\.


--
-- Data for Name: dataModelMigrationLogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."dataModelMigrationLogs" ("createdAt", "deactivatedAt", id, "updatedAt", status, "dataModelVersion") FROM stdin;
2019-03-06 16:16:30.002+00	\N	1	2019-03-06 16:16:30.002+00	success	0.1.0
2019-03-06 16:16:30.252+00	\N	2	2019-03-06 16:16:30.252+00	success	0.2.0
2019-03-06 16:16:30.414+00	\N	3	2019-03-06 16:16:30.414+00	success	0.2.1
2019-03-06 16:16:30.609+00	\N	4	2019-03-06 16:16:30.609+00	success	0.2.2
\.


--
-- Data for Name: establishmentMeansTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."establishmentMeansTypes" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:32.693+00	\N	\N	{"key": "wild-and-native", "name": {"en": "wild and native", "sv": "vild och inhemsk"}}	1	\N	t	2019-03-06 16:16:32.693+00
2019-03-06 16:16:32.693+00	\N	\N	{"key": "wild-and-introduced", "name": {"en": "wild and introduced", "sv": "vild och introducerad"}}	2	\N	t	2019-03-06 16:16:32.693+00
2019-03-06 16:16:32.693+00	\N	\N	{"key": "captive", "name": {"en": "captive", "sv": "i fångenskap"}}	3	\N	t	2019-03-06 16:16:32.693+00
2019-03-06 16:16:32.693+00	\N	\N	{"key": "unknown", "name": {"en": "unknown", "sv": "osäker"}}	4	\N	t	2019-03-06 16:16:32.693+00
\.


--
-- Data for Name: exportJobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."exportJobs" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt", error, "exportFields", "exportIds", "failedAt", "filePath", "requestId", resource, "startedAt", "succeededAt", "userId") FROM stdin;
\.


--
-- Data for Name: featureTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."featureTypes" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:32.718+00	\N	\N	{"key": "age-stage", "group": "age-stage", "selectableValues": [{"key": "adult", "name": {"en": "adult", "sv": "adult"}}, {"key": "adult?", "name": {"en": "adult?", "sv": "adult?"}}, {"key": "subadult", "name": {"en": "subadult", "sv": "subadult"}}, {"key": "subadult?", "name": {"en": "subadult?", "sv": "subadult?"}}, {"key": "juvenile", "name": {"en": "juvenile", "sv": "juvenil"}}, {"key": "juvenile?", "name": {"en": "juvenile?", "sv": "juvenil?"}}, {"key": "immature", "name": {"en": "immature", "sv": "immatur"}}, {"key": "embryo", "name": {"en": "embryo", "sv": "embryo"}}, {"key": "fetus", "name": {"en": "fetus", "sv": "featus"}}, {"key": "unknown", "name": {"en": "unknown", "sv": "okänd"}}], "selectableMethods": [{"key": "dentition-status", "name": {"en": "dentition status", "sv": "tandstatus"}}, {"key": "bone-age", "name": {"en": "bone age", "sv": "skelettålder"}}, {"key": "other", "name": {"en": "other", "sv": "annan"}}]}	1	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "age", "group": "age-and-stage", "selectableMethods": [{"key": "known-age", "name": {"en": "known age", "sv": "känd ålder"}}, {"key": "sectioned-teeth", "name": {"en": "sectioned teeth", "sv": "tandsnittning"}}, {"key": "other", "name": {"en": "other", "sv": "annan"}}]}	2	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "carcass-condition", "group": "carcass-condition", "selectableValues": [{"key": "fresh", "name": {"en": "fresh", "sv": "färsk"}}, {"key": "hairless", "name": {"en": "hairless", "sv": "hår släpper"}}, {"key": "slightly-cadaverous", "name": {"en": "slightly cadaverous", "sv": "lätt kadaverös"}}, {"key": "cadaverous", "name": {"en": "cadaverous", "sv": "kadaverös"}}, {"key": "dried", "name": {"en": "dried", "sv": "intorkad"}}, {"key": "skeletal", "name": {"en": "skeletal", "sv": "skeletterad"}}, {"key": "unknown", "name": {"en": "unknown", "sv": "okänd"}}]}	3	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "cranium-count", "name": {"en": "cranium", "sv": "kranium"}, "group": "bone-count"}	4	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "mandibula-count", "name": {"en": "mandibula", "sv": "mandibula"}, "group": "bone-count"}	5	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "vertebrae-count", "name": {"en": "vertebrae", "sv": "vertebrae"}, "group": "bone-count"}	6	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "costae-count", "name": {"en": "costae", "sv": "costae"}, "group": "bone-count"}	7	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "scapula-count", "name": {"en": "scapula", "sv": "scapula"}, "group": "bone-count"}	8	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "humerus-count", "name": {"en": "humerus", "sv": "humerus"}, "group": "bone-count"}	9	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "ulna-count", "name": {"en": "ulna", "sv": "ulna"}, "group": "bone-count"}	10	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "radius-count", "name": {"en": "radius", "sv": "radius"}, "group": "bone-count"}	11	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "manus-count", "name": {"en": "manus", "sv": "manus"}, "group": "bone-count"}	12	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "pelvis-count", "name": {"en": "pelvis", "sv": "pelvis"}, "group": "bone-count"}	13	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "femur-count", "name": {"en": "femur", "sv": "femur"}, "group": "bone-count"}	14	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "tibia-count", "name": {"en": "tibia", "sv": "tibia"}, "group": "bone-count"}	15	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "pedis-count", "name": {"en": "pedis", "sv": "pedis"}, "group": "bone-count"}	16	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "bacculum-count", "name": {"en": "bacculum", "sv": "bacculum"}, "group": "bone-count"}	17	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "total-length", "name": {"en": "total", "sv": "total"}, "group": "length", "selectableUnits": [{"key": "mm", "name": {"en": "mm", "sv": "mm"}}, {"key": "cm", "name": {"en": "cm", "sv": "cm"}}, {"key": "m", "name": {"en": "m", "sv": "m"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	18	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "body-length", "name": {"en": "body", "sv": "kropp"}, "group": "length", "selectableUnits": [{"key": "mm", "name": {"en": "mm", "sv": "mm"}}, {"key": "cm", "name": {"en": "cm", "sv": "cm"}}, {"key": "m", "name": {"en": "m", "sv": "m"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	19	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "tail-to-anus-length", "name": {"en": "tail–anus", "sv": "stjärt–anus"}, "group": "length", "selectableUnits": [{"key": "mm", "name": {"en": "mm", "sv": "mm"}}, {"key": "cm", "name": {"en": "cm", "sv": "cm"}}, {"key": "m", "name": {"en": "m", "sv": "m"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	20	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "tail-to-pelvis-length", "name": {"en": "tail–pelvis", "sv": "stjärt–pelvis"}, "group": "length", "selectableUnits": [{"key": "mm", "name": {"en": "mm", "sv": "mm"}}, {"key": "cm", "name": {"en": "cm", "sv": "cm"}}, {"key": "m", "name": {"en": "m", "sv": "m"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	21	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "ear-length", "name": {"en": "ear", "sv": "öra"}, "group": "length", "selectableUnits": [{"key": "mm", "name": {"en": "mm", "sv": "mm"}}, {"key": "cm", "name": {"en": "cm", "sv": "cm"}}, {"key": "m", "name": {"en": "m", "sv": "m"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	22	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "hind-foot-length", "name": {"en": "hind foot", "sv": "bakfot"}, "group": "length", "selectableUnits": [{"key": "mm", "name": {"en": "mm", "sv": "mm"}}, {"key": "cm", "name": {"en": "cm", "sv": "cm"}}, {"key": "m", "name": {"en": "m", "sv": "m"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	23	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "forearm-length", "name": {"en": "forearm", "sv": "underarm"}, "group": "length", "selectableUnits": [{"key": "mm", "name": {"en": "mm", "sv": "mm"}}, {"key": "cm", "name": {"en": "cm", "sv": "cm"}}, {"key": "m", "name": {"en": "m", "sv": "m"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	24	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "sex", "group": "sex", "selectableValues": [{"key": "female", "name": {"en": "female", "sv": "hona"}}, {"key": "female?", "name": {"en": "female?", "sv": "hona?"}}, {"key": "male", "name": {"en": "male", "sv": "hane"}}, {"key": "male?", "name": {"en": "male?", "sv": "hane?"}}, {"key": "hermaphrodite", "name": {"en": "hermaphrodite", "sv": "hermafrodit"}}, {"key": "indeterminate", "name": {"en": "indeterminate", "sv": "obestämbar"}}, {"key": "castrated", "name": {"en": "castrated", "sv": "kastrerad"}}, {"key": "transitional", "name": {"en": "transitional", "sv": "transitional"}}, {"key": "unknown", "name": {"en": "unknown", "sv": "okänd"}}]}	25	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "complete-body-weight", "name": {"en": "complete", "sv": "total"}, "group": "weight", "selectableUnits": [{"key": "kg", "name": {"en": "kg", "sv": "kg"}}, {"key": "g", "name": {"en": "g", "sv": "g"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	26	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "skinned-weight", "name": {"en": "skinned", "sv": "flådd"}, "group": "weight", "selectableUnits": [{"key": "kg", "name": {"en": "kg", "sv": "kg"}}, {"key": "g", "name": {"en": "g", "sv": "g"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	27	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "gutted-weight", "name": {"en": "gutted", "sv": "passad"}, "group": "weight", "selectableUnits": [{"key": "kg", "name": {"en": "kg", "sv": "kg"}}, {"key": "g", "name": {"en": "g", "sv": "g"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	28	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "slaughtered-weight", "name": {"en": "slaughtered", "sv": "slakt"}, "group": "weight", "selectableUnits": [{"key": "kg", "name": {"en": "kg", "sv": "kg"}}, {"key": "g", "name": {"en": "g", "sv": "g"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	29	\N	t	2019-03-06 16:16:32.718+00
2019-03-06 16:16:32.718+00	\N	\N	{"key": "unknown-weight-type", "name": {"en": "unknown", "sv": "viktslag okänt"}, "group": "weight", "selectableUnits": [{"key": "kg", "name": {"en": "kg", "sv": "kg"}}, {"key": "g", "name": {"en": "g", "sv": "g"}}, {"key": "unspecified", "name": {"en": "unspecified", "sv": "ospecificerad"}}]}	30	\N	t	2019-03-06 16:16:32.718+00
\.


--
-- Data for Name: identifierTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."identifierTypes" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:32.744+00	\N	\N	{"key": "catalog-no", "name": "catalog no."}	1	\N	t	2019-03-06 16:16:32.744+00
2019-03-06 16:16:32.744+00	\N	\N	{"key": "old-skeleton-no", "name": "old skeleton no."}	2	\N	t	2019-03-06 16:16:32.744+00
2019-03-06 16:16:32.744+00	\N	\N	{"key": "old-skin-no", "name": "old skin no."}	3	\N	t	2019-03-06 16:16:32.744+00
2019-03-06 16:16:32.744+00	\N	\N	{"key": "other-institution-no", "name": "other institution no."}	4	\N	t	2019-03-06 16:16:32.744+00
2019-03-06 16:16:32.744+00	\N	\N	{"key": "sva-no", "name": "SVA no."}	5	\N	t	2019-03-06 16:16:32.744+00
2019-03-06 16:16:32.744+00	\N	\N	{"key": "loan-no", "name": "loan no."}	6	\N	t	2019-03-06 16:16:32.744+00
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs ("createdAt", "deactivatedAt", diff, "group", id, "schemaCompliant", "updatedAt", error, "failedAt", "operationId", "operationRequest", priority, "startedAt", "succeededAt") FROM stdin;
\.


--
-- Data for Name: normalizedAgents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."normalizedAgents" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [{"name": "curator", "dateRange": {"endDate": {"year": 2016, "interpretedTimestamp": "2016-12-31T22:59:59.999Z"}, "dateType": "openRange", "startDate": {"year": 1998, "interpretedTimestamp": "1997-12-31T23:00:00.000Z"}}}], "remarks": "Record imported from Mam2006 (MS Access database), table \\"LU_Signature\\"", "fullName": "John Doe", "agentType": "person", "givenName": "John", "familyName": "Doe", "abbreviation": "JDO"}	1	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Pehr Osbeck", "agentType": "person", "givenName": "Pehr", "familyName": "Osbeck"}	2	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Peter Forsskål", "agentType": "person", "givenName": "Peter", "familyName": "Forsskål"}	3	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Pehr Löfling", "agentType": "person", "givenName": "Pehr", "familyName": "Löfling"}	4	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Pehr Kalm", "agentType": "person", "givenName": "Pehr", "familyName": "Kalm"}	5	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Daniel Rolander", "agentType": "person", "givenName": "Daniel", "familyName": "Rolander"}	6	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Johan Peter Falck", "agentType": "person", "givenName": "Johan Peter", "familyName": "Falck"}	7	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Daniel Solander", "agentType": "person", "givenName": "Daniel", "familyName": "Solander"}	8	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Carl Peter Thunberg", "agentType": "person", "givenName": "Carl Peter", "familyName": "Thunberg"}	9	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Anders Sparrman", "agentType": "person", "givenName": "Anders", "familyName": "Sparrman"}	10	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Apostle of Linnaeus.\\n\\nRecord imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "Jonas Peter Bergius", "agentType": "person", "givenName": "Peter Jonas", "familyName": "Bergius"}	11	\N	t	2019-03-06 16:16:33.277+00
2019-03-06 16:16:33.277+00	\N	\N	{"roles": [], "remarks": "Record imported from Mam2006 (MS Access database), table \\"LU_Names\\".", "fullName": "John Doe", "agentType": "person", "givenName": "John", "familyName": "Doe", "abbreviation": "JDO", "disambiguatingDescription": "duplicate 1"}	12	\N	t	2019-03-06 16:16:33.277+00
\.


--
-- Data for Name: physicalObjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."physicalObjects" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt", "storageLocationId") FROM stdin;
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "7c17a51d-4270-4f4a-a094-6eff774b91d7"}	1	\N	t	2019-03-06 16:16:33.778+00	27
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "084fcb4f-40b1-4354-a2d0-fc0d24872e18"}	2	\N	t	2019-03-06 16:16:33.778+00	21
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "8bc9d3aa-3dd2-49c6-8212-5de1896cb92d"}	3	\N	t	2019-03-06 16:16:33.778+00	11
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "8d7fdd53-6959-484c-b0f9-5345ecd37c3b"}	4	\N	t	2019-03-06 16:16:33.778+00	11
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "42d754cd-474d-443e-b6bc-9b079a052c85"}	5	\N	t	2019-03-06 16:16:33.778+00	6
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "6e8b376b-8a3a-4d60-81ba-67e744c0011b"}	6	\N	t	2019-03-06 16:16:33.778+00	17
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "165bfe47-6a97-47eb-93a3-9a82701a0662"}	7	\N	t	2019-03-06 16:16:33.778+00	7
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "19f6b3a6-f844-4056-86ea-e9b38d33c1cf"}	8	\N	t	2019-03-06 16:16:33.778+00	26
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "6e856b0f-99fb-4e93-9c46-1727728a6939", "remarks": "Urogenitalsystem i sprit, se kommentar"}	9	\N	t	2019-03-06 16:16:33.778+00	12
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "f34c2d14-bd3a-4d6d-b3cf-084f1526bdca"}	10	\N	t	2019-03-06 16:16:33.778+00	23
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "da061a14-e348-4850-abb5-f1e3472b96e4"}	11	\N	t	2019-03-06 16:16:33.778+00	4
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "ad0b61fc-c9e6-4bac-998c-471cde0d874c"}	12	\N	t	2019-03-06 16:16:33.778+00	25
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "28ff4fe9-8781-42bb-95b3-95a14ed60727"}	13	\N	t	2019-03-06 16:16:33.778+00	5
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "776e49a3-af35-407c-a59b-a061827d7a5c", "remarks": "Skin missing but should be here"}	14	\N	t	2019-03-06 16:16:33.778+00	18
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "eec94365-4bba-497f-ad01-16962109667d"}	15	\N	t	2019-03-06 16:16:33.778+00	14
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "6f5a2354-ae42-42ff-a6c0-79acbc1a81a2"}	16	\N	t	2019-03-06 16:16:33.778+00	28
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "e23b1ae7-68bd-4793-a02f-9f8bd564b81b"}	17	\N	t	2019-03-06 16:16:33.778+00	20
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "220eea66-f050-4176-9188-51c3025bedf1"}	18	\N	t	2019-03-06 16:16:33.778+00	20
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "67a84488-0dc6-49e9-958d-38cbe2a13bd7"}	19	\N	t	2019-03-06 16:16:33.778+00	8
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "0f73cf3f-7e11-4653-b1db-728e67d4492a"}	20	\N	t	2019-03-06 16:16:33.778+00	16
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "7fe19763-c486-4e29-b7c5-9ddd7122d60f", "remarks": "MGG-sample"}	21	\N	t	2019-03-06 16:16:33.778+00	13
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "f0e88cd2-1cb8-4e4d-8708-74b0ec52bfbc"}	22	\N	t	2019-03-06 16:16:33.778+00	7
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "373c0bbb-0f2f-4ecd-b0c7-7af35dfda27f", "remarks": "Skin at another institution"}	23	\N	t	2019-03-06 16:16:33.778+00	2
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "6bd4d262-1ef5-4598-a16c-d406645078b9", "remarks": "MGG-sample"}	24	\N	t	2019-03-06 16:16:33.778+00	12
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "79547a5d-d0d4-47c3-b179-627bf6deee92"}	25	\N	t	2019-03-06 16:16:33.778+00	9
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "6cb9d6ca-5baf-4768-be7e-a6f4e89d2eb6"}	26	\N	t	2019-03-06 16:16:33.778+00	8
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "8ae89103-2e54-4ebe-9f81-e31c48c35cee", "remarks": "Biocidprover"}	27	\N	t	2019-03-06 16:16:33.778+00	13
2019-03-06 16:16:33.778+00	\N	\N	{"lid": "b446d1dd-7a7b-4394-a2bb-666e030b4c8b"}	28	\N	t	2019-03-06 16:16:33.778+00	7
\.


--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.places ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt", "parentId") FROM stdin;
2019-03-06 16:16:32.823+00	\N	\N	{"name": "The Earth", "group": "planet", "isRoot": true}	1	\N	t	2019-03-06 16:16:32.823+00	\N
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Africa", "group": "continent-ocean"}	2	\N	t	2019-03-06 16:16:32.823+00	1
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Congo, The Democratic Republic of the", "group": "country"}	3	\N	t	2019-03-06 16:16:32.823+00	2
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Rutshuru", "group": "province"}	4	\N	t	2019-03-06 16:16:32.823+00	3
2019-03-06 16:16:32.823+00	\N	\N	{"name": "South africa", "group": "country"}	5	\N	t	2019-03-06 16:16:32.823+00	2
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Europe", "group": "continent-ocean"}	6	\N	t	2019-03-06 16:16:32.823+00	1
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Germany", "group": "country"}	7	\N	t	2019-03-06 16:16:32.823+00	6
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Baden-Württemberg", "group": "province"}	8	\N	t	2019-03-06 16:16:32.823+00	7
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Sweden", "group": "country"}	9	\N	t	2019-03-06 16:16:32.823+00	6
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Gotland", "group": "province"}	10	\N	t	2019-03-06 16:16:32.823+00	9
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Jämtland", "group": "province"}	11	\N	t	2019-03-06 16:16:32.823+00	9
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Lule Lappmark", "group": "province"}	12	\N	t	2019-03-06 16:16:32.823+00	9
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Lycksele Lappmark", "group": "province"}	13	\N	t	2019-03-06 16:16:32.823+00	9
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Pite Lappmark", "group": "province"}	14	\N	t	2019-03-06 16:16:32.823+00	9
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Arjeplog", "group": "district"}	15	\N	t	2019-03-06 16:16:32.823+00	14
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Uppland", "group": "province"}	16	\N	t	2019-03-06 16:16:32.823+00	9
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Ångermanland", "group": "province"}	17	\N	t	2019-03-06 16:16:32.823+00	9
2019-03-06 16:16:32.823+00	\N	\N	{"name": "No information", "group": "continent-ocean"}	18	\N	t	2019-03-06 16:16:32.823+00	1
2019-03-06 16:16:32.823+00	\N	\N	{"name": "No information", "group": "country"}	19	\N	t	2019-03-06 16:16:32.823+00	18
2019-03-06 16:16:32.823+00	\N	\N	{"name": "South America", "group": "continent-ocean"}	20	\N	t	2019-03-06 16:16:32.823+00	1
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Bolivia", "group": "country"}	21	\N	t	2019-03-06 16:16:32.823+00	20
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Beni", "group": "province"}	22	\N	t	2019-03-06 16:16:32.823+00	21
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Yacuma", "group": "district"}	23	\N	t	2019-03-06 16:16:32.823+00	22
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Ecuador", "group": "country"}	24	\N	t	2019-03-06 16:16:32.823+00	20
2019-03-06 16:16:32.823+00	\N	\N	{"name": "Pichincha", "group": "province"}	25	\N	t	2019-03-06 16:16:32.823+00	24
\.


--
-- Data for Name: preparationTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."preparationTypes" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:32.764+00	\N	\N	{"key": "complete-disarticulated-skeleton", "name": {"en": "complete, disarticulated skeleton", "sv": "komplett, omonterat skelett"}, "category": "skeleton"}	1	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "complete-mounted-skeleton", "name": {"en": "complete, mounted skeleton", "sv": "komplett, monterat skelett"}, "category": "skeleton"}	2	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "partial-skeleton-without-skull", "name": {"en": "partial skeleton without skull", "sv": "partiellt skelett utan skalle"}, "category": "skeleton"}	3	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "partial-skeleton-with-skull", "name": {"en": "partial skeleton with skull", "sv": "partiellt skelett med skalle"}, "category": "skeleton"}	4	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "skull", "name": {"en": "skull (with or without mandible)", "sv": "skalle (med eller utan käkben)"}, "category": "skeleton"}	5	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "some-bones", "name": {"en": "some bones, < 30%", "sv": "enstaka ben, < 30 %"}, "category": "skeleton"}	6	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "cast", "name": {"en": "cast", "sv": "avgjutning"}, "category": "skeleton"}	7	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "antler-or-horn", "name": {"en": "antler or horn", "sv": "horn (inkl. hjorthorn)"}, "category": "skeleton"}	8	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "bones-from-several-individuals", "name": {"en": "bones from several individuals", "sv": "ben från flera individer"}, "category": "skeleton"}	9	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "animal-product", "name": {"en": "animal product", "sv": "animalisk produkt"}, "category": "skeleton"}	10	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "unspecified-skeleton", "name": {"en": "unspecified skeleton", "sv": "ospecificerat skelett"}, "category": "skeleton"}	11	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "complete-study-skin", "name": {"en": "complete study skin", "sv": "helt skinn, skinnlagt"}, "category": "skin"}	12	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "complete-mounted-skin", "name": {"en": "complete, mounted skin", "sv": "helt skinn, monterat"}, "category": "skin"}	13	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "partial-skin-large", "name": {"en": "partial skin, 30-90%", "sv": "partiellt skinn, 30–90 %"}, "category": "skin"}	14	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "hair-or-scales", "name": {"en": "hair or scales", "sv": "hår eller fjäll"}, "category": "skin"}	15	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "skin-from-head", "name": {"en": "skin from head", "sv": "skinn från huvud"}, "category": "skin"}	16	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "partial-skin-small", "name": {"en": "partial skin, < 30%", "sv": "partiellt skinn, < 30 %"}, "category": "skin"}	17	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "unspecified-skin", "name": {"en": "unspecified skin", "sv": "ospecificerat skinn"}, "category": "skin"}	18	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "entire-specimen-in-alcohol", "name": {"en": "entire specimen in alcohol", "sv": "helt djur i sprit"}, "category": "wet-preparation"}	19	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "skeleton-in-alcohol", "name": {"en": "skeleton in alcohol", "sv": "skelett i sprit"}, "category": "wet-preparation"}	20	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "skin-in-alcohol", "name": {"en": "skin in alcohol", "sv": "skinn i sprit"}, "category": "wet-preparation"}	21	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "unspecified-wet-preparation", "name": {"en": "unspecified wet preparation", "sv": "ospecificerad våtpreparation"}, "category": "wet-preparation"}	22	\N	t	2019-03-06 16:16:32.764+00
2019-03-06 16:16:32.764+00	\N	\N	{"key": "unspecified-other-preparation", "name": {"en": "unspecified other preparation", "sv": "ospecificerad annan preparation"}, "category": "other-preparation"}	23	\N	t	2019-03-06 16:16:32.764+00
\.


--
-- Data for Name: resourceActivities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."resourceActivities" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt", action, "hasSourceData", "requestId", resource, "resourceId", service, snapshot, "sourceData", "srcCreatedAt", "srcDeactivatedAt", "srcSchemaVersion", "srcUpdatedAt", "userId", username) FROM stdin;
2019-03-06 16:16:32.878+00	\N	\N	\N	1	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	1	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	2	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	2	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	3	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	3	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	4	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	4	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	5	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	5	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	6	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	6	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	7	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	7	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	8	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	8	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	9	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	9	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	10	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	10	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	11	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	11	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	12	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	12	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	13	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	13	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	14	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	14	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	15	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	15	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	16	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	16	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	17	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	17	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	18	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	18	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	19	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	19	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	20	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	20	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	21	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	21	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	22	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	22	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	23	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	23	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	24	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	24	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:32.878+00	\N	\N	\N	25	\N	\N	2019-03-06 16:16:32.878+00	create	\N	\N	place	25	\N	\N	\N	2019-03-06 16:16:32.823+00	\N	\N	2019-03-06 16:16:32.823+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	26	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	1	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	27	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	2	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	28	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	3	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	29	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	4	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	30	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	5	\N	\N	{"ID": "672", "GENUS": "Capreolus", "ORDER": "Artiodactyla", "FAMILY": "Cervidae", "RUBINNo": "7803903", "SPECIES": "capreolus", "LATIN_NAME": "Capreolus capreolus", "SUBSPECIES": null, "ENGLISH_NAME": "Western Roe Deer", "SWEDISH_NAME": null}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	31	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	6	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	32	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	7	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	33	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	8	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	34	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	9	\N	\N	{"ID": "489", "GENUS": "Lynx", "ORDER": "Carnivora", "FAMILY": "Felidae", "RUBINNo": "5520606", "SPECIES": "lynx", "LATIN_NAME": "Lynx lynx", "SUBSPECIES": null, "ENGLISH_NAME": "Eurasian Lynx", "SWEDISH_NAME": null}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	35	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	10	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	36	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	11	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	37	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	12	\N	\N	{"ID": "371", "GENUS": "Gulo", "ORDER": "Carnivora", "FAMILY": "Mustelidae", "RUBINNo": "5203003", "SPECIES": "gulo", "LATIN_NAME": "Gulo gulo", "SUBSPECIES": null, "ENGLISH_NAME": "Wolverine", "SWEDISH_NAME": "Järv"}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	38	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	13	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	39	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	14	\N	\N	{"ID": "346", "GENUS": "Mustela", "ORDER": "Carnivora", "FAMILY": "Mustelidae", "RUBINNo": "5200312", "SPECIES": "erminea", "LATIN_NAME": "Mustela erminea", "SUBSPECIES": null, "ENGLISH_NAME": "Ermine", "SWEDISH_NAME": "Hermelin"}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	40	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	15	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	41	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	16	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	42	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	17	\N	\N	{"ID": "1684", "GENUS": "Pusa", "ORDER": "Carnivora", "FAMILY": "Phocidae", "RUBINNo": "5700503", "SPECIES": "hispida", "LATIN_NAME": "Pusa hispida", "SUBSPECIES": null, "ENGLISH_NAME": "Ringed Seal", "SWEDISH_NAME": "Vikare"}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	43	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	18	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	44	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	19	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	45	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	20	\N	\N	{"ID": "313", "GENUS": "Ursus", "ORDER": "Carnivora", "FAMILY": "Ursidae", "RUBINNo": "5100906", "SPECIES": "arctos", "LATIN_NAME": "Ursus arctos", "SUBSPECIES": null, "ENGLISH_NAME": "Brown Bear", "SWEDISH_NAME": "Brunbjörn"}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	46	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	21	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	47	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	22	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	48	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	23	\N	\N	{"ID": "1191", "GENUS": "Anoura", "ORDER": "Chiroptera", "FAMILY": "Phyllostomidae", "RUBINNo": "3631800", "SPECIES": "sp.", "LATIN_NAME": "Anoura sp.", "SUBSPECIES": null, "ENGLISH_NAME": "Tailless Bat sp.", "SWEDISH_NAME": null}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	49	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	24	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	50	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	25	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	51	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	26	\N	\N	{"ID": "59", "GENUS": "Myotis", "ORDER": "Chiroptera", "FAMILY": "Vespertilionidae", "RUBINNo": "3810444", "SPECIES": "mystacinus", "LATIN_NAME": "Myotis mystacinus", "SUBSPECIES": null, "ENGLISH_NAME": "Whiskered Bat", "SWEDISH_NAME": "Mustaschfladdermus"}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	52	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	27	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	53	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	28	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	54	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	29	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	55	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	30	\N	\N	{"ID": "159", "GENUS": "Alouatta", "ORDER": "Primates", "FAMILY": "Atelidae", "RUBINNo": "4352406", "SPECIES": "caraya", "LATIN_NAME": "Alouatta caraya", "SUBSPECIES": null, "ENGLISH_NAME": "Black Howler", "SWEDISH_NAME": null}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	56	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	31	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	57	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	32	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	58	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	33	\N	\N	{"ID": "1791", "GENUS": "Gorilla", "ORDER": "Primates", "FAMILY": "Hominidae", "RUBINNo": "4500906", "SPECIES": "beringei", "LATIN_NAME": "Gorilla beringei", "SUBSPECIES": null, "ENGLISH_NAME": "Eastern Gorilla", "SWEDISH_NAME": null}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	59	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	34	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	60	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	35	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	61	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	36	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	122	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	58	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	62	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	37	\N	\N	{"ID": "1914", "GENUS": "Mus", "ORDER": "Rodentia", "FAMILY": "Muridae", "RUBINNo": "9472969", "SPECIES": "musculoides", "LATIN_NAME": "Mus musculoides", "SUBSPECIES": null, "ENGLISH_NAME": "Subsaharan Pygmy Mouse", "SWEDISH_NAME": null}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	63	\N	\N	2019-03-06 16:16:33.001+00	create	\N	\N	taxon	38	\N	\N	\N	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.001+00	\N	\N	\N	64	\N	\N	2019-03-06 16:16:33.001+00	create	t	\N	taxon	39	\N	\N	{"ID": "1354", "GENUS": "Rhabdomys", "ORDER": "Rodentia", "FAMILY": "Muridae", "RUBINNo": "9457503", "SPECIES": "pumilio", "LATIN_NAME": "Rhabdomys pumilio", "SUBSPECIES": null, "ENGLISH_NAME": "Xeric Four-striped Grass Rat, Four-striped Grass Rat", "SWEDISH_NAME": null}	2019-03-06 16:16:32.946+00	\N	\N	2019-03-06 16:16:32.946+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	65	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	1	\N	\N	{"Nr": "3630000", "Nr1": "363", "Nr2": "0", "Nr3": "0", "Namn": "GLOSSOPHAGINAE", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	66	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	2	\N	\N	{"Nr": "3631800", "Nr1": "363", "Nr2": "18", "Nr3": "0", "Namn": "ANOURA SP.", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	67	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	3	\N	\N	{"Nr": "3810444", "Nr1": "381", "Nr2": "4", "Nr3": "44", "Namn": "Myotis mystacinus", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	68	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	4	\N	\N	{"Nr": "4352406", "Nr1": "435", "Nr2": "24", "Nr3": "6", "Namn": "Alouatta caraya", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	69	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	5	\N	\N	{"Nr": "4500906", "Nr1": "450", "Nr2": "9", "Nr3": "6", "Namn": "Gorilla beringei", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	70	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	6	\N	\N	{"Nr": "5100906", "Nr1": "510", "Nr2": "9", "Nr3": "6", "Namn": "Ursus arctos", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	71	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	7	\N	\N	{"Nr": "5200312", "Nr1": "520", "Nr2": "3", "Nr3": "12", "Namn": "Mustela erminea", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	72	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	8	\N	\N	{"Nr": "5203003", "Nr1": "520", "Nr2": "30", "Nr3": "3", "Namn": "Gulo gulo", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	73	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	9	\N	\N	{"Nr": "5520606", "Nr1": "552", "Nr2": "6", "Nr3": "6", "Namn": "Lynx lynx   see also LYNX CAN", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	74	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	10	\N	\N	{"Nr": "5700312", "Nr1": "570", "Nr2": "3", "Nr3": "12", "Namn": "Phoca hispida; non-valid taxon name; see Pusa", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	75	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	11	\N	\N	{"Nr": "7803903", "Nr1": "780", "Nr2": "39", "Nr3": "3", "Namn": "Capreolus capreolus", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	76	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	12	\N	\N	{"Nr": "9250000", "Nr1": "925", "Nr2": "0", "Nr3": "0", "Namn": "MURIDAE", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	77	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	13	\N	\N	{"Nr": "9457503", "Nr1": "945", "Nr2": "75", "Nr3": "3", "Namn": "Rhabdomys pumilio", "Last_modified": null}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	78	\N	\N	2019-03-06 16:16:33.108+00	create	t	\N	taxonName	14	\N	\N	{"Nr": "9472969", "Nr1": "947", "Nr2": "29", "Nr3": "69", "Namn": "Mus musculoides", "Last_modified": "[masked]"}	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	79	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	15	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	80	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	16	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	81	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	17	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	82	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	18	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	83	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	19	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	84	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	20	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	85	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	21	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	86	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	22	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	87	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	23	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	88	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	24	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	89	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	25	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	90	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	26	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	91	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	27	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	92	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	28	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	93	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	29	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	94	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	30	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	95	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	31	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	96	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	32	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	97	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	33	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	98	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	34	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	99	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	35	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	100	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	36	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	101	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	37	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	102	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	38	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	103	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	39	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	104	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	40	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	105	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	41	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	106	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	42	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	107	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	43	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	108	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	44	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	109	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	45	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	110	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	46	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	111	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	47	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	112	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	48	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	113	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	49	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	114	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	50	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	115	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	51	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	116	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	52	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	117	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	53	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	118	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	54	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	119	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	55	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	120	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	56	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.108+00	\N	\N	\N	121	\N	\N	2019-03-06 16:16:33.108+00	create	\N	\N	taxonName	57	\N	\N	\N	2019-03-06 16:16:33.061+00	\N	\N	2019-03-06 16:16:33.061+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	123	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	1	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	124	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	2	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	125	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	3	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	126	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	4	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	127	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	5	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	128	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	6	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	129	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	7	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	130	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	8	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	131	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	9	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	132	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	10	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	133	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	11	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	134	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	12	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	135	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	13	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	136	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	14	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	137	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	15	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	138	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	16	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	139	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	17	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	140	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	18	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	141	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	19	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	142	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	20	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	143	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	21	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	144	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	22	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	145	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	23	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	146	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	24	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	147	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	25	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	148	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	26	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	149	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	27	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.226+00	\N	\N	\N	150	\N	\N	2019-03-06 16:16:33.226+00	create	\N	\N	storageLocation	28	\N	\N	\N	2019-03-06 16:16:33.195+00	\N	\N	2019-03-06 16:16:33.195+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	151	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	1	\N	\N	{"Namn": "John Doe", "To_Year": "2016", "Position": "curator", "From_Year": "1998", "Last_Name": "Doe", "Signature": "JDO", "First_Name": "John"}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	152	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	2	\N	\N	{"City": null, "Email": null, "LegID": "1", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Pehr Osbeck", "Last_Name": "Osbeck", "Telephone": null, "Department": null, "First_Name": "Pehr", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	153	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	3	\N	\N	{"City": null, "Email": null, "LegID": "2", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Peter Forsskål", "Last_Name": "Forsskål", "Telephone": null, "Department": null, "First_Name": "Peter", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	154	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	4	\N	\N	{"City": null, "Email": null, "LegID": "3", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Pehr Löfling", "Last_Name": "Löfling", "Telephone": null, "Department": null, "First_Name": "Pehr", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	155	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	5	\N	\N	{"City": null, "Email": null, "LegID": "4", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Pehr Kalm", "Last_Name": "Kalm", "Telephone": null, "Department": null, "First_Name": "Pehr", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	156	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	6	\N	\N	{"City": null, "Email": null, "LegID": "5", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Daniel Rolander", "Last_Name": "Rolander", "Telephone": null, "Department": null, "First_Name": "Daniel", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	157	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	7	\N	\N	{"City": null, "Email": null, "LegID": "6", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Johan Peter Falck", "Last_Name": "Falck", "Telephone": null, "Department": null, "First_Name": "Johan Peter", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	158	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	8	\N	\N	{"City": null, "Email": null, "LegID": "7", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Daniel Solander", "Last_Name": "Solander", "Telephone": null, "Department": null, "First_Name": "Daniel", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	159	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	9	\N	\N	{"City": null, "Email": null, "LegID": "8", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Carl Peter Thunberg", "Last_Name": "Thunberg", "Telephone": null, "Department": null, "First_Name": "Carl Peter", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	160	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	10	\N	\N	{"City": null, "Email": null, "LegID": "9", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Anders Sparrman", "Last_Name": "Sparrman", "Telephone": null, "Department": null, "First_Name": "Anders", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	183	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	21	specimenService	{"id": 21, "document": {"lid": "7fe19763-c486-4e29-b7c5-9ddd7122d60f", "remarks": "MGG-sample"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "13"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	161	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	11	\N	\N	{"City": null, "Email": null, "LegID": "10", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": "Apostle of Linnaeus.", "Full_Name": "Jonas Peter Bergius", "Last_Name": "Bergius", "Telephone": null, "Department": null, "First_Name": "Peter Jonas", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": null}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.297+00	\N	\N	\N	162	\N	\N	2019-03-06 16:16:33.297+00	create	t	\N	normalizedAgent	12	\N	\N	{"City": null, "Email": null, "LegID": "11", "Title": null, "To_Yr": null, "PO_Box": null, "Street": null, "Country": null, "From_Yr": null, "Comments": null, "Full_Name": "John Doe", "Last_Name": "Doe", "Telephone": null, "Department": null, "First_Name": "John", "PostalCode": null, "Prov_State": null, "Institution": null, "Original_Name": null, "Original_LEG_Code": "JDO"}	2019-03-06 16:16:33.277+00	\N	\N	2019-03-06 16:16:33.277+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	163	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	1	specimenService	{"id": 1, "document": {"lid": "7c17a51d-4270-4f4a-a094-6eff774b91d7"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "27"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	164	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	2	specimenService	{"id": 2, "document": {"lid": "084fcb4f-40b1-4354-a2d0-fc0d24872e18"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "21"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	165	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	3	specimenService	{"id": 3, "document": {"lid": "8bc9d3aa-3dd2-49c6-8212-5de1896cb92d"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "11"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	166	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	4	specimenService	{"id": 4, "document": {"lid": "8d7fdd53-6959-484c-b0f9-5345ecd37c3b"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "11"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	167	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	5	specimenService	{"id": 5, "document": {"lid": "42d754cd-474d-443e-b6bc-9b079a052c85"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "6"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	168	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	6	specimenService	{"id": 6, "document": {"lid": "6e8b376b-8a3a-4d60-81ba-67e744c0011b"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "17"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	169	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	7	specimenService	{"id": 7, "document": {"lid": "165bfe47-6a97-47eb-93a3-9a82701a0662"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "7"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	170	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	8	specimenService	{"id": 8, "document": {"lid": "19f6b3a6-f844-4056-86ea-e9b38d33c1cf"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "26"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	171	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	9	specimenService	{"id": 9, "document": {"lid": "6e856b0f-99fb-4e93-9c46-1727728a6939", "remarks": "Urogenitalsystem i sprit, se kommentar"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "12"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	172	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	10	specimenService	{"id": 10, "document": {"lid": "f34c2d14-bd3a-4d6d-b3cf-084f1526bdca"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "23"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	173	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	11	specimenService	{"id": 11, "document": {"lid": "da061a14-e348-4850-abb5-f1e3472b96e4"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "4"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	174	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	12	specimenService	{"id": 12, "document": {"lid": "ad0b61fc-c9e6-4bac-998c-471cde0d874c"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "25"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	175	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	13	specimenService	{"id": 13, "document": {"lid": "28ff4fe9-8781-42bb-95b3-95a14ed60727"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "5"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	176	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	14	specimenService	{"id": 14, "document": {"lid": "776e49a3-af35-407c-a59b-a061827d7a5c", "remarks": "Skin missing but should be here"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "18"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	177	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	15	specimenService	{"id": 15, "document": {"lid": "eec94365-4bba-497f-ad01-16962109667d"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "14"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	178	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	16	specimenService	{"id": 16, "document": {"lid": "6f5a2354-ae42-42ff-a6c0-79acbc1a81a2"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "28"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	179	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	17	specimenService	{"id": 17, "document": {"lid": "e23b1ae7-68bd-4793-a02f-9f8bd564b81b"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "20"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	180	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	18	specimenService	{"id": 18, "document": {"lid": "220eea66-f050-4176-9188-51c3025bedf1"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "20"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	181	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	19	specimenService	{"id": 19, "document": {"lid": "67a84488-0dc6-49e9-958d-38cbe2a13bd7"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "8"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	182	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	20	specimenService	{"id": 20, "document": {"lid": "0f73cf3f-7e11-4653-b1db-728e67d4492a"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "16"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	184	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	22	specimenService	{"id": 22, "document": {"lid": "f0e88cd2-1cb8-4e4d-8708-74b0ec52bfbc"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "7"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	185	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	23	specimenService	{"id": 23, "document": {"lid": "373c0bbb-0f2f-4ecd-b0c7-7af35dfda27f", "remarks": "Skin at another institution"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "2"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	186	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	24	specimenService	{"id": 24, "document": {"lid": "6bd4d262-1ef5-4598-a16c-d406645078b9", "remarks": "MGG-sample"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "12"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	187	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	25	specimenService	{"id": 25, "document": {"lid": "79547a5d-d0d4-47c3-b179-627bf6deee92"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "9"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	188	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	26	specimenService	{"id": 26, "document": {"lid": "6cb9d6ca-5baf-4768-be7e-a6f4e89d2eb6"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "8"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	189	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	27	specimenService	{"id": 27, "document": {"lid": "8ae89103-2e54-4ebe-9f81-e31c48c35cee", "remarks": "Biocidprover"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "13"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.797+00	\N	\N	\N	190	\N	\N	2019-03-06 16:16:33.797+00	create	\N	\N	physicalObject	28	specimenService	{"id": 28, "document": {"lid": "b446d1dd-7a7b-4394-a2bb-666e030b4c8b"}, "createdAt": "2019-03-06T16:16:33.778Z", "updatedAt": "2019-03-06T16:16:33.778Z", "schemaCompliant": true, "storageLocationId": "7"}	\N	2019-03-06 16:16:33.778+00	\N	\N	2019-03-06 16:16:33.778+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	191	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	1	specimenService	{"id": "1", "document": {"remarks": "Donation från Lärarhögskolan, Stockholm, # 00062B7476 (Skuldra)\\nUtlånad, lån 2012-21 (Dnr 52-78/2012)", "individual": {"acquisition": {"date": {"endDate": {"year": 2010, "interpretedTimestamp": "2010-12-31T22:59:59.999Z"}, "dateType": "single", "startDate": {"year": 2010, "interpretedTimestamp": "2009-12-31T23:00:00.000Z"}}, "handedInByAgent": {"textI": "Lärarhögskolan, Stockholm"}}, "identifiers": [{"value": "500001", "identifierType": {"id": "1"}}, {"value": "2012-21", "identifierType": {"id": "6"}}], "determinations": [{"date": {"endDate": {"day": 8, "year": 2010, "month": 6, "interpretedTimestamp": "2010-06-08T21:59:59.999Z"}, "dateType": "single", "startDate": {"day": 8, "year": 2010, "month": 6, "interpretedTimestamp": "2010-06-07T22:00:00.000Z"}}, "taxonNameI": "Mustela erminea", "determinedByAgent": {"textI": "Mortensen, Peter"}}], "collectionItems": [{"physicalObject": {"lid": "7c17a51d-4270-4f4a-a094-6eff774b91d7"}, "preparationType": {"id": "13"}}], "taxonInformation": {"curatorialTaxon": {"id": "14"}, "customTaxonNames": [{"value": "Mustela erminea", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"methodText": "other", "featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "female"}], "recordHistoryEvents": [{"date": {"dateText": "2010-06-08 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2015-09-09 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"year": 2010, "interpretedTimestamp": "2010-12-31T22:59:59.999Z"}, "remarks": "Collected: Before 2010", "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "19"}], "position": {}, "localityI": "No information", "verticalPosition": {}}}, "isDeathDate": false, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Ermine", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Vinterdräkt"}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "14", "type": "taxon"}]}, "places": {"data": [{"id": "19", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "6", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "1", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "13", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Mustela", "LopId": "49828", "Order": "Carnivora", "Family": "Mustelidae", "Origin": null, "Det_Day": "8", "FieldNo": "5116", "RegDate": "2010-06-08 00:00:00", "RubinID": null, "RubinNo": "5200312", "Species": "erminea", "CardDate": null, "Coll_Day": null, "Comments": "Donation från Lärarhögskolan, Stockholm, # 00062B7476 (Skuldra)\\nUtlånad, lån 2012-21 (Dnr 52-78/2012)", "Det_Year": "2010", "Coll_Year": "2010", "Date_Type": "3", "Det_Month": "6", "Signature": "[masked]", "CardAuthor": null, "Coll_Month": null, "CommonName": "Ermine", "DateRemark": "Collected: Before 2010", "Expedition": null, "Subspecies": null, "WayOfDeath": null, "AccessionNo": "500001", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2015-09-09 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": null, "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": null, "FieldNo_related": {"LatD": null, "LatM": null, "LatS": null, "Datum": null, "LongD": null, "LongM": null, "LongS": null, "Lat_DD": null, "Lat_NS": null, "Nation": "No information", "FieldNo": "5116", "Long_DD": null, "Long_EW": null, "RubinID": null, "TillfID": null, "District": null, "Locality": "No information", "Province": null, "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "No information", "LocationRemarks": null, "LastModifiedDate": "2018-11-22 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": null, "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "346", "GENUS": "Mustela", "ORDER": "Carnivora", "FAMILY": "Mustelidae", "RUBINNo": "5200312", "SPECIES": "erminea", "_sourceId": "3", "LATIN_NAME": "Mustela erminea", "SUBSPECIES": null, "ENGLISH_NAME": "Ermine", "SWEDISH_NAME": "Hermelin"}], "Scientific_Name": "Mustela erminea", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "3", "Date_Type": "Arrived"}, "DeterminedBy(DET)": "Mortensen, Peter", "OldScientificName": "Mustela erminea", "Signature_related": null, "WayOfDeath_related": null, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Female", "AgeStage": "Adult", "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "500001", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": "Other", "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": "2012-21", "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": null, "SVAnumber": null, "Vertebrae": null, "Deposition": "Gift", "HandedInBy": "Lärarhögskolan, Stockholm", "SkinStatus": "2", "AccessionNo": "500001", "Mounting_wall": null, "OldSkeletonNo": null, "SkeletonStatus": null, "SkinCollection": "14", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": "Vinterdräkt", "SkeletonCollection": null, "SkinStatus_related": {"ID": "2", "Skinn": "Hela skinnet monterat", "Skin_Eng": "Skin complete, mounted"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": null, "SkinCollection_related": {"ID": "14", "Type": "Both", "Location_Eng": "On loan", "NRM_Location": "Utlånad", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": null, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	192	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	2	specimenService	{"id": "2", "document": {"remarks": "Quensels donationsbok:\\nÅr 1784 Sparrman Prof. et. Mus pumilio från Södra Africa.\\nHornstedts katalog 1788: Mus Pumilio: Sparm. ˢɤ  v\\nQuensels Catalog 1803\\nMus. 3 Pumilio - 131 Acta Holm. A:o 1784 p. 233 tab.6. Ipssis. / C.b.sp.// 1. / Sparrm.\\nMina kommentarer (Erik Åhlander)\\nTwo labels similar to Leufsta labels, but probably both written by Sparrman. \\nType locality in Wilson and reeder doesn't agree with my coordinates.", "individual": {"identifiers": [{"value": "530183", "identifierType": {"id": "1"}}, {"value": "925", "identifierType": {"id": "3"}}, {"value": "925", "identifierType": {"id": "2"}}], "determinations": [{"taxonNameI": "Rhabdomys pumilio", "determinedByAgent": {"textI": "Sparrman, Andreas"}}], "collectionItems": [{"physicalObject": {"lid": "084fcb4f-40b1-4354-a2d0-fc0d24872e18"}, "preparationType": {"id": "19"}}], "taxonInformation": {"typeStatus": {"id": "2"}, "curatorialTaxon": {"id": "39"}, "customTaxonNames": [{"value": "Mus pumilio", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "unknown"}], "recordHistoryEvents": [{"date": {"dateText": "2016-09-26 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2016-09-26 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"year": 1784, "interpretedTimestamp": "1784-12-31T22:47:47.999Z"}, "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "5"}], "remarks": "S of Humansdorp, Slangriver area", "position": {}, "localityI": "Humansdorp", "localityV": "S of Humansdorp, Slangriver area; Ö om Goda Hoppsudde", "verticalPosition": {}}}, "remarks": "S of Humansdorp, Slangriver area", "isDeathDate": false, "collectedByAgent": {"textI": "Sparrman, Andreas"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Xeric Four-striped Grass Rat", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "39", "type": "taxon"}]}, "places": {"data": [{"id": "5", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "2", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "19", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": "Holotype", "Genus": "Rhabdomys", "LopId": "52855", "Order": "Rodentia", "Family": "Muridae", "Origin": null, "Det_Day": null, "FieldNo": "7122", "RegDate": "2016-09-26 00:00:00", "RubinID": null, "RubinNo": "9457503", "Species": "pumilio", "CardDate": null, "Coll_Day": null, "Comments": "Quensels donationsbok:\\nÅr 1784 Sparrman Prof. et. Mus pumilio från Södra Africa.\\nHornstedts katalog 1788: Mus Pumilio: Sparm. ˢɤ  v\\nQuensels Catalog 1803\\nMus. 3 Pumilio - 131 Acta Holm. A:o 1784 p. 233 tab.6. Ipssis. / C.b.sp.// 1. / Sparrm.\\nMina kommentarer (Erik Åhlander)\\nTwo labels similar to Leufsta labels, but probably both written by Sparrman. \\nType locality in Wilson and reeder doesn't agree with my coordinates.", "Det_Year": null, "Coll_Year": "1784", "Date_Type": "0", "Det_Month": null, "Signature": "[masked]", "CardAuthor": null, "Coll_Month": null, "CommonName": "Xeric Four-striped Grass Rat", "DateRemark": null, "Expedition": null, "Subspecies": null, "WayOfDeath": null, "AccessionNo": "530183", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2016-09-26 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Sparrman, Andreas", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "S of Humansdorp, Slangriver area; Ö om Goda Hoppsudde", "FieldNo_related": {"LatD": null, "LatM": null, "LatS": null, "Datum": null, "LongD": null, "LongM": null, "LongS": null, "Lat_DD": null, "Lat_NS": null, "Nation": "South africa", "FieldNo": "7122", "Long_DD": null, "Long_EW": null, "RubinID": null, "TillfID": "0", "District": null, "Locality": "Humansdorp", "Province": null, "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Africa", "LocationRemarks": "S of Humansdorp, Slangriver area", "LastModifiedDate": "2016-09-26 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": null, "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "1354", "GENUS": "Rhabdomys", "ORDER": "Rodentia", "FAMILY": "Muridae", "RUBINNo": "9457503", "SPECIES": "pumilio", "_sourceId": "8", "LATIN_NAME": "Rhabdomys pumilio", "SUBSPECIES": null, "ENGLISH_NAME": "Xeric Four-striped Grass Rat, Four-striped Grass Rat", "SWEDISH_NAME": null}], "Scientific_Name": "Rhabdomys pumilio", "TaxonomicRemarks": null, "Date_Type_related": null, "DeterminedBy(DET)": "Sparrman, Andreas", "OldScientificName": "Mus pumilio", "Signature_related": null, "WayOfDeath_related": null, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Unknown", "AgeStage": null, "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "530183", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": "925", "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "8", "AccessionNo": "530183", "Mounting_wall": null, "OldSkeletonNo": "925", "SkeletonStatus": "8", "SkinCollection": "24", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": "24", "SkinStatus_related": {"ID": "8", "Skinn": "I sprit", "Skin_Eng": "In alcohol"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "8", "Skelett": "I sprit (även om det är helt ex.)", "Skel_Eng": "In alcohol"}, "SkinCollection_related": {"ID": "24", "Type": "Both", "Location_Eng": "Alcohol type collection", "NRM_Location": "Omistliga sprit", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": {"ID": "24", "Type": "Both", "Location_Eng": "Alcohol type collection", "NRM_Location": "Omistliga sprit", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	193	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	3	specimenService	{"id": "3", "document": {"individual": {"identifiers": [{"value": "534406", "identifierType": {"id": "1"}}, {"value": "1; 4406; 52", "identifierType": {"id": "3"}}, {"value": "1; 4406", "identifierType": {"id": "2"}}], "determinations": [{"taxonNameI": "Myotis mystacinus", "determinedByAgent": {"textI": "Baagoe, H J"}}], "collectionItems": [{"physicalObject": {"lid": "8bc9d3aa-3dd2-49c6-8212-5de1896cb92d"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "8d7fdd53-6959-484c-b0f9-5345ecd37c3b"}, "preparationType": {"id": "12"}}], "taxonInformation": {"curatorialTaxon": {"id": "26"}, "customTaxonNames": [{"value": "Myotis mystacinus Kuhl sensu stricto", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "19"}, "featureObservationText": "46", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "22"}, "featureObservationText": "15", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "6", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "20"}, "featureObservationText": "40", "featureObservationUnit": "unspecified"}], "recordHistoryEvents": [{"date": {"dateText": "1995-06-22 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2006-11-14 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2006-12-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 23, "year": 1949, "month": 5, "interpretedTimestamp": "1949-05-23T22:59:59.999Z"}, "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "8"}], "position": {"latitude": "47.77", "longitude": "9"}, "localityI": "Bodensee, Möggingen", "localityV": "Tyskland, Möggingen Radolfzell, Bodensee", "verticalPosition": {"maximumElevationInMeters": 420, "minimumElevationInMeters": 420}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Bodensee, Möggingen\\"."}}, "isDeathDate": false, "collectedByAgent": {"textI": "Heinrich, G"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Whiskered Bat", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "26", "type": "taxon"}]}, "places": {"data": [{"id": "8", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}, {"id": "19", "type": "featureType"}, {"id": "22", "type": "featureType"}, {"id": "23", "type": "featureType"}, {"id": "20", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "3", "type": "physicalObject"}, {"id": "4", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Myotis", "LopId": "116", "Order": "Chiroptera", "Family": "Vespertilioninae", "Origin": null, "Det_Day": null, "FieldNo": "477", "RegDate": "2006-11-14 00:00:00", "RubinID": null, "RubinNo": "3810444", "Species": "mystacinus", "CardDate": "1995-06-22 00:00:00", "Coll_Day": "23", "Comments": null, "Det_Year": null, "Coll_Year": "1949", "Date_Type": null, "Det_Month": null, "Signature": "[masked]", "CardAuthor": "[masked]", "Coll_Month": "5", "CommonName": "Whiskered Bat", "DateRemark": null, "Expedition": null, "Subspecies": null, "WayOfDeath": null, "AccessionNo": "534406", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2006-12-06 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Heinrich, G", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Tyskland, Möggingen Radolfzell, Bodensee", "FieldNo_related": {"LatD": null, "LatM": null, "LatS": null, "Datum": null, "LongD": null, "LongM": null, "LongS": null, "Lat_DD": "47.77", "Lat_NS": null, "Nation": "Germany", "FieldNo": "477", "Long_DD": "9", "Long_EW": null, "RubinID": null, "TillfID": null, "District": null, "Locality": "Bodensee, Möggingen", "Province": "Baden-Württemberg", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": "420", "Min_Elevation": "420", "LastModifiedBy": null, "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2007-03-02 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": null, "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "59", "GENUS": "Myotis", "ORDER": "Chiroptera", "FAMILY": "Vespertilionidae", "RUBINNo": "3810444", "SPECIES": "mystacinus", "_sourceId": "0", "LATIN_NAME": "Myotis mystacinus", "SUBSPECIES": null, "ENGLISH_NAME": "Whiskered Bat", "SWEDISH_NAME": "Mustaschfladdermus"}], "Scientific_Name": "Myotis mystacinus", "TaxonomicRemarks": null, "Date_Type_related": null, "DeterminedBy(DET)": "Baagoe, H J", "OldScientificName": "Myotis mystacinus Kuhl sensu stricto", "Signature_related": null, "WayOfDeath_related": null, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Male", "AgeStage": null, "Condition": null, "EarLength": "15.0", "BodyLength": "46.0", "AccessionNo": "534406", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": "6.0", "TailAnusLength": "40.0", "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": "1; 4406; 52", "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "1", "AccessionNo": "534406", "Mounting_wall": null, "OldSkeletonNo": "1; 4406", "SkeletonStatus": "5", "SkinCollection": null, "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": null, "SkinStatus_related": {"ID": "1", "Skinn": "Helt skinn finns (skinnlagt)", "Skin_Eng": "Skin complete, prepared"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "5", "Skelett": "Endast kranium; även om underkäke saknas", "Skel_Eng": "Cranium (mandible may be missing)"}, "SkinCollection_related": null, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": null, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	194	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	4	specimenService	{"id": "4", "document": {"individual": {"identifiers": [{"value": "583124", "identifierType": {"id": "1"}}, {"value": "Bly 45, 1008, 3124", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "42d754cd-474d-443e-b6bc-9b079a052c85"}, "preparationType": {"id": "5"}}], "deathInformation": [{"remarks": "Skadeskjuten, sedan självdöd"}], "taxonInformation": {"curatorialTaxon": {"id": "20"}}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "adult"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2007-05-24 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2016-01-07 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"remarks": "Hösten/vintern 1929-30"}, "locationInformation": {"places": [{"id": "15"}], "remarks": "C:a 15 km N. Norra Bergnäs", "position": {"latitude": "66.5233883066444", "longitude": "18.2263048109662", "uncertaintyInMeters": 7000}, "localityI": "Vuollak", "localityV": "Vuollak 1.5 mil Norr om N. Bergnäs i Pite älvdal", "swedishGrid5km": "26I6b", "verticalPosition": {"minimumDepthInMeters": 2}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Vuollak\\"; Calculated midpoint from RT90 Index 5km \\"26I6b\\"."}}, "remarks": "C:a 15 km N. Norra Bergnäs", "isDeathDate": false, "collectedByAgent": {"textI": "Bergman"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Brown Bear", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "20", "type": "taxon"}]}, "places": {"data": [{"id": "15", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "5", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Ursus", "LopId": "4029", "Order": "Carnivora", "Family": "Ursidae", "Origin": null, "Det_Day": null, "FieldNo": "6818", "RegDate": "2007-05-24 00:00:00", "RubinID": "FÖ 982540001333", "RubinNo": "5100906", "Species": "arctos", "CardDate": null, "Coll_Day": null, "Comments": null, "Det_Year": null, "Coll_Year": null, "Date_Type": null, "Det_Month": null, "Signature": "[masked]", "CardAuthor": "[masked]", "Coll_Month": null, "CommonName": "Brown Bear", "DateRemark": "Hösten/vintern 1929-30", "Expedition": null, "Subspecies": null, "WayOfDeath": null, "AccessionNo": "583124", "DeathRemark": "Skadeskjuten, sedan självdöd", "SwedishName": null, "Field_Checks": "Storage, Coordinates", "ModifiedDate": "2016-01-07 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Bergman", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Vuollak 1.5 mil Norr om N. Bergnäs i Pite älvdal", "FieldNo_related": {"LatD": null, "LatM": null, "LatS": null, "Datum": null, "LongD": null, "LongM": null, "LongS": null, "Lat_DD": "66.5233883066444", "Lat_NS": null, "Nation": "Sweden", "FieldNo": "6818", "Long_DD": "18.2263048109662", "Long_EW": null, "RubinID": null, "TillfID": "0", "District": "Arjeplog", "Locality": "Vuollak", "Province": "Pite Lappmark", "Max_Depth": null, "Min_Depth": "2", "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": "C:a 15 km N. Norra Bergnäs", "LastModifiedDate": "2009-04-29 00:00:00", "SwedishCoordinate": "26I6b", "Locational_Accuracy": "7000", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "313", "GENUS": "Ursus", "ORDER": "Carnivora", "FAMILY": "Ursidae", "RUBINNo": "5100906", "SPECIES": "arctos", "_sourceId": "2", "LATIN_NAME": "Ursus arctos", "SUBSPECIES": null, "ENGLISH_NAME": "Brown Bear", "SWEDISH_NAME": "Brunbjörn"}], "Scientific_Name": "Ursus arctos", "TaxonomicRemarks": null, "Date_Type_related": null, "DeterminedBy(DET)": null, "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": null, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": null, "AgeStage": "Adult", "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "583124", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": null, "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": null, "AccessionNo": "583124", "Mounting_wall": null, "OldSkeletonNo": "Bly 45, 1008, 3124", "SkeletonStatus": "5", "SkinCollection": null, "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": "1", "SkinStatus_related": null, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "5", "Skelett": "Endast kranium; även om underkäke saknas", "Skel_Eng": "Cranium (mandible may be missing)"}, "SkinCollection_related": null, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	195	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	5	specimenService	{"id": "5", "document": {"remarks": "Sampled for isotope analysis: Loan 2015-37", "individual": {"identifiers": [{"value": "585522", "identifierType": {"id": "1"}}], "determinations": [{"taxonNameI": "Lynx lynx", "determinedByAgent": {"textI": "Bergström, Ulf"}}], "collectionItems": [{"physicalObject": {"lid": "6e8b376b-8a3a-4d60-81ba-67e744c0011b"}, "preparationType": {"id": "12"}}], "deathInformation": [{"causeOfDeathType": {"id": "6"}}], "taxonInformation": {"curatorialTaxon": {"id": "9"}, "customTaxonNames": [{"value": "Lynx lynx", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "female"}], "recordHistoryEvents": [{"date": {"dateText": "2015-03-04 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2015-10-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 15, "year": 1941, "month": 4, "interpretedTimestamp": "1941-04-15T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 15, "year": 1941, "month": 4, "interpretedTimestamp": "1941-04-14T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "14"}], "position": {"latitude": "66.0111111111111", "longitude": "17.5841666666667", "uncertaintyInMeters": 5000}, "localityI": "Arjeplog, V. Uddjaur", "localityV": "Sjön Uddjaure, V. Uddjaure", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Arjeplog, V. Uddjaur\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Hollander, R."}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "66", "locationDistinct.latM": "0", "locationDistinct.latS": "40", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "66", "locationDistinct.longM": "0", "locationDistinct.longS": "40", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "9", "type": "taxon"}]}, "places": {"data": [{"id": "14", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "6", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "6", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Lynx", "LopId": "51952", "Order": "Carnivora", "Family": "Felidae", "Origin": null, "Det_Day": null, "FieldNo": "7019", "RegDate": "2015-03-04 00:00:00", "RubinID": null, "RubinNo": "5520606", "Species": "lynx", "CardDate": null, "Coll_Day": "15", "Comments": "Sampled for isotope analysis: Loan 2015-37", "Det_Year": null, "Coll_Year": "1941", "Date_Type": "1", "Det_Month": null, "Signature": "[masked]", "CardAuthor": null, "Coll_Month": "4", "CommonName": null, "DateRemark": null, "Expedition": null, "Subspecies": null, "WayOfDeath": "6", "AccessionNo": "585522", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2015-10-06 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Hollander, R.", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Sjön Uddjaure, V. Uddjaure", "FieldNo_related": {"LatD": "66", "LatM": "0", "LatS": "40", "Datum": null, "LongD": "17", "LongM": "35", "LongS": "3", "Lat_DD": "66.0111111111111", "Lat_NS": "N", "Nation": "Sweden", "FieldNo": "7019", "Long_DD": "17.5841666666667", "Long_EW": "E", "RubinID": null, "TillfID": "0", "District": null, "Locality": "Arjeplog, V. Uddjaur", "Province": "Pite Lappmark", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2015-03-04 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": "5000", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "489", "GENUS": "Lynx", "ORDER": "Carnivora", "FAMILY": "Felidae", "RUBINNo": "5520606", "SPECIES": "lynx", "_sourceId": "5", "LATIN_NAME": "Lynx lynx", "SUBSPECIES": null, "ENGLISH_NAME": "Eurasian Lynx", "SWEDISH_NAME": null}], "Scientific_Name": "Lynx lynx", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": "Bergström, Ulf", "OldScientificName": "Lynx lynx", "Signature_related": null, "WayOfDeath_related": {"ID": "6", "DödsorsakEN": "Collected", "DödsorsakSW": "Insamlad"}, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Female", "AgeStage": null, "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "585522", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": null, "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "1", "AccessionNo": "585522", "Mounting_wall": "L6", "OldSkeletonNo": null, "SkeletonStatus": null, "SkinCollection": "23", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": null, "SkinStatus_related": {"ID": "1", "Skinn": "Helt skinn finns (skinnlagt)", "Skin_Eng": "Skin complete, prepared"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": null, "SkinCollection_related": {"ID": "23", "Type": "Skin", "Location_Eng": "Lynx room", "NRM_Location": "Lodjursrum, köl 1213", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": null, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	196	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	6	specimenService	{"id": "6", "document": {"remarks": "Troligtvis samma individ som 929106 (urogenitalsystem i sprit) denna post är struken.  fyndet beskrivet i Fauna och flora 26:1931 269-272. Mått och vikt från texten längdmåttet är konturlängd 107cm svansen 23cm, drygt 24 kg oflått\\nLokalen ändrad från Knivsta s:n till Vallby skogen/PMN", "individual": {"identifiers": [{"value": "587520", "identifierType": {"id": "1"}}, {"value": "20", "identifierType": {"id": "3"}}, {"value": "20", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "165bfe47-6a97-47eb-93a3-9a82701a0662"}, "preparationType": {"id": "4"}}, {"physicalObject": {"lid": "19f6b3a6-f844-4056-86ea-e9b38d33c1cf"}, "preparationType": {"id": "12"}}, {"physicalObject": {"lid": "6e856b0f-99fb-4e93-9c46-1727728a6939"}, "preparationType": {"id": "23"}}], "deathInformation": [{"causeOfDeathType": {"id": "8"}}], "taxonInformation": {"curatorialTaxon": {"id": "12"}}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "unknown"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}, {"featureType": {"id": "6"}, "featureObservationText": "x"}, {"featureType": {"id": "7"}, "featureObservationText": "x"}, {"featureType": {"id": "8"}, "featureObservationText": "2"}, {"featureType": {"id": "9"}, "featureObservationText": "2"}, {"featureType": {"id": "10"}, "featureObservationText": "2"}, {"featureType": {"id": "11"}, "featureObservationText": "2"}, {"featureType": {"id": "12"}, "featureObservationText": "2"}, {"featureType": {"id": "14"}, "featureObservationText": "2"}, {"featureType": {"id": "15"}, "featureObservationText": "2"}, {"featureType": {"id": "16"}, "featureObservationText": "2"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-04-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 13, "year": 1931, "month": 10, "interpretedTimestamp": "1931-10-13T22:59:59.999Z"}, "remarks": "Fynddatum ändrat från 15/10 till 13/10-", "dateType": "single", "startDate": {"day": 13, "year": 1931, "month": 10, "interpretedTimestamp": "1931-10-12T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "16"}], "position": {"latitude": "59.6666666666667", "longitude": "17.7166666666667", "uncertaintyInMeters": 2000}, "localityI": "Uppsala, Vallby skogen", "localityV": "Uppland, Danmarks socken, Vallby skogen (Bergsbrunna skogen)", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Uppsala, Vallby skogen\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Modin, Axel"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": "yes", "objects.commonName": "Wolverine", "objects.swedishName": "Järv", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "59", "locationDistinct.latM": "40", "locationDistinct.latS": "0", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "59", "locationDistinct.longM": "40", "locationDistinct.longS": "0", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Pelvis missing"}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "12", "type": "taxon"}]}, "places": {"data": [{"id": "16", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}, {"id": "6", "type": "featureType"}, {"id": "7", "type": "featureType"}, {"id": "8", "type": "featureType"}, {"id": "9", "type": "featureType"}, {"id": "10", "type": "featureType"}, {"id": "11", "type": "featureType"}, {"id": "12", "type": "featureType"}, {"id": "14", "type": "featureType"}, {"id": "15", "type": "featureType"}, {"id": "16", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "7", "type": "physicalObject"}, {"id": "8", "type": "physicalObject"}, {"id": "9", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "4", "type": "preparationType"}, {"id": "12", "type": "preparationType"}, {"id": "23", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "8", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Gulo", "LopId": "7063", "Order": "Carnivora", "Family": "Mustelidae", "Origin": null, "Det_Day": null, "FieldNo": "7360", "RegDate": "2018-03-06 00:00:00", "RubinID": "FÖ 982540002910", "RubinNo": "5203003", "Species": "gulo", "CardDate": null, "Coll_Day": "13", "Comments": "Troligtvis samma individ som 929106 (urogenitalsystem i sprit) denna post är struken.  fyndet beskrivet i Fauna och flora 26:1931 269-272. Mått och vikt från texten längdmåttet är konturlängd 107cm svansen 23cm, drygt 24 kg oflått\\nLokalen ändrad från Knivsta s:n till Vallby skogen/PMN", "Det_Year": null, "Coll_Year": "1931", "Date_Type": "1", "Det_Month": null, "Signature": "[masked]", "CardAuthor": "[masked]", "Coll_Month": "10", "CommonName": "Wolverine", "DateRemark": "Fynddatum ändrat från 15/10 till 13/10-", "Expedition": null, "Subspecies": null, "WayOfDeath": "8", "AccessionNo": "587520", "DeathRemark": null, "SwedishName": "Järv", "Field_Checks": "Storage, Coordinates", "ModifiedDate": "2018-04-06 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Modin, Axel", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Uppland, Danmarks socken, Vallby skogen (Bergsbrunna skogen)", "FieldNo_related": {"LatD": "59", "LatM": "40", "LatS": "0", "Datum": null, "LongD": "17", "LongM": "43", "LongS": "0", "Lat_DD": "59.6666666666667", "Lat_NS": "N", "Nation": "Sweden", "FieldNo": "7360", "Long_DD": "17.7166666666667", "Long_EW": "E", "RubinID": null, "TillfID": "0", "District": null, "Locality": "Uppsala, Vallby skogen", "Province": "Uppland", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2018-03-20 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": "2000", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "371", "GENUS": "Gulo", "ORDER": "Carnivora", "FAMILY": "Mustelidae", "RUBINNo": "5203003", "SPECIES": "gulo", "_sourceId": "4", "LATIN_NAME": "Gulo gulo", "SUBSPECIES": null, "ENGLISH_NAME": "Wolverine", "SWEDISH_NAME": "Järv"}], "Scientific_Name": "Gulo gulo", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": null, "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": {"ID": "8", "DödsorsakEN": "Hunt, shot", "DödsorsakSW": "Jakt, skjuten"}, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Male", "AgeStage": "Unknown", "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "587520", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": "2", "Femur": "2", "Manus": "2", "Pedis": "2", "Tibia": "2", "Costae": "x", "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": "2", "Cranium": "1", "DNArack": null, "Ethanol": "Yes", "Humerus": "2", "Scapula": "2", "Bacculum": null, "Mandibula": "1", "OldSkinNo": "20", "SVAnumber": null, "Vertebrae": "x", "Deposition": null, "HandedInBy": null, "SkinStatus": "1", "AccessionNo": "587520", "Mounting_wall": null, "OldSkeletonNo": "20", "SkeletonStatus": "4", "SkinCollection": "9", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": "Pelvis missing", "SkeletonCollection": "1", "SkinStatus_related": {"ID": "1", "Skinn": "Helt skinn finns (skinnlagt)", "Skin_Eng": "Skin complete, prepared"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "4", "Skelett": "Partiellt skelett + kranium", "Skel_Eng": "Partial skeleton with cranium"}, "SkinCollection_related": {"ID": "9", "Type": "Both", "Location_Eng": null, "NRM_Location": "Skinnrum kylda", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": "Urogenitalsystem i sprit, se kommentar", "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	197	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	7	specimenService	{"id": "7", "document": {"individual": {"identifiers": [{"value": "590325", "identifierType": {"id": "1"}}, {"value": "321", "identifierType": {"id": "3"}}], "determinations": [{"taxonNameI": "Mus musculoides", "determinedByAgent": {"textI": "Gyldenstolpe, Nils"}}], "collectionItems": [{"physicalObject": {"lid": "f34c2d14-bd3a-4d6d-b3cf-084f1526bdca"}, "preparationType": {"id": "12"}}], "taxonInformation": {"taxonRemarks": "Sungenus Nannomys", "curatorialTaxon": {"id": "37"}, "customTaxonNames": [{"value": "Mus (Leggada) bellus gondokorae", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "female"}, {"featureType": {"id": "19"}, "featureObservationText": "52", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "22"}, "featureObservationText": "14", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "20"}, "featureObservationText": "47", "featureObservationUnit": "unspecified"}], "recordHistoryEvents": [{"date": {"dateText": "2016-08-19 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2016-08-19 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 9, "year": 1921, "month": 4, "interpretedTimestamp": "1921-04-09T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 9, "year": 1921, "month": 4, "interpretedTimestamp": "1921-04-08T23:00:00.000Z"}}, "expeditionText": "Swedish Expedition to Central Africa 1920-21", "locationInformation": {"places": [{"id": "4"}], "position": {"latitude": "-0.661944444444444", "longitude": "29.4566666666667"}, "localityI": "Kabare", "localityV": "Kabare - Lake Edward", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Kabare\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Gyldenstolpe, Nils"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Subsaharan Pygmy Mouse", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "0", "locationDistinct.latM": "39", "locationDistinct.latS": "43", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "S", "locationDistinct.longD": "0", "locationDistinct.longM": "39", "locationDistinct.longS": "43", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "S", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "37", "type": "taxon"}]}, "places": {"data": [{"id": "4", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}, {"id": "19", "type": "featureType"}, {"id": "22", "type": "featureType"}, {"id": "20", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "10", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Mus", "LopId": "52813", "Order": "Rodentia", "Family": "Muridae", "Origin": null, "Det_Day": null, "FieldNo": "6838", "RegDate": "2016-08-19 00:00:00", "RubinID": null, "RubinNo": "9472969", "Species": "musculoides", "CardDate": null, "Coll_Day": "9", "Comments": null, "Det_Year": null, "Coll_Year": "1921", "Date_Type": "1", "Det_Month": null, "Signature": "[masked]", "CardAuthor": null, "Coll_Month": "4", "CommonName": "Subsaharan Pygmy Mouse", "DateRemark": null, "Expedition": "Swedish Expedition to Central Africa 1920-21", "Subspecies": null, "WayOfDeath": null, "AccessionNo": "590325", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2016-08-19 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Gyldenstolpe, Nils", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Kabare - Lake Edward", "FieldNo_related": {"LatD": "0", "LatM": "39", "LatS": "43", "Datum": null, "LongD": "29", "LongM": "27", "LongS": "24", "Lat_DD": "-0.661944444444444", "Lat_NS": "S", "Nation": "Congo, The Democratic Republic of the", "FieldNo": "6838", "Long_DD": "29.4566666666667", "Long_EW": "E", "RubinID": null, "TillfID": "0", "District": null, "Locality": "Kabare", "Province": "Rutshuru", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Africa", "LocationRemarks": null, "LastModifiedDate": "2015-06-22 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": null, "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "1914", "GENUS": "Mus", "ORDER": "Rodentia", "FAMILY": "Muridae", "RUBINNo": "9472969", "SPECIES": "musculoides", "_sourceId": "11", "LATIN_NAME": "Mus musculoides", "SUBSPECIES": null, "ENGLISH_NAME": "Subsaharan Pygmy Mouse", "SWEDISH_NAME": null}], "Scientific_Name": "Mus musculoides", "TaxonomicRemarks": "Sungenus Nannomys", "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": "Gyldenstolpe, Nils", "OldScientificName": "Mus (Leggada) bellus gondokorae", "Signature_related": null, "WayOfDeath_related": null, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Female", "AgeStage": null, "Condition": null, "EarLength": "14.0", "BodyLength": "52.0", "AccessionNo": "590325", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": "47.0", "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": "321", "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "1", "AccessionNo": "590325", "Mounting_wall": null, "OldSkeletonNo": null, "SkeletonStatus": null, "SkinCollection": "3", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": null, "SkinStatus_related": {"ID": "1", "Skinn": "Helt skinn finns (skinnlagt)", "Skin_Eng": "Skin complete, prepared"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": null, "SkinCollection_related": {"ID": "3", "Type": "Both", "Location_Eng": null, "NRM_Location": "Plåtskåpsrum", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": null, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	198	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	8	specimenService	{"id": "8", "document": {"remarks": "Manus och pedis in skin", "individual": {"identifiers": [{"value": "620285", "identifierType": {"id": "1"}}, {"value": "1,285", "identifierType": {"id": "3"}}, {"value": "1,285", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "da061a14-e348-4850-abb5-f1e3472b96e4"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "ad0b61fc-c9e6-4bac-998c-471cde0d874c"}, "preparationType": {"id": "12"}}], "deathInformation": [{"causeOfDeathType": {"id": "6"}}], "taxonInformation": {"curatorialTaxon": {"id": "30"}, "customTaxonNames": [{"value": "Mono pardo, maneche pardo", "customTaxonNameType": {"id": "2"}}]}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "female"}, {"featureType": {"id": "18"}, "featureObservationText": "1038", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "130", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "21"}, "featureObservationText": "544", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}, {"featureType": {"id": "12"}, "featureObservationText": "2"}, {"featureType": {"id": "16"}, "featureObservationText": "2"}], "recordHistoryEvents": [{"date": {"dateText": "2007-05-24 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2015-03-09 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 14, "year": 1938, "month": 5, "interpretedTimestamp": "1938-05-14T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 14, "year": 1938, "month": 5, "interpretedTimestamp": "1938-05-13T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "23"}], "remarks": "Ur Gyldenstolpe \\"A Cont. to the ornth. of Northern Bolivia\\": Orion är belägen ca 35 km söder om Reyes längs vägen till San Borja.", "position": {"latitude": "-14.5277777777778", "longitude": "-67.1222222222222", "uncertaintyInMeters": 5000}, "localityI": "Mojos, Orión", "localityV": "Bolovia, Mojos, Orioy", "verticalPosition": {"minimumElevationInMeters": 196}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Mojos, Orión\\"."}}, "remarks": "Ur Gyldenstolpe \\"A Cont. to the ornth. of Northern Bolivia\\": Orion är belägen ca 35 km söder om Reyes längs vägen till San Borja.", "isDeathDate": true, "collectedByAgent": {"textI": "Olalla, AM"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Black Howler", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "14", "locationDistinct.latM": "31", "locationDistinct.latS": "40", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "S", "locationDistinct.longD": "14", "locationDistinct.longM": "31", "locationDistinct.longS": "40", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "S", "collection.oldRubinBones": "KR 1,MAND 1,MANIS 2*,PEDIS 2*; \\\\n*in skin", "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "30", "type": "taxon"}]}, "places": {"data": [{"id": "23", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "18", "type": "featureType"}, {"id": "23", "type": "featureType"}, {"id": "21", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}, {"id": "12", "type": "featureType"}, {"id": "16", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "11", "type": "physicalObject"}, {"id": "12", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "6", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Alouatta", "LopId": "16573", "Order": "Primates", "Family": "Atelidae", "Origin": null, "Det_Day": null, "FieldNo": "4640", "RegDate": "2007-05-24 00:00:00", "RubinID": "FÖ 983950001128", "RubinNo": "4352406", "Species": "caraya", "CardDate": null, "Coll_Day": "14", "Comments": "Manus och pedis in skin", "Det_Year": null, "Coll_Year": "1938", "Date_Type": "1", "Det_Month": null, "Signature": "[masked]", "CardAuthor": null, "Coll_Month": "5", "CommonName": "Black Howler", "DateRemark": null, "Expedition": null, "Subspecies": null, "WayOfDeath": "6", "AccessionNo": "620285", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2015-03-09 00:00:00", "OldLocalName": "Mono pardo, maneche pardo", "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Olalla, AM", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Bolovia, Mojos, Orioy", "FieldNo_related": {"LatD": "14", "LatM": "31", "LatS": "40", "Datum": null, "LongD": "67", "LongM": "7", "LongS": "20", "Lat_DD": "-14.5277777777778", "Lat_NS": "S", "Nation": "Bolivia", "FieldNo": "4640", "Long_DD": "-67.1222222222222", "Long_EW": "W", "RubinID": "JNMAJORI", "TillfID": null, "District": "Yacuma", "Locality": "Mojos, Orión", "Province": "Beni", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": "196", "LastModifiedBy": "[masked]", "Continent_Ocean": "South America", "LocationRemarks": "Ur Gyldenstolpe \\"A Cont. to the ornth. of Northern Bolivia\\": Orion är belägen ca 35 km söder om Reyes längs vägen till San Borja.", "LastModifiedDate": "2015-03-09 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": "5000", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "159", "GENUS": "Alouatta", "ORDER": "Primates", "FAMILY": "Atelidae", "RUBINNo": "4352406", "SPECIES": "caraya", "_sourceId": "1", "LATIN_NAME": "Alouatta caraya", "SUBSPECIES": null, "ENGLISH_NAME": "Black Howler", "SWEDISH_NAME": null}], "Scientific_Name": "Alouatta caraya", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": null, "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": {"ID": "6", "DödsorsakEN": "Collected", "DödsorsakSW": "Insamlad"}, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Female", "AgeStage": "Adult", "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "620285", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": "1038.0", "HindFootLength": "130.0", "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": "544.0", "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": "2", "Pedis": "2", "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": "1", "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": "1", "OldSkinNo": "1,285", "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "1", "AccessionNo": "620285", "Mounting_wall": null, "OldSkeletonNo": "1,285", "SkeletonStatus": "5", "SkinCollection": "9", "Old_Rubin_Bones": "KR 1,MAND 1,MANIS 2*,PEDIS 2*; \\\\n*in skin", "Skin_Skel_Remarks": null, "SkeletonCollection": "1", "SkinStatus_related": {"ID": "1", "Skinn": "Helt skinn finns (skinnlagt)", "Skin_Eng": "Skin complete, prepared"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "5", "Skelett": "Endast kranium; även om underkäke saknas", "Skel_Eng": "Cranium (mandible may be missing)"}, "SkinCollection_related": {"ID": "9", "Type": "Both", "Location_Eng": null, "NRM_Location": "Skinnrum kylda", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	199	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	9	specimenService	{"id": "9", "document": {"remarks": "Angående skinn, se A621441. Hör eventuellt till A621441. \\"Skinn finnes.\\" Endast skinn plus kranium enligt lappkat. (J. E.)\\nSkin not in cold skinroom (2015-02-26 M. Caspers)", "individual": {"identifiers": [{"value": "621445", "identifierType": {"id": "1"}}], "collectionItems": [{"physicalObject": {"lid": "28ff4fe9-8781-42bb-95b3-95a14ed60727"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "776e49a3-af35-407c-a59b-a061827d7a5c"}, "preparationType": {"id": "18"}}], "taxonInformation": {"curatorialTaxon": {"id": "33"}, "customTaxonNames": [{"value": "Gorilla beringeri", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2008-05-19 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-02-01 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 24, "year": 1921, "month": 3, "interpretedTimestamp": "1921-03-24T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 24, "year": 1921, "month": 3, "interpretedTimestamp": "1921-03-23T23:00:00.000Z"}}, "expeditionText": "Swedish Expedition to Central Africa 1920-21", "locationInformation": {"places": [{"id": "3"}], "position": {"latitude": "-1.50777777777778", "longitude": "29.4472222222222"}, "localityI": "Mount Karisimbi", "localityV": "N Ö sluttningen av Mt Karissimbi, Birunga volcanoes", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Mount Karisimbi\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Gyldenstolpe, Nils"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Eastern Gorilla", "objects.swedishName": "Gorilla", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "1", "locationDistinct.latM": "30", "locationDistinct.latS": "28", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "S", "locationDistinct.longD": "1", "locationDistinct.longM": "30", "locationDistinct.longS": "28", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "S", "collection.oldRubinBones": null, "collection.appearanceComments": "SKEL:KR 1,MAND 1", "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "33", "type": "taxon"}]}, "places": {"data": [{"id": "3", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "13", "type": "physicalObject"}, {"id": "14", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "18", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Gorilla", "LopId": "33587", "Order": "Primates", "Family": "Hominidae", "Origin": null, "Det_Day": null, "FieldNo": "5175", "RegDate": "2008-05-19 00:00:00", "RubinID": null, "RubinNo": "4500906", "Species": "beringei", "CardDate": null, "Coll_Day": "24", "Comments": "Angående skinn, se A621441. Hör eventuellt till A621441. \\"Skinn finnes.\\" Endast skinn plus kranium enligt lappkat. (J. E.)\\nSkin not in cold skinroom (2015-02-26 M. Caspers)", "Det_Year": null, "Coll_Year": "1921", "Date_Type": "1", "Det_Month": null, "Signature": "[masked]", "CardAuthor": "[masked]", "Coll_Month": "3", "CommonName": "Eastern Gorilla", "DateRemark": null, "Expedition": "Swedish Expedition to Central Africa 1920-21", "Subspecies": null, "WayOfDeath": null, "AccessionNo": "621445", "DeathRemark": null, "SwedishName": "Gorilla", "Field_Checks": null, "ModifiedDate": "2018-02-01 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Gyldenstolpe, Nils", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "N Ö sluttningen av Mt Karissimbi, Birunga volcanoes", "FieldNo_related": {"LatD": "1", "LatM": "30", "LatS": "28", "Datum": null, "LongD": "29", "LongM": "26", "LongS": "50", "Lat_DD": "-1.50777777777778", "Lat_NS": "S", "Nation": "Congo, The Democratic Republic of the", "FieldNo": "5175", "Long_DD": "29.4472222222222", "Long_EW": "E", "RubinID": null, "TillfID": null, "District": null, "Locality": "Mount Karisimbi", "Province": null, "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Africa", "LocationRemarks": null, "LastModifiedDate": "2015-06-22 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": null, "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "1791", "GENUS": "Gorilla", "ORDER": "Primates", "FAMILY": "Hominidae", "RUBINNo": "4500906", "SPECIES": "beringei", "_sourceId": "10", "LATIN_NAME": "Gorilla beringei", "SUBSPECIES": null, "ENGLISH_NAME": "Eastern Gorilla", "SWEDISH_NAME": null}], "Scientific_Name": "Gorilla beringei", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": null, "OldScientificName": "Gorilla beringeri", "Signature_related": null, "WayOfDeath_related": null, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Male", "AgeStage": "Adult", "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "621445", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": "1", "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": "1", "OldSkinNo": null, "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "?", "AccessionNo": "621445", "Mounting_wall": null, "OldSkeletonNo": null, "SkeletonStatus": "5", "SkinCollection": "15", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": "1", "SkinStatus_related": {"ID": "?", "Skinn": "Skall finnas, men materialet ej funnet", "Skin_Eng": "Skin missing, but should be here"}, "Appearance_Comments": "SKEL:KR 1,MAND 1", "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "5", "Skelett": "Endast kranium; även om underkäke saknas", "Skel_Eng": "Cranium (mandible may be missing)"}, "SkinCollection_related": {"ID": "15", "Type": "Both", "Location_Eng": "Unknown", "NRM_Location": "Okänd", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	200	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	10	specimenService	{"id": "10", "document": {"remarks": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 \\nPE:1 FE:2 TI:2 PEDIS:2", "individual": {"identifiers": [{"value": "628009", "identifierType": {"id": "1"}}, {"value": "9", "identifierType": {"id": "3"}}, {"value": "9", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "eec94365-4bba-497f-ad01-16962109667d"}, "preparationType": {"id": "1"}}, {"physicalObject": {"lid": "6f5a2354-ae42-42ff-a6c0-79acbc1a81a2"}, "preparationType": {"id": "12"}}], "deathInformation": [{"causeOfDeathType": {"id": "12"}}], "taxonInformation": {"curatorialTaxon": {"id": "17"}}, "originInformation": [{"originLocality": "Lärbo, Gotland", "establishmentMeansType": {"id": "1"}, "isResultOfSelectiveBreeding": "no"}], "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "juvenile"}, {"featureType": {"id": "18"}, "featureObservationText": "715", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "203", "featureObservationUnit": "unspecified"}], "recordHistoryEvents": [{"date": {"dateText": "2008-11-28 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2016-06-22 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 3, "year": 1960, "month": 4, "interpretedTimestamp": "1960-04-03T22:59:59.999Z"}, "remarks": "Till Skansen 28/3-1960", "dateType": "single", "startDate": {"day": 3, "year": 1960, "month": 4, "interpretedTimestamp": "1960-04-02T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "10"}], "position": {"latitude": "57.7902777777778", "longitude": "18.7922222222222", "uncertaintyInMeters": 5000}, "localityI": "Lärbro", "swedishGrid5km": "07J2f", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Lärbro\\"; Calculated midpoint from RT90 Index 5km \\"07J2f\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Skansen Zoological Park"}, "establishmentMeansType": {"id": "3"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": null, "objects.originStatus": "Zoo animal", "objects.publishCoord": null, "analysis.measComments": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 \\nPE:1 FE:2 TI:2 PEDIS:2", "locationDistinct.latD": "57", "locationDistinct.latM": "47", "locationDistinct.latS": "25", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "57", "locationDistinct.longM": "47", "locationDistinct.longS": "25", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "17", "type": "taxon"}]}, "places": {"data": [{"id": "10", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "18", "type": "featureType"}, {"id": "23", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "15", "type": "physicalObject"}, {"id": "16", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "1", "type": "preparationType"}, {"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "12", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "3", "type": "establishmentMeansType"}, {"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Pusa", "LopId": "48874", "Order": "Carnivora", "Family": "Phocidae", "Origin": "Wild caught", "Det_Day": null, "FieldNo": "6156", "RegDate": "2008-11-28 00:00:00", "RubinID": null, "RubinNo": "5700503", "Species": "hispida", "CardDate": null, "Coll_Day": "3", "Comments": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 \\nPE:1 FE:2 TI:2 PEDIS:2", "Det_Year": null, "Coll_Year": "1960", "Date_Type": "1", "Det_Month": null, "Signature": "[masked]", "CardAuthor": null, "Coll_Month": "4", "CommonName": null, "DateRemark": "Till Skansen 28/3-1960", "Expedition": null, "Subspecies": null, "WayOfDeath": "12", "AccessionNo": "628009", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2016-06-22 00:00:00", "OldLocalName": null, "OriginStatus": "Zoo animal", "Publish_Coord": "Y", "Collector(Leg)": "Skansen Zoological Park", "LastModifiedBy": "[masked]", "OriginLocality": "Lärbo, Gotland", "Publish_Record": "Y", "StatedLocality": null, "FieldNo_related": {"LatD": "57", "LatM": "47", "LatS": "25", "Datum": null, "LongD": "18", "LongM": "47", "LongS": "32", "Lat_DD": "57.7902777777778", "Lat_NS": "N", "Nation": "Sweden", "FieldNo": "6156", "Long_DD": "18.7922222222222", "Long_EW": "E", "RubinID": null, "TillfID": "601", "District": null, "Locality": "Lärbro", "Province": "Gotland", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2016-06-22 00:00:00", "SwedishCoordinate": "07J2f", "Locational_Accuracy": "5000", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "1684", "GENUS": "Pusa", "ORDER": "Carnivora", "FAMILY": "Phocidae", "RUBINNo": "5700503", "SPECIES": "hispida", "_sourceId": "9", "LATIN_NAME": "Pusa hispida", "SUBSPECIES": null, "ENGLISH_NAME": "Ringed Seal", "SWEDISH_NAME": "Vikare"}], "Scientific_Name": "Pusa hispida", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": null, "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": {"ID": "12", "DödsorsakEN": "Unknown", "DödsorsakSW": "Okänd"}, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": null, "AgeStage": "Juvenile", "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "628009", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 \\nPE:1 FE:2 TI:2 PEDIS:2", "CompleteLength": "715.0", "HindFootLength": "203.0", "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": "9", "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "1", "AccessionNo": "628009", "Mounting_wall": null, "OldSkeletonNo": "9", "SkeletonStatus": "1", "SkinCollection": "7", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": null, "SkinStatus_related": {"ID": "1", "Skinn": "Helt skinn finns (skinnlagt)", "Skin_Eng": "Skin complete, prepared"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "1", "Skelett": "Komplett omonterat skelett", "Skel_Eng": "Complete, unmounted skeleton"}, "SkinCollection_related": {"ID": "7", "Type": "Both", "Location_Eng": "Attic (chilled)", "NRM_Location": "Vindsrum kylda", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": null, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	201	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	11	specimenService	{"id": "11", "document": {"remarks": "Described as new subsp. Lonchoglossa wiedi aequatoris by Lönnberg, E. (Arkiv för Zoologi (KVA) 14:4 p 65-66). Now regarded as a synonym for Anoura caudifer.", "individual": {"identifiers": [{"value": "630096", "identifierType": {"id": "1"}}, {"value": "6", "identifierType": {"id": "2"}}], "determinations": [{"taxonNameI": "Anoura sp.", "determinedByAgent": {"textI": "Stanczak, Adam"}}], "collectionItems": [{"physicalObject": {"lid": "e23b1ae7-68bd-4793-a02f-9f8bd564b81b"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "220eea66-f050-4176-9188-51c3025bedf1"}, "preparationType": {"id": "13"}}], "taxonInformation": {"typeStatus": {"id": "2"}, "taxonRemarks": "Described as new subsp. Lonchoglossa wiedi aequatoris by Lönnberg, E. (Arkiv för Zoologi (KVA) 14:4 p 65-66). Now regarded as a synonym for Anoura caudifer.", "curatorialTaxon": {"id": "23"}, "customTaxonNames": [{"value": "Lonchoglossa wiedi aequatoris Lönnberg", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}], "recordHistoryEvents": [{"date": {"dateText": "1994-10-11 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2006-11-07 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2006-12-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 20, "year": 1913, "month": 4, "interpretedTimestamp": "1913-04-20T22:59:59.999Z"}, "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "25"}], "position": {"latitude": "0.10475", "longitude": "-78.75938"}, "localityI": "Gualea", "localityV": "Ecuador, Gualea, Ilambo.", "verticalPosition": {"maximumElevationInMeters": 1500, "minimumElevationInMeters": 1500}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Gualea\\"."}}, "isDeathDate": false, "collectedByAgent": {"textI": "Söderström, L"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Tailless Bat sp.", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "23", "type": "taxon"}]}, "places": {"data": [{"id": "25", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "17", "type": "physicalObject"}, {"id": "18", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "13", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": "Holotype", "Genus": "Anoura", "LopId": "17275", "Order": "Chiroptera", "Family": "Phyllostomidae", "Origin": null, "Det_Day": null, "FieldNo": "1550", "RegDate": "2006-11-07 00:00:00", "RubinID": null, "RubinNo": "3631800", "Species": "sp.", "CardDate": "1994-10-11 00:00:00", "Coll_Day": "20", "Comments": "Described as new subsp. Lonchoglossa wiedi aequatoris by Lönnberg, E. (Arkiv för Zoologi (KVA) 14:4 p 65-66). Now regarded as a synonym for Anoura caudifer.", "Det_Year": null, "Coll_Year": "1913", "Date_Type": null, "Det_Month": null, "Signature": "[masked]", "CardAuthor": "[masked]", "Coll_Month": "4", "CommonName": "Tailless Bat sp.", "DateRemark": null, "Expedition": null, "Subspecies": null, "WayOfDeath": null, "AccessionNo": "630096", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2006-12-06 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Söderström, L", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Ecuador, Gualea, Ilambo.", "FieldNo_related": {"LatD": null, "LatM": null, "LatS": null, "Datum": null, "LongD": null, "LongM": null, "LongS": null, "Lat_DD": "0.10475", "Lat_NS": null, "Nation": "Ecuador", "FieldNo": "1550", "Long_DD": "-78.75938", "Long_EW": null, "RubinID": null, "TillfID": null, "District": null, "Locality": "Gualea", "Province": "Pichincha", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": "1500", "Min_Elevation": "1500", "LastModifiedBy": null, "Continent_Ocean": "South America", "LocationRemarks": null, "LastModifiedDate": "2007-03-02 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": null, "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "1191", "GENUS": "Anoura", "ORDER": "Chiroptera", "FAMILY": "Phyllostomidae", "RUBINNo": "3631800", "SPECIES": "sp.", "_sourceId": "7", "LATIN_NAME": "Anoura sp.", "SUBSPECIES": null, "ENGLISH_NAME": "Tailless Bat sp.", "SWEDISH_NAME": null}], "Scientific_Name": "Anoura sp.", "TaxonomicRemarks": "Described as new subsp. Lonchoglossa wiedi aequatoris by Lönnberg, E. (Arkiv för Zoologi (KVA) 14:4 p 65-66). Now regarded as a synonym for Anoura caudifer.", "Date_Type_related": null, "DeterminedBy(DET)": "Stanczak, Adam", "OldScientificName": "Lonchoglossa wiedi aequatoris Lönnberg", "Signature_related": null, "WayOfDeath_related": null, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Male", "AgeStage": null, "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "630096", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": "1", "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": "1", "OldSkinNo": null, "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "2", "AccessionNo": "630096", "Mounting_wall": null, "OldSkeletonNo": "6", "SkeletonStatus": "5", "SkinCollection": "5", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": "5", "SkinStatus_related": {"ID": "2", "Skinn": "Hela skinnet monterat", "Skin_Eng": "Skin complete, mounted"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "5", "Skelett": "Endast kranium; även om underkäke saknas", "Skel_Eng": "Cranium (mandible may be missing)"}, "SkinCollection_related": {"ID": "5", "Type": "Both", "Location_Eng": null, "NRM_Location": "Omistliga samlingar", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": {"ID": "5", "Type": "Both", "Location_Eng": null, "NRM_Location": "Omistliga samlingar", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	202	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	12	specimenService	{"id": "12", "document": {"remarks": "Gonader unders av JE 11/12 80\\\\n\\"; Sampled for isotope analysis: Loan 2015-37", "individual": {"acquisition": {"handedInByAgent": {"textI": "Police Sollefteå"}}, "identifiers": [{"value": "805176", "identifierType": {"id": "1"}}, {"value": "5176", "identifierType": {"id": "3"}}, {"value": "5176", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "67a84488-0dc6-49e9-958d-38cbe2a13bd7"}, "preparationType": {"id": "2"}}, {"physicalObject": {"lid": "0f73cf3f-7e11-4653-b1db-728e67d4492a"}, "preparationType": {"id": "12"}}, {"physicalObject": {"lid": "7fe19763-c486-4e29-b7c5-9ddd7122d60f"}, "preparationType": {"id": "23"}}], "deathInformation": [{"remarks": "Killed by car", "causeOfDeathType": {"id": "10"}}], "taxonInformation": {"curatorialTaxon": {"id": "9"}}, "featureObservations": [{"featureType": {"id": "30"}, "featureObservationText": "16000", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "female"}, {"featureType": {"id": "18"}, "featureObservationText": "1090", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "22"}, "featureObservationText": "90", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "250", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "20"}, "featureObservationText": "210", "featureObservationUnit": "unspecified"}], "recordHistoryEvents": [{"date": {"dateText": "2007-05-24 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2015-10-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 30, "year": 1980, "month": 10, "interpretedTimestamp": "1980-10-30T22:59:59.999Z"}, "remarks": "Collected: During 1980; Date Arrived: 1980503", "dateType": "single", "startDate": {"day": 30, "year": 1980, "month": 10, "interpretedTimestamp": "1980-10-29T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "17"}], "position": {"latitude": "63.1666666666667", "longitude": "17.3830555555556", "uncertaintyInMeters": 3500}, "localityI": "Sollefteå, Multrå", "localityV": "Ångermanland,", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Sollefteå, Multrå\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Police"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "63", "locationDistinct.latM": "10", "locationDistinct.latS": "0", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "63", "locationDistinct.longM": "10", "locationDistinct.longS": "0", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 PE:1 FE:2 TI:2 PEDIS:2", "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Greybrownish with black spots on back, legs and stomach"}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "9", "type": "taxon"}]}, "places": {"data": [{"id": "17", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "30", "type": "featureType"}, {"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "18", "type": "featureType"}, {"id": "22", "type": "featureType"}, {"id": "23", "type": "featureType"}, {"id": "20", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "19", "type": "physicalObject"}, {"id": "20", "type": "physicalObject"}, {"id": "21", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "2", "type": "preparationType"}, {"id": "12", "type": "preparationType"}, {"id": "23", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "10", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Lynx", "LopId": "20272", "Order": "Carnivora", "Family": "Felidae", "Origin": null, "Det_Day": null, "FieldNo": "7007", "RegDate": "2007-05-24 00:00:00", "RubinID": "FÖ 982540004543", "RubinNo": "5520606", "Species": "lynx", "CardDate": null, "Coll_Day": "30", "Comments": "Gonader unders av JE 11/12 80\\\\n\\"; Sampled for isotope analysis: Loan 2015-37", "Det_Year": null, "Coll_Year": "1980", "Date_Type": "1", "Det_Month": null, "Signature": "[masked]", "CardAuthor": null, "Coll_Month": "10", "CommonName": null, "DateRemark": "Collected: During 1980; Date Arrived: 1980503", "Expedition": null, "Subspecies": null, "WayOfDeath": "10", "AccessionNo": "805176", "DeathRemark": "Killed by car", "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2015-10-06 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Police", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Ångermanland,", "FieldNo_related": {"LatD": "63", "LatM": "10", "LatS": "0", "Datum": null, "LongD": "17", "LongM": "22", "LongS": "59", "Lat_DD": "63.1666666666667", "Lat_NS": "N", "Nation": "Sweden", "FieldNo": "7007", "Long_DD": "17.3830555555556", "Long_EW": "E", "RubinID": null, "TillfID": "0", "District": null, "Locality": "Sollefteå, Multrå", "Province": "Ångermanland", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2015-02-13 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": "3500", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "489", "GENUS": "Lynx", "ORDER": "Carnivora", "FAMILY": "Felidae", "RUBINNo": "5520606", "SPECIES": "lynx", "_sourceId": "5", "LATIN_NAME": "Lynx lynx", "SUBSPECIES": null, "ENGLISH_NAME": "Eurasian Lynx", "SWEDISH_NAME": null}], "Scientific_Name": "Lynx lynx", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": null, "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": {"ID": "10", "DödsorsakEN": "Traffic", "DödsorsakSW": "Trafik"}, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Female", "AgeStage": "Adult", "Condition": null, "EarLength": "90.0", "BodyLength": null, "AccessionNo": "805176", "OtherWeight": "16000.0", "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": "1090.0", "HindFootLength": "250.0", "TailAnusLength": "210.0", "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": null, "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": "5176", "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": "Police Sollefteå", "SkinStatus": "1", "AccessionNo": "805176", "Mounting_wall": "L25", "OldSkeletonNo": "5176", "SkeletonStatus": "2", "SkinCollection": "23", "Old_Rubin_Bones": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 PE:1 FE:2 TI:2 PEDIS:2", "Skin_Skel_Remarks": "Greybrownish with black spots on back, legs and stomach", "SkeletonCollection": "1", "SkinStatus_related": {"ID": "1", "Skinn": "Helt skinn finns (skinnlagt)", "Skin_Eng": "Skin complete, prepared"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "2", "Skelett": "Komplett monterat skelett", "Skel_Eng": "Complete, mounted skeleton"}, "SkinCollection_related": {"ID": "23", "Type": "Skin", "Location_Eng": "Lynx room", "NRM_Location": "Lodjursrum, köl 1213", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": "MGG-sample", "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	203	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	13	specimenService	{"id": "13", "document": {"remarks": "Skin to other institution.\\nLänstyrelsens naturvårdsenhet har framfört önskemål om att djuret ska ingå i Naturrum, Ammarnäs.\\nJakttillstånd finns enligt uppgift.\\nPenisben finnes.\\nBiocidprov tagna.", "individual": {"acquisition": {"date": {"endDate": {"day": 26, "year": 1982, "month": 1, "interpretedTimestamp": "1982-01-26T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 26, "year": 1982, "month": 1, "interpretedTimestamp": "1982-01-25T23:00:00.000Z"}}, "handedInByAgent": {"textI": "Police Sorsele"}}, "identifiers": [{"value": "825005", "identifierType": {"id": "1"}}, {"value": "A825005", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "f0e88cd2-1cb8-4e4d-8708-74b0ec52bfbc"}, "preparationType": {"id": "4"}}, {"physicalObject": {"lid": "373c0bbb-0f2f-4ecd-b0c7-7af35dfda27f"}, "preparationType": {"id": "18"}}, {"physicalObject": {"lid": "6bd4d262-1ef5-4598-a16c-d406645078b9"}, "preparationType": {"id": "23"}}], "deathInformation": [{"causeOfDeathType": {"id": "8"}}], "taxonInformation": {"curatorialTaxon": {"id": "12"}}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "unknown"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "18"}, "featureObservationText": "95.5", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "22"}, "featureObservationText": "54", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "174", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "20"}, "featureObservationText": "220", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "26"}, "featureObservationText": "13.4", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}, {"featureType": {"id": "7"}, "featureObservationText": "6"}, {"featureType": {"id": "8"}, "featureObservationText": "2"}, {"featureType": {"id": "13"}, "featureObservationText": "1"}, {"featureType": {"id": "14"}, "featureObservationText": "0,5"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 26, "year": 1982, "month": 1, "interpretedTimestamp": "1982-01-26T22:59:59.999Z"}, "remarks": "Uppgiven dödsdag:820122, kl  0830.", "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "13"}], "position": {"latitude": "65.5449595633524", "longitude": "17.5939290872286", "uncertaintyInMeters": 3500}, "localityI": "Sorsele,Vitnjuln", "localityV": "Sorsele, Vitnjuln, Grans sameby.", "swedishGrid5km": "24H4g", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Sorsele,Vitnjuln\\"; Calculated midpoint from RT90 Index 5km \\"24H4g\\"."}}, "isDeathDate": false, "collectedByAgent": {"textI": "Norén, Eric"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Wolverine", "objects.swedishName": "Järv", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": "Mycket fint kranium"}, "publishRecord": true}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "12", "type": "taxon"}]}, "places": {"data": [{"id": "13", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "18", "type": "featureType"}, {"id": "22", "type": "featureType"}, {"id": "23", "type": "featureType"}, {"id": "20", "type": "featureType"}, {"id": "26", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}, {"id": "7", "type": "featureType"}, {"id": "8", "type": "featureType"}, {"id": "13", "type": "featureType"}, {"id": "14", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "22", "type": "physicalObject"}, {"id": "23", "type": "physicalObject"}, {"id": "24", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "4", "type": "preparationType"}, {"id": "18", "type": "preparationType"}, {"id": "23", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "8", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Gulo", "LopId": "20356", "Order": "Carnivora", "Family": "Mustelidae", "Origin": null, "Det_Day": null, "FieldNo": "3429", "RegDate": "2018-03-06 00:00:00", "RubinID": "FÖ 982540002931", "RubinNo": "5203003", "Species": "gulo", "CardDate": null, "Coll_Day": "26", "Comments": "Skin to other institution.\\nLänstyrelsens naturvårdsenhet har framfört önskemål om att djuret ska ingå i Naturrum, Ammarnäs.\\nJakttillstånd finns enligt uppgift.\\nPenisben finnes.\\nBiocidprov tagna.", "Det_Year": null, "Coll_Year": "1982", "Date_Type": "3", "Det_Month": null, "Signature": "[masked]", "CardAuthor": "[masked]", "Coll_Month": "1", "CommonName": "Wolverine", "DateRemark": "Uppgiven dödsdag:820122, kl  0830.", "Expedition": null, "Subspecies": null, "WayOfDeath": "8", "AccessionNo": "825005", "DeathRemark": null, "SwedishName": "Järv", "Field_Checks": "Storage", "ModifiedDate": "2018-03-06 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Norén, Eric", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Sorsele, Vitnjuln, Grans sameby.", "FieldNo_related": {"LatD": null, "LatM": null, "LatS": null, "Datum": null, "LongD": null, "LongM": null, "LongS": null, "Lat_DD": "65.5449595633524", "Lat_NS": null, "Nation": "Sweden", "FieldNo": "3429", "Long_DD": "17.5939290872286", "Long_EW": null, "RubinID": "GF09610", "TillfID": null, "District": null, "Locality": "Sorsele,Vitnjuln", "Province": "Lycksele Lappmark", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2007-05-30 00:00:00", "SwedishCoordinate": "24H4g", "Locational_Accuracy": "3500", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "371", "GENUS": "Gulo", "ORDER": "Carnivora", "FAMILY": "Mustelidae", "RUBINNo": "5203003", "SPECIES": "gulo", "_sourceId": "4", "LATIN_NAME": "Gulo gulo", "SUBSPECIES": null, "ENGLISH_NAME": "Wolverine", "SWEDISH_NAME": "Järv"}], "Scientific_Name": "Gulo gulo", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "3", "Date_Type": "Arrived"}, "DeterminedBy(DET)": null, "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": {"ID": "8", "DödsorsakEN": "Hunt, shot", "DödsorsakSW": "Jakt, skjuten"}, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Male", "AgeStage": "Unknown", "Condition": null, "EarLength": "54.0", "BodyLength": null, "AccessionNo": "825005", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": "95.5", "HindFootLength": "174.0", "TailAnusLength": "220.0", "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": "13.4", "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": "0,5", "Manus": null, "Pedis": null, "Tibia": null, "Costae": "6", "DNAbox": null, "LoanNo": null, "Pelvis": "1", "Radius": null, "Cranium": "1", "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": "2", "Bacculum": null, "Mandibula": "1", "OldSkinNo": null, "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": "Police Sorsele", "SkinStatus": "6", "AccessionNo": "825005", "Mounting_wall": null, "OldSkeletonNo": "A825005", "SkeletonStatus": "4", "SkinCollection": "22", "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": "1", "SkinStatus_related": {"ID": "6", "Skinn": "Skinn till annan institution", "Skin_Eng": "Skin at another institution"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "4", "Skelett": "Partiellt skelett + kranium", "Skel_Eng": "Partial skeleton with cranium"}, "SkinCollection_related": {"ID": "22", "Type": "Both", "Location_Eng": "Other Institution", "NRM_Location": "Annan Institution", "Old_Location_Rubin_code": "X", "Old_Location_Rubin_text": "Utlånad"}, "OtherMaterialCollection": null, "Suitable_for_exhibition": "Mycket fint kranium", "OtherMaterialInCollection": "MGG-sample", "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	204	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	14	specimenService	{"id": "14", "document": {"remarks": "Kranie finns på Grimsö med nummer B215-93", "individual": {"identifiers": [{"value": "956051", "identifierType": {"id": "1"}}], "determinations": [{"date": {"endDate": {"day": 2, "year": 1994, "month": 2, "interpretedTimestamp": "1994-02-02T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 2, "year": 1994, "month": 2, "interpretedTimestamp": "1994-02-01T23:00:00.000Z"}}, "taxonNameI": "Capreolus capreolus", "determinedByAgent": {"textI": "Mortensen, Peter"}}], "collectionItems": [{"physicalObject": {"lid": "79547a5d-d0d4-47c3-b179-627bf6deee92"}, "preparationType": {"id": "6"}}], "deathInformation": [{"causeOfDeathType": {"id": "8"}}], "taxonInformation": {"curatorialTaxon": {"id": "5"}}, "featureObservations": [{"featureType": {"id": "30"}, "featureObservationText": "9333", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "1"}, "featureObservationText": "juvenile"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "3"}, "featureObservationText": "fresh"}], "recordHistoryEvents": [{"date": {"dateText": "2018-04-20 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-04-20 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 2, "year": 1994, "month": 2, "interpretedTimestamp": "1994-02-02T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 2, "year": 1994, "month": 2, "interpretedTimestamp": "1994-02-01T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "16"}], "position": {"latitude": "59.4194444444444", "longitude": "18.1683333333333"}, "localityI": "Bogesund, Röskär", "localityV": "Bogesund, Rödskär", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Bogesund, Röskär\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Mortensen, Peter"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "59", "locationDistinct.latM": "25", "locationDistinct.latS": "10", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "59", "locationDistinct.longM": "25", "locationDistinct.longS": "10", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Skin discarded from collection"}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "5", "type": "taxon"}]}, "places": {"data": [{"id": "16", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "30", "type": "featureType"}, {"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "3", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "25", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "6", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "8", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Capreolus", "LopId": "55130", "Order": "Artiodactyla", "Family": "Cervidae", "Origin": null, "Det_Day": "2", "FieldNo": "5501", "RegDate": "2018-04-20 00:00:00", "RubinID": null, "RubinNo": "7803903", "Species": "capreolus", "CardDate": null, "Coll_Day": "2", "Comments": "Kranie finns på Grimsö med nummer B215-93", "Det_Year": "1994", "Coll_Year": "1994", "Date_Type": "1", "Det_Month": "2", "Signature": "[masked]", "CardAuthor": null, "Coll_Month": "2", "CommonName": null, "DateRemark": null, "Expedition": null, "Subspecies": null, "WayOfDeath": "8", "AccessionNo": "956051", "DeathRemark": null, "SwedishName": null, "Field_Checks": null, "ModifiedDate": "2018-04-20 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Mortensen, Peter", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Bogesund, Rödskär", "FieldNo_related": {"LatD": "59", "LatM": "25", "LatS": "10", "Datum": null, "LongD": "18", "LongM": "10", "LongS": "6", "Lat_DD": "59.4194444444444", "Lat_NS": "N", "Nation": "Sweden", "FieldNo": "5501", "Long_DD": "18.1683333333333", "Long_EW": "E", "RubinID": null, "TillfID": null, "District": null, "Locality": "Bogesund, Röskär", "Province": "Uppland", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2018-04-20 00:00:00", "SwedishCoordinate": null, "Locational_Accuracy": null, "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "672", "GENUS": "Capreolus", "ORDER": "Artiodactyla", "FAMILY": "Cervidae", "RUBINNo": "7803903", "SPECIES": "capreolus", "_sourceId": "6", "LATIN_NAME": "Capreolus capreolus", "SUBSPECIES": null, "ENGLISH_NAME": "Western Roe Deer", "SWEDISH_NAME": null}], "Scientific_Name": "Capreolus capreolus", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": "Mortensen, Peter", "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": {"ID": "8", "DödsorsakEN": "Hunt, shot", "DödsorsakSW": "Jakt, skjuten"}, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Male", "AgeStage": "Juvenile", "Condition": "1", "EarLength": null, "BodyLength": null, "AccessionNo": "956051", "OtherWeight": "9333.0", "TypeOfWeight": "4", "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": {"ID": "1", "Kondition": "Färsk", "Kondition_english": "Fresh"}, "CompleteBodyWeight": null, "TypeOfWeight_related": {"ID": "4", "Viktslag": "Viktslag okänd", "Vikt_english": "Unknown"}}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": null, "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": null, "OldSkinNo": null, "SVAnumber": null, "Vertebrae": null, "Deposition": null, "HandedInBy": null, "SkinStatus": "D", "AccessionNo": "956051", "Mounting_wall": null, "OldSkeletonNo": null, "SkeletonStatus": "9", "SkinCollection": null, "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": "1", "SkinStatus_related": {"ID": "D", "Skinn": "Skinn kasserades", "Skin_Eng": "Skin discarded from collection"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "9", "Skelett": "Övrigt, enstaka ben t.ex enbart underkäke", "Skel_Eng": "Some bones (>30%)"}, "SkinCollection_related": null, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	205	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	15	specimenService	{"id": "15", "document": {"individual": {"acquisition": {"handedInByAgent": {"textI": "Swedish Veterinary Association"}}, "identifiers": [{"value": "985093", "identifierType": {"id": "1"}}, {"value": "V0253/98", "identifierType": {"id": "5"}}], "determinations": [{"date": {"endDate": {"day": 26, "year": 1998, "month": 3, "interpretedTimestamp": "1998-03-26T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 26, "year": 1998, "month": 3, "interpretedTimestamp": "1998-03-25T23:00:00.000Z"}}, "taxonNameI": "Lynx lynx", "determinedByAgent": {"textI": "Cederholm, Ingrid"}}], "collectionItems": [{"physicalObject": {"lid": "6cb9d6ca-5baf-4768-be7e-a6f4e89d2eb6"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "8ae89103-2e54-4ebe-9f81-e31c48c35cee"}, "preparationType": {"id": "23"}}], "deathInformation": [{"remarks": "skyddsjakt", "causeOfDeathType": {"id": "7"}}], "taxonInformation": {"curatorialTaxon": {"id": "9"}}, "featureObservations": [{"methodText": "sectioned-teeth", "featureType": {"id": "2"}, "featureObservationText": "2"}, {"methodText": "sectioned-teeth", "featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "26"}, "featureObservationText": "13000", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "4"}, "featureObservationText": "x"}, {"featureType": {"id": "5"}, "featureObservationText": "x"}], "recordHistoryEvents": [{"date": {"dateText": "2018-02-13 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-02-13 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 23, "year": 1998, "month": 3, "interpretedTimestamp": "1998-03-23T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 23, "year": 1998, "month": 3, "interpretedTimestamp": "1998-03-22T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "11"}], "position": {"latitude": "63.5103892673661", "longitude": "13.045476444517", "uncertaintyInMeters": 3500}, "localityI": "Åre, Husåberget", "localityV": "Husåberget", "swedishGrid5km": "19D9c", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Åre, Husåberget\\"; Calculated midpoint from RT90 Index 5km \\"19D9c\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Löding, Tomas Olof"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": "Lo", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Kan vara förväxlat med 98/5647\\n\\nSkin not added to collection"}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "9", "type": "taxon"}]}, "places": {"data": [{"id": "11", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "2", "type": "featureType"}, {"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "26", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "5", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "26", "type": "physicalObject"}, {"id": "27", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "23", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "7", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Lynx", "LopId": "54913", "Order": "Carnivora", "Family": "Felidae", "Origin": null, "Det_Day": "26", "FieldNo": "7308", "RegDate": "2018-02-13 00:00:00", "RubinID": null, "RubinNo": "5520606", "Species": "lynx", "CardDate": null, "Coll_Day": "23", "Comments": null, "Det_Year": "1998", "Coll_Year": "1998", "Date_Type": "1", "Det_Month": "3", "Signature": "[masked]", "CardAuthor": null, "Coll_Month": "3", "CommonName": null, "DateRemark": null, "Expedition": null, "Subspecies": null, "WayOfDeath": "7", "AccessionNo": "985093", "DeathRemark": "skyddsjakt", "SwedishName": "Lo", "Field_Checks": null, "ModifiedDate": "2018-02-13 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Löding, Tomas Olof", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Husåberget", "FieldNo_related": {"LatD": null, "LatM": null, "LatS": null, "Datum": null, "LongD": null, "LongM": null, "LongS": null, "Lat_DD": "63.5103892673661", "Lat_NS": null, "Nation": "Sweden", "FieldNo": "7308", "Long_DD": "13.045476444517", "Long_EW": null, "RubinID": null, "TillfID": "0", "District": null, "Locality": "Åre, Husåberget", "Province": "Jämtland", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2018-02-13 00:00:00", "SwedishCoordinate": "19D9c", "Locational_Accuracy": "3500", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "489", "GENUS": "Lynx", "ORDER": "Carnivora", "FAMILY": "Felidae", "RUBINNo": "5520606", "SPECIES": "lynx", "_sourceId": "5", "LATIN_NAME": "Lynx lynx", "SUBSPECIES": null, "ENGLISH_NAME": "Eurasian Lynx", "SWEDISH_NAME": null}], "Scientific_Name": "Lynx lynx", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "1", "Date_Type": "Death"}, "DeterminedBy(DET)": "Cederholm, Ingrid", "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": {"ID": "7", "DödsorsakEN": "Hunt, trap", "DödsorsakSW": "Jakt, fälla"}, "LastModifiedBy_related": null}, "Analysis": {"Age": "2", "Sex": "Male", "AgeStage": "Adult", "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "985093", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": "Sectioned teeth", "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": "13000.0", "TypeOfWeight_related": null}, "Collection": {"Ulna": null, "Femur": null, "Manus": null, "Pedis": null, "Tibia": null, "Costae": null, "DNAbox": null, "LoanNo": null, "Pelvis": null, "Radius": null, "Cranium": "x", "DNArack": null, "Ethanol": null, "Humerus": null, "Scapula": null, "Bacculum": null, "Mandibula": "x", "OldSkinNo": null, "SVAnumber": "V0253/98", "Vertebrae": null, "Deposition": null, "HandedInBy": "Swedish Veterinary Association", "SkinStatus": "0", "AccessionNo": "985093", "Mounting_wall": null, "OldSkeletonNo": null, "SkeletonStatus": "5", "SkinCollection": null, "Old_Rubin_Bones": null, "Skin_Skel_Remarks": "Kan vara förväxlat med 98/5647", "SkeletonCollection": "1", "SkinStatus_related": {"ID": "0", "Skinn": "Skinn saknas", "Skin_Eng": "Skin missing"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "5", "Skelett": "Endast kranium; även om underkäke saknas", "Skel_Eng": "Cranium (mandible may be missing)"}, "SkinCollection_related": null, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": "Biocidprover", "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
2019-03-06 16:16:33.867+00	\N	\N	\N	206	\N	\N	2019-03-06 16:16:33.867+00	create	t	\N	specimen	16	specimenService	{"id": "16", "document": {"remarks": "00-0k0-925F", "individual": {"acquisition": {"handedInByAgent": {"textI": "SVA"}}, "identifiers": [{"value": "985729", "identifierType": {"id": "1"}}, {"value": "V0615/98", "identifierType": {"id": "5"}}], "determinations": [{"date": {"endDate": {"day": 17, "year": 1998, "month": 9, "interpretedTimestamp": "1998-09-17T21:59:59.999Z"}, "dateType": "single", "startDate": {"day": 17, "year": 1998, "month": 9, "interpretedTimestamp": "1998-09-16T22:00:00.000Z"}}, "taxonNameI": "Gulo gulo", "determinedByAgent": {"textI": "Hansson, Anders"}}], "collectionItems": [{"physicalObject": {"lid": "b446d1dd-7a7b-4394-a2bb-666e030b4c8b"}, "preparationType": {"id": "1"}}], "deathInformation": [{"remarks": "Såret efter sändare rupterat.", "causeOfDeathType": {"id": "11"}}], "taxonInformation": {"curatorialTaxon": {"id": "12"}}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "female"}, {"featureType": {"id": "26"}, "featureObservationText": "10.88", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}, {"featureType": {"id": "6"}, "featureObservationText": "x"}, {"featureType": {"id": "7"}, "featureObservationText": "x"}, {"featureType": {"id": "8"}, "featureObservationText": "2"}, {"featureType": {"id": "9"}, "featureObservationText": "2"}, {"featureType": {"id": "10"}, "featureObservationText": "2"}, {"featureType": {"id": "11"}, "featureObservationText": "2"}, {"featureType": {"id": "12"}, "featureObservationText": "2"}, {"featureType": {"id": "13"}, "featureObservationText": "1"}, {"featureType": {"id": "14"}, "featureObservationText": "2"}, {"featureType": {"id": "15"}, "featureObservationText": "2"}, {"featureType": {"id": "16"}, "featureObservationText": "2"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 20, "year": 1998, "month": 6, "interpretedTimestamp": "1998-06-20T21:59:59.999Z"}, "dateType": "single", "startDate": {"day": 20, "year": 1998, "month": 6, "interpretedTimestamp": "1998-06-19T22:00:00.000Z"}}, "locationInformation": {"places": [{"id": "12"}], "position": {"latitude": "67.3390847189902", "longitude": "17.6105518879438", "uncertaintyInMeters": 3500}, "localityI": "Sareks nationalpark", "localityV": "Lu., Sareks nationalpark", "swedishGrid5km": "27H6g", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Sareks nationalpark\\"; Calculated midpoint from RT90 Index 5km \\"27H6g\\"."}}, "isDeathDate": false, "collectedByAgent": {"textI": "Police - Jokkmokk"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Wolverine", "objects.swedishName": "Järv", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Skin not added to collection"}, "createdAt": "2019-03-06T16:16:33.836Z", "updatedAt": "2019-03-06T16:16:33.836Z", "relationships": {"taxa": {"data": [{"id": "12", "type": "taxon"}]}, "places": {"data": [{"id": "12", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "26", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}, {"id": "6", "type": "featureType"}, {"id": "7", "type": "featureType"}, {"id": "8", "type": "featureType"}, {"id": "9", "type": "featureType"}, {"id": "10", "type": "featureType"}, {"id": "11", "type": "featureType"}, {"id": "12", "type": "featureType"}, {"id": "13", "type": "featureType"}, {"id": "14", "type": "featureType"}, {"id": "15", "type": "featureType"}, {"id": "16", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "5", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "28", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "1", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "11", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}, "schemaCompliant": true}	{"Objects": {"Type": null, "Genus": "Gulo", "LopId": "51425", "Order": "Carnivora", "Family": "Mustelidae", "Origin": null, "Det_Day": "17", "FieldNo": "3376", "RegDate": "2018-03-06 00:00:00", "RubinID": null, "RubinNo": "5203003", "Species": "gulo", "CardDate": null, "Coll_Day": "20", "Comments": "00-0k0-925F", "Det_Year": "1998", "Coll_Year": "1998", "Date_Type": "2", "Det_Month": "9", "Signature": "[masked]", "CardAuthor": "[masked]", "Coll_Month": "6", "CommonName": "Wolverine", "DateRemark": null, "Expedition": null, "Subspecies": null, "WayOfDeath": "11", "AccessionNo": "985729", "DeathRemark": "Såret efter sändare rupterat.", "SwedishName": "Järv", "Field_Checks": null, "ModifiedDate": "2018-03-06 00:00:00", "OldLocalName": null, "OriginStatus": null, "Publish_Coord": "Y", "Collector(Leg)": "Police - Jokkmokk", "LastModifiedBy": "[masked]", "OriginLocality": null, "Publish_Record": "Y", "StatedLocality": "Lu., Sareks nationalpark", "FieldNo_related": {"LatD": null, "LatM": null, "LatS": null, "Datum": null, "LongD": null, "LongM": null, "LongS": null, "Lat_DD": "67.3390847189902", "Lat_NS": null, "Nation": "Sweden", "FieldNo": "3376", "Long_DD": "17.6105518879438", "Long_EW": null, "RubinID": "SL003241", "TillfID": null, "District": null, "Locality": "Sareks nationalpark", "Province": "Lule Lappmark", "Max_Depth": null, "Min_Depth": null, "Max_Elevation": null, "Min_Elevation": null, "LastModifiedBy": "[masked]", "Continent_Ocean": "Europe", "LocationRemarks": null, "LastModifiedDate": "2007-05-30 00:00:00", "SwedishCoordinate": "27H6g", "Locational_Accuracy": "3500", "Georeferencing_method": null, "LastModifiedBy_related": null}, "RubinNo_related": [{"ID": "371", "GENUS": "Gulo", "ORDER": "Carnivora", "FAMILY": "Mustelidae", "RUBINNo": "5203003", "SPECIES": "gulo", "_sourceId": "4", "LATIN_NAME": "Gulo gulo", "SUBSPECIES": null, "ENGLISH_NAME": "Wolverine", "SWEDISH_NAME": "Järv"}], "Scientific_Name": "Gulo gulo", "TaxonomicRemarks": null, "Date_Type_related": {"ID": "2", "Date_Type": "Found"}, "DeterminedBy(DET)": "Hansson, Anders", "OldScientificName": null, "Signature_related": null, "WayOfDeath_related": {"ID": "11", "DödsorsakEN": "Other", "DödsorsakSW": "Annan"}, "LastModifiedBy_related": null}, "Analysis": {"Age": null, "Sex": "Female", "AgeStage": "Adult", "Condition": null, "EarLength": null, "BodyLength": null, "AccessionNo": "985729", "OtherWeight": null, "TypeOfWeight": null, "Meas_Comments": null, "CompleteLength": null, "HindFootLength": null, "TailAnusLength": null, "AgeDetermination": null, "TailPelvisLength": null, "Condition_related": null, "CompleteBodyWeight": "10.88", "TypeOfWeight_related": null}, "Collection": {"Ulna": "2", "Femur": "2", "Manus": "2", "Pedis": "2", "Tibia": "2", "Costae": "x", "DNAbox": null, "LoanNo": null, "Pelvis": "1", "Radius": "2", "Cranium": "1", "DNArack": null, "Ethanol": null, "Humerus": "2", "Scapula": "2", "Bacculum": null, "Mandibula": "1", "OldSkinNo": null, "SVAnumber": "V0615/98", "Vertebrae": "x", "Deposition": null, "HandedInBy": "SVA", "SkinStatus": "0", "AccessionNo": "985729", "Mounting_wall": null, "OldSkeletonNo": null, "SkeletonStatus": "1", "SkinCollection": null, "Old_Rubin_Bones": null, "Skin_Skel_Remarks": null, "SkeletonCollection": "1", "SkinStatus_related": {"ID": "0", "Skinn": "Skinn saknas", "Skin_Eng": "Skin missing"}, "Appearance_Comments": null, "OtherInstitutionNumber": null, "SkeletonStatus_related": {"ID": "1", "Skelett": "Komplett omonterat skelett", "Skel_Eng": "Complete, unmounted skeleton"}, "SkinCollection_related": null, "OtherMaterialCollection": null, "Suitable_for_exhibition": null, "OtherMaterialInCollection": null, "SkeletonCollection_related": {"ID": "1", "Type": "Skeleton", "Location_Eng": "Bone Room", "NRM_Location": "Bensalen", "Old_Location_Rubin_code": null, "Old_Location_Rubin_text": null}, "OtherMaterialCollection_related": null}}	2019-03-06 16:16:33.836+00	\N	\N	2019-03-06 16:16:33.836+00	\N	\N
\.


--
-- Data for Name: specimens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.specimens ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Donation från Lärarhögskolan, Stockholm, # 00062B7476 (Skuldra)\\nUtlånad, lån 2012-21 (Dnr 52-78/2012)", "individual": {"acquisition": {"date": {"endDate": {"year": 2010, "interpretedTimestamp": "2010-12-31T22:59:59.999Z"}, "dateType": "single", "startDate": {"year": 2010, "interpretedTimestamp": "2009-12-31T23:00:00.000Z"}}, "handedInByAgent": {"textI": "Lärarhögskolan, Stockholm"}}, "identifiers": [{"value": "500001", "identifierType": {"id": "1"}}, {"value": "2012-21", "identifierType": {"id": "6"}}], "determinations": [{"date": {"endDate": {"day": 8, "year": 2010, "month": 6, "interpretedTimestamp": "2010-06-08T21:59:59.999Z"}, "dateType": "single", "startDate": {"day": 8, "year": 2010, "month": 6, "interpretedTimestamp": "2010-06-07T22:00:00.000Z"}}, "taxonNameI": "Mustela erminea", "determinedByAgent": {"textI": "Mortensen, Peter"}}], "collectionItems": [{"physicalObject": {"lid": "7c17a51d-4270-4f4a-a094-6eff774b91d7"}, "preparationType": {"id": "13"}}], "taxonInformation": {"curatorialTaxon": {"id": "14"}, "customTaxonNames": [{"value": "Mustela erminea", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"methodText": "other", "featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "female"}], "recordHistoryEvents": [{"date": {"dateText": "2010-06-08 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2015-09-09 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"year": 2010, "interpretedTimestamp": "2010-12-31T22:59:59.999Z"}, "remarks": "Collected: Before 2010", "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "19"}], "position": {}, "localityI": "No information", "verticalPosition": {}}}, "isDeathDate": false, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Ermine", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Vinterdräkt"}	1	{"taxa": {"data": [{"id": "14", "type": "taxon"}]}, "places": {"data": [{"id": "19", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "6", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "1", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "13", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Quensels donationsbok:\\nÅr 1784 Sparrman Prof. et. Mus pumilio från Södra Africa.\\nHornstedts katalog 1788: Mus Pumilio: Sparm. ˢɤ  v\\nQuensels Catalog 1803\\nMus. 3 Pumilio - 131 Acta Holm. A:o 1784 p. 233 tab.6. Ipssis. / C.b.sp.// 1. / Sparrm.\\nMina kommentarer (Erik Åhlander)\\nTwo labels similar to Leufsta labels, but probably both written by Sparrman. \\nType locality in Wilson and reeder doesn't agree with my coordinates.", "individual": {"identifiers": [{"value": "530183", "identifierType": {"id": "1"}}, {"value": "925", "identifierType": {"id": "3"}}, {"value": "925", "identifierType": {"id": "2"}}], "determinations": [{"taxonNameI": "Rhabdomys pumilio", "determinedByAgent": {"textI": "Sparrman, Andreas"}}], "collectionItems": [{"physicalObject": {"lid": "084fcb4f-40b1-4354-a2d0-fc0d24872e18"}, "preparationType": {"id": "19"}}], "taxonInformation": {"typeStatus": {"id": "2"}, "curatorialTaxon": {"id": "39"}, "customTaxonNames": [{"value": "Mus pumilio", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "unknown"}], "recordHistoryEvents": [{"date": {"dateText": "2016-09-26 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2016-09-26 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"year": 1784, "interpretedTimestamp": "1784-12-31T22:47:47.999Z"}, "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "5"}], "remarks": "S of Humansdorp, Slangriver area", "position": {}, "localityI": "Humansdorp", "localityV": "S of Humansdorp, Slangriver area; Ö om Goda Hoppsudde", "verticalPosition": {}}}, "remarks": "S of Humansdorp, Slangriver area", "isDeathDate": false, "collectedByAgent": {"textI": "Sparrman, Andreas"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Xeric Four-striped Grass Rat", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}	2	{"taxa": {"data": [{"id": "39", "type": "taxon"}]}, "places": {"data": [{"id": "5", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "2", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "19", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"individual": {"identifiers": [{"value": "534406", "identifierType": {"id": "1"}}, {"value": "1; 4406; 52", "identifierType": {"id": "3"}}, {"value": "1; 4406", "identifierType": {"id": "2"}}], "determinations": [{"taxonNameI": "Myotis mystacinus", "determinedByAgent": {"textI": "Baagoe, H J"}}], "collectionItems": [{"physicalObject": {"lid": "8bc9d3aa-3dd2-49c6-8212-5de1896cb92d"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "8d7fdd53-6959-484c-b0f9-5345ecd37c3b"}, "preparationType": {"id": "12"}}], "taxonInformation": {"curatorialTaxon": {"id": "26"}, "customTaxonNames": [{"value": "Myotis mystacinus Kuhl sensu stricto", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "19"}, "featureObservationText": "46", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "22"}, "featureObservationText": "15", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "6", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "20"}, "featureObservationText": "40", "featureObservationUnit": "unspecified"}], "recordHistoryEvents": [{"date": {"dateText": "1995-06-22 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2006-11-14 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2006-12-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 23, "year": 1949, "month": 5, "interpretedTimestamp": "1949-05-23T22:59:59.999Z"}, "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "8"}], "position": {"latitude": "47.77", "longitude": "9"}, "localityI": "Bodensee, Möggingen", "localityV": "Tyskland, Möggingen Radolfzell, Bodensee", "verticalPosition": {"maximumElevationInMeters": 420, "minimumElevationInMeters": 420}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Bodensee, Möggingen\\"."}}, "isDeathDate": false, "collectedByAgent": {"textI": "Heinrich, G"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Whiskered Bat", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}	3	{"taxa": {"data": [{"id": "26", "type": "taxon"}]}, "places": {"data": [{"id": "8", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}, {"id": "19", "type": "featureType"}, {"id": "22", "type": "featureType"}, {"id": "23", "type": "featureType"}, {"id": "20", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "3", "type": "physicalObject"}, {"id": "4", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"individual": {"identifiers": [{"value": "583124", "identifierType": {"id": "1"}}, {"value": "Bly 45, 1008, 3124", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "42d754cd-474d-443e-b6bc-9b079a052c85"}, "preparationType": {"id": "5"}}], "deathInformation": [{"remarks": "Skadeskjuten, sedan självdöd"}], "taxonInformation": {"curatorialTaxon": {"id": "20"}}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "adult"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2007-05-24 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2016-01-07 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"remarks": "Hösten/vintern 1929-30"}, "locationInformation": {"places": [{"id": "15"}], "remarks": "C:a 15 km N. Norra Bergnäs", "position": {"latitude": "66.5233883066444", "longitude": "18.2263048109662", "uncertaintyInMeters": 7000}, "localityI": "Vuollak", "localityV": "Vuollak 1.5 mil Norr om N. Bergnäs i Pite älvdal", "swedishGrid5km": "26I6b", "verticalPosition": {"minimumDepthInMeters": 2}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Vuollak\\"; Calculated midpoint from RT90 Index 5km \\"26I6b\\"."}}, "remarks": "C:a 15 km N. Norra Bergnäs", "isDeathDate": false, "collectedByAgent": {"textI": "Bergman"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Brown Bear", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}	4	{"taxa": {"data": [{"id": "20", "type": "taxon"}]}, "places": {"data": [{"id": "15", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "5", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Sampled for isotope analysis: Loan 2015-37", "individual": {"identifiers": [{"value": "585522", "identifierType": {"id": "1"}}], "determinations": [{"taxonNameI": "Lynx lynx", "determinedByAgent": {"textI": "Bergström, Ulf"}}], "collectionItems": [{"physicalObject": {"lid": "6e8b376b-8a3a-4d60-81ba-67e744c0011b"}, "preparationType": {"id": "12"}}], "deathInformation": [{"causeOfDeathType": {"id": "6"}}], "taxonInformation": {"curatorialTaxon": {"id": "9"}, "customTaxonNames": [{"value": "Lynx lynx", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "female"}], "recordHistoryEvents": [{"date": {"dateText": "2015-03-04 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2015-10-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 15, "year": 1941, "month": 4, "interpretedTimestamp": "1941-04-15T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 15, "year": 1941, "month": 4, "interpretedTimestamp": "1941-04-14T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "14"}], "position": {"latitude": "66.0111111111111", "longitude": "17.5841666666667", "uncertaintyInMeters": 5000}, "localityI": "Arjeplog, V. Uddjaur", "localityV": "Sjön Uddjaure, V. Uddjaure", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Arjeplog, V. Uddjaur\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Hollander, R."}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "66", "locationDistinct.latM": "0", "locationDistinct.latS": "40", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "66", "locationDistinct.longM": "0", "locationDistinct.longS": "40", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}	5	{"taxa": {"data": [{"id": "9", "type": "taxon"}]}, "places": {"data": [{"id": "14", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "6", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "6", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Troligtvis samma individ som 929106 (urogenitalsystem i sprit) denna post är struken.  fyndet beskrivet i Fauna och flora 26:1931 269-272. Mått och vikt från texten längdmåttet är konturlängd 107cm svansen 23cm, drygt 24 kg oflått\\nLokalen ändrad från Knivsta s:n till Vallby skogen/PMN", "individual": {"identifiers": [{"value": "587520", "identifierType": {"id": "1"}}, {"value": "20", "identifierType": {"id": "3"}}, {"value": "20", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "165bfe47-6a97-47eb-93a3-9a82701a0662"}, "preparationType": {"id": "4"}}, {"physicalObject": {"lid": "19f6b3a6-f844-4056-86ea-e9b38d33c1cf"}, "preparationType": {"id": "12"}}, {"physicalObject": {"lid": "6e856b0f-99fb-4e93-9c46-1727728a6939"}, "preparationType": {"id": "23"}}], "deathInformation": [{"causeOfDeathType": {"id": "8"}}], "taxonInformation": {"curatorialTaxon": {"id": "12"}}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "unknown"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}, {"featureType": {"id": "6"}, "featureObservationText": "x"}, {"featureType": {"id": "7"}, "featureObservationText": "x"}, {"featureType": {"id": "8"}, "featureObservationText": "2"}, {"featureType": {"id": "9"}, "featureObservationText": "2"}, {"featureType": {"id": "10"}, "featureObservationText": "2"}, {"featureType": {"id": "11"}, "featureObservationText": "2"}, {"featureType": {"id": "12"}, "featureObservationText": "2"}, {"featureType": {"id": "14"}, "featureObservationText": "2"}, {"featureType": {"id": "15"}, "featureObservationText": "2"}, {"featureType": {"id": "16"}, "featureObservationText": "2"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-04-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 13, "year": 1931, "month": 10, "interpretedTimestamp": "1931-10-13T22:59:59.999Z"}, "remarks": "Fynddatum ändrat från 15/10 till 13/10-", "dateType": "single", "startDate": {"day": 13, "year": 1931, "month": 10, "interpretedTimestamp": "1931-10-12T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "16"}], "position": {"latitude": "59.6666666666667", "longitude": "17.7166666666667", "uncertaintyInMeters": 2000}, "localityI": "Uppsala, Vallby skogen", "localityV": "Uppland, Danmarks socken, Vallby skogen (Bergsbrunna skogen)", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Uppsala, Vallby skogen\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Modin, Axel"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": "yes", "objects.commonName": "Wolverine", "objects.swedishName": "Järv", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "59", "locationDistinct.latM": "40", "locationDistinct.latS": "0", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "59", "locationDistinct.longM": "40", "locationDistinct.longS": "0", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Pelvis missing"}	6	{"taxa": {"data": [{"id": "12", "type": "taxon"}]}, "places": {"data": [{"id": "16", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}, {"id": "6", "type": "featureType"}, {"id": "7", "type": "featureType"}, {"id": "8", "type": "featureType"}, {"id": "9", "type": "featureType"}, {"id": "10", "type": "featureType"}, {"id": "11", "type": "featureType"}, {"id": "12", "type": "featureType"}, {"id": "14", "type": "featureType"}, {"id": "15", "type": "featureType"}, {"id": "16", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "7", "type": "physicalObject"}, {"id": "8", "type": "physicalObject"}, {"id": "9", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "4", "type": "preparationType"}, {"id": "12", "type": "preparationType"}, {"id": "23", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "8", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"individual": {"identifiers": [{"value": "590325", "identifierType": {"id": "1"}}, {"value": "321", "identifierType": {"id": "3"}}], "determinations": [{"taxonNameI": "Mus musculoides", "determinedByAgent": {"textI": "Gyldenstolpe, Nils"}}], "collectionItems": [{"physicalObject": {"lid": "f34c2d14-bd3a-4d6d-b3cf-084f1526bdca"}, "preparationType": {"id": "12"}}], "taxonInformation": {"taxonRemarks": "Sungenus Nannomys", "curatorialTaxon": {"id": "37"}, "customTaxonNames": [{"value": "Mus (Leggada) bellus gondokorae", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "female"}, {"featureType": {"id": "19"}, "featureObservationText": "52", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "22"}, "featureObservationText": "14", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "20"}, "featureObservationText": "47", "featureObservationUnit": "unspecified"}], "recordHistoryEvents": [{"date": {"dateText": "2016-08-19 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2016-08-19 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 9, "year": 1921, "month": 4, "interpretedTimestamp": "1921-04-09T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 9, "year": 1921, "month": 4, "interpretedTimestamp": "1921-04-08T23:00:00.000Z"}}, "expeditionText": "Swedish Expedition to Central Africa 1920-21", "locationInformation": {"places": [{"id": "4"}], "position": {"latitude": "-0.661944444444444", "longitude": "29.4566666666667"}, "localityI": "Kabare", "localityV": "Kabare - Lake Edward", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Kabare\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Gyldenstolpe, Nils"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Subsaharan Pygmy Mouse", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "0", "locationDistinct.latM": "39", "locationDistinct.latS": "43", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "S", "locationDistinct.longD": "0", "locationDistinct.longM": "39", "locationDistinct.longS": "43", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "S", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}	7	{"taxa": {"data": [{"id": "37", "type": "taxon"}]}, "places": {"data": [{"id": "4", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}, {"id": "19", "type": "featureType"}, {"id": "22", "type": "featureType"}, {"id": "20", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "10", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Manus och pedis in skin", "individual": {"identifiers": [{"value": "620285", "identifierType": {"id": "1"}}, {"value": "1,285", "identifierType": {"id": "3"}}, {"value": "1,285", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "da061a14-e348-4850-abb5-f1e3472b96e4"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "ad0b61fc-c9e6-4bac-998c-471cde0d874c"}, "preparationType": {"id": "12"}}], "deathInformation": [{"causeOfDeathType": {"id": "6"}}], "taxonInformation": {"curatorialTaxon": {"id": "30"}, "customTaxonNames": [{"value": "Mono pardo, maneche pardo", "customTaxonNameType": {"id": "2"}}]}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "female"}, {"featureType": {"id": "18"}, "featureObservationText": "1038", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "130", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "21"}, "featureObservationText": "544", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}, {"featureType": {"id": "12"}, "featureObservationText": "2"}, {"featureType": {"id": "16"}, "featureObservationText": "2"}], "recordHistoryEvents": [{"date": {"dateText": "2007-05-24 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2015-03-09 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 14, "year": 1938, "month": 5, "interpretedTimestamp": "1938-05-14T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 14, "year": 1938, "month": 5, "interpretedTimestamp": "1938-05-13T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "23"}], "remarks": "Ur Gyldenstolpe \\"A Cont. to the ornth. of Northern Bolivia\\": Orion är belägen ca 35 km söder om Reyes längs vägen till San Borja.", "position": {"latitude": "-14.5277777777778", "longitude": "-67.1222222222222", "uncertaintyInMeters": 5000}, "localityI": "Mojos, Orión", "localityV": "Bolovia, Mojos, Orioy", "verticalPosition": {"minimumElevationInMeters": 196}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Mojos, Orión\\"."}}, "remarks": "Ur Gyldenstolpe \\"A Cont. to the ornth. of Northern Bolivia\\": Orion är belägen ca 35 km söder om Reyes längs vägen till San Borja.", "isDeathDate": true, "collectedByAgent": {"textI": "Olalla, AM"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Black Howler", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "14", "locationDistinct.latM": "31", "locationDistinct.latS": "40", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "S", "locationDistinct.longD": "14", "locationDistinct.longM": "31", "locationDistinct.longS": "40", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "S", "collection.oldRubinBones": "KR 1,MAND 1,MANIS 2*,PEDIS 2*; \\\\n*in skin", "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}	8	{"taxa": {"data": [{"id": "30", "type": "taxon"}]}, "places": {"data": [{"id": "23", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "18", "type": "featureType"}, {"id": "23", "type": "featureType"}, {"id": "21", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}, {"id": "12", "type": "featureType"}, {"id": "16", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "11", "type": "physicalObject"}, {"id": "12", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "6", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Angående skinn, se A621441. Hör eventuellt till A621441. \\"Skinn finnes.\\" Endast skinn plus kranium enligt lappkat. (J. E.)\\nSkin not in cold skinroom (2015-02-26 M. Caspers)", "individual": {"identifiers": [{"value": "621445", "identifierType": {"id": "1"}}], "collectionItems": [{"physicalObject": {"lid": "28ff4fe9-8781-42bb-95b3-95a14ed60727"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "776e49a3-af35-407c-a59b-a061827d7a5c"}, "preparationType": {"id": "18"}}], "taxonInformation": {"curatorialTaxon": {"id": "33"}, "customTaxonNames": [{"value": "Gorilla beringeri", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2008-05-19 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-02-01 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 24, "year": 1921, "month": 3, "interpretedTimestamp": "1921-03-24T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 24, "year": 1921, "month": 3, "interpretedTimestamp": "1921-03-23T23:00:00.000Z"}}, "expeditionText": "Swedish Expedition to Central Africa 1920-21", "locationInformation": {"places": [{"id": "3"}], "position": {"latitude": "-1.50777777777778", "longitude": "29.4472222222222"}, "localityI": "Mount Karisimbi", "localityV": "N Ö sluttningen av Mt Karissimbi, Birunga volcanoes", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Mount Karisimbi\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Gyldenstolpe, Nils"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Eastern Gorilla", "objects.swedishName": "Gorilla", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "1", "locationDistinct.latM": "30", "locationDistinct.latS": "28", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "S", "locationDistinct.longD": "1", "locationDistinct.longM": "30", "locationDistinct.longS": "28", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "S", "collection.oldRubinBones": null, "collection.appearanceComments": "SKEL:KR 1,MAND 1", "collection.suitableForExhibition": null}, "publishRecord": true}	9	{"taxa": {"data": [{"id": "33", "type": "taxon"}]}, "places": {"data": [{"id": "3", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "13", "type": "physicalObject"}, {"id": "14", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "18", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 \\nPE:1 FE:2 TI:2 PEDIS:2", "individual": {"identifiers": [{"value": "628009", "identifierType": {"id": "1"}}, {"value": "9", "identifierType": {"id": "3"}}, {"value": "9", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "eec94365-4bba-497f-ad01-16962109667d"}, "preparationType": {"id": "1"}}, {"physicalObject": {"lid": "6f5a2354-ae42-42ff-a6c0-79acbc1a81a2"}, "preparationType": {"id": "12"}}], "deathInformation": [{"causeOfDeathType": {"id": "12"}}], "taxonInformation": {"curatorialTaxon": {"id": "17"}}, "originInformation": [{"originLocality": "Lärbo, Gotland", "establishmentMeansType": {"id": "1"}, "isResultOfSelectiveBreeding": "no"}], "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "juvenile"}, {"featureType": {"id": "18"}, "featureObservationText": "715", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "203", "featureObservationUnit": "unspecified"}], "recordHistoryEvents": [{"date": {"dateText": "2008-11-28 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2016-06-22 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 3, "year": 1960, "month": 4, "interpretedTimestamp": "1960-04-03T22:59:59.999Z"}, "remarks": "Till Skansen 28/3-1960", "dateType": "single", "startDate": {"day": 3, "year": 1960, "month": 4, "interpretedTimestamp": "1960-04-02T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "10"}], "position": {"latitude": "57.7902777777778", "longitude": "18.7922222222222", "uncertaintyInMeters": 5000}, "localityI": "Lärbro", "swedishGrid5km": "07J2f", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Lärbro\\"; Calculated midpoint from RT90 Index 5km \\"07J2f\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Skansen Zoological Park"}, "establishmentMeansType": {"id": "3"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": null, "objects.originStatus": "Zoo animal", "objects.publishCoord": null, "analysis.measComments": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 \\nPE:1 FE:2 TI:2 PEDIS:2", "locationDistinct.latD": "57", "locationDistinct.latM": "47", "locationDistinct.latS": "25", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "57", "locationDistinct.longM": "47", "locationDistinct.longS": "25", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}	10	{"taxa": {"data": [{"id": "17", "type": "taxon"}]}, "places": {"data": [{"id": "10", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "18", "type": "featureType"}, {"id": "23", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "15", "type": "physicalObject"}, {"id": "16", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "1", "type": "preparationType"}, {"id": "12", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "12", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "3", "type": "establishmentMeansType"}, {"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Described as new subsp. Lonchoglossa wiedi aequatoris by Lönnberg, E. (Arkiv för Zoologi (KVA) 14:4 p 65-66). Now regarded as a synonym for Anoura caudifer.", "individual": {"identifiers": [{"value": "630096", "identifierType": {"id": "1"}}, {"value": "6", "identifierType": {"id": "2"}}], "determinations": [{"taxonNameI": "Anoura sp.", "determinedByAgent": {"textI": "Stanczak, Adam"}}], "collectionItems": [{"physicalObject": {"lid": "e23b1ae7-68bd-4793-a02f-9f8bd564b81b"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "220eea66-f050-4176-9188-51c3025bedf1"}, "preparationType": {"id": "13"}}], "taxonInformation": {"typeStatus": {"id": "2"}, "taxonRemarks": "Described as new subsp. Lonchoglossa wiedi aequatoris by Lönnberg, E. (Arkiv för Zoologi (KVA) 14:4 p 65-66). Now regarded as a synonym for Anoura caudifer.", "curatorialTaxon": {"id": "23"}, "customTaxonNames": [{"value": "Lonchoglossa wiedi aequatoris Lönnberg", "customTaxonNameType": {"id": "3"}}]}, "featureObservations": [{"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}], "recordHistoryEvents": [{"date": {"dateText": "1994-10-11 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2006-11-07 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2006-12-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 20, "year": 1913, "month": 4, "interpretedTimestamp": "1913-04-20T22:59:59.999Z"}, "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "25"}], "position": {"latitude": "0.10475", "longitude": "-78.75938"}, "localityI": "Gualea", "localityV": "Ecuador, Gualea, Ilambo.", "verticalPosition": {"maximumElevationInMeters": 1500, "minimumElevationInMeters": 1500}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Gualea\\"."}}, "isDeathDate": false, "collectedByAgent": {"textI": "Söderström, L"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Tailless Bat sp.", "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true}	11	{"taxa": {"data": [{"id": "23", "type": "taxon"}]}, "places": {"data": [{"id": "25", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "25", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "17", "type": "physicalObject"}, {"id": "18", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "13", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": []}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Gonader unders av JE 11/12 80\\\\n\\"; Sampled for isotope analysis: Loan 2015-37", "individual": {"acquisition": {"handedInByAgent": {"textI": "Police Sollefteå"}}, "identifiers": [{"value": "805176", "identifierType": {"id": "1"}}, {"value": "5176", "identifierType": {"id": "3"}}, {"value": "5176", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "67a84488-0dc6-49e9-958d-38cbe2a13bd7"}, "preparationType": {"id": "2"}}, {"physicalObject": {"lid": "0f73cf3f-7e11-4653-b1db-728e67d4492a"}, "preparationType": {"id": "12"}}, {"physicalObject": {"lid": "7fe19763-c486-4e29-b7c5-9ddd7122d60f"}, "preparationType": {"id": "23"}}], "deathInformation": [{"remarks": "Killed by car", "causeOfDeathType": {"id": "10"}}], "taxonInformation": {"curatorialTaxon": {"id": "9"}}, "featureObservations": [{"featureType": {"id": "30"}, "featureObservationText": "16000", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "female"}, {"featureType": {"id": "18"}, "featureObservationText": "1090", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "22"}, "featureObservationText": "90", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "250", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "20"}, "featureObservationText": "210", "featureObservationUnit": "unspecified"}], "recordHistoryEvents": [{"date": {"dateText": "2007-05-24 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2015-10-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 30, "year": 1980, "month": 10, "interpretedTimestamp": "1980-10-30T22:59:59.999Z"}, "remarks": "Collected: During 1980; Date Arrived: 1980503", "dateType": "single", "startDate": {"day": 30, "year": 1980, "month": 10, "interpretedTimestamp": "1980-10-29T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "17"}], "position": {"latitude": "63.1666666666667", "longitude": "17.3830555555556", "uncertaintyInMeters": 3500}, "localityI": "Sollefteå, Multrå", "localityV": "Ångermanland,", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Sollefteå, Multrå\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Police"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "63", "locationDistinct.latM": "10", "locationDistinct.latS": "0", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "63", "locationDistinct.longM": "10", "locationDistinct.longS": "0", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": "KR:1 MAND:1 VE:X CO:X SC:2 HU:2 UL:2 RA:2 MANIS:2 PE:1 FE:2 TI:2 PEDIS:2", "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Greybrownish with black spots on back, legs and stomach"}	12	{"taxa": {"data": [{"id": "9", "type": "taxon"}]}, "places": {"data": [{"id": "17", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "30", "type": "featureType"}, {"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "18", "type": "featureType"}, {"id": "22", "type": "featureType"}, {"id": "23", "type": "featureType"}, {"id": "20", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "3", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "19", "type": "physicalObject"}, {"id": "20", "type": "physicalObject"}, {"id": "21", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "2", "type": "preparationType"}, {"id": "12", "type": "preparationType"}, {"id": "23", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "10", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Skin to other institution.\\nLänstyrelsens naturvårdsenhet har framfört önskemål om att djuret ska ingå i Naturrum, Ammarnäs.\\nJakttillstånd finns enligt uppgift.\\nPenisben finnes.\\nBiocidprov tagna.", "individual": {"acquisition": {"date": {"endDate": {"day": 26, "year": 1982, "month": 1, "interpretedTimestamp": "1982-01-26T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 26, "year": 1982, "month": 1, "interpretedTimestamp": "1982-01-25T23:00:00.000Z"}}, "handedInByAgent": {"textI": "Police Sorsele"}}, "identifiers": [{"value": "825005", "identifierType": {"id": "1"}}, {"value": "A825005", "identifierType": {"id": "2"}}], "collectionItems": [{"physicalObject": {"lid": "f0e88cd2-1cb8-4e4d-8708-74b0ec52bfbc"}, "preparationType": {"id": "4"}}, {"physicalObject": {"lid": "373c0bbb-0f2f-4ecd-b0c7-7af35dfda27f"}, "preparationType": {"id": "18"}}, {"physicalObject": {"lid": "6bd4d262-1ef5-4598-a16c-d406645078b9"}, "preparationType": {"id": "23"}}], "deathInformation": [{"causeOfDeathType": {"id": "8"}}], "taxonInformation": {"curatorialTaxon": {"id": "12"}}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "unknown"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "18"}, "featureObservationText": "95.5", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "22"}, "featureObservationText": "54", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "23"}, "featureObservationText": "174", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "20"}, "featureObservationText": "220", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "26"}, "featureObservationText": "13.4", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}, {"featureType": {"id": "7"}, "featureObservationText": "6"}, {"featureType": {"id": "8"}, "featureObservationText": "2"}, {"featureType": {"id": "13"}, "featureObservationText": "1"}, {"featureType": {"id": "14"}, "featureObservationText": "0,5"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 26, "year": 1982, "month": 1, "interpretedTimestamp": "1982-01-26T22:59:59.999Z"}, "remarks": "Uppgiven dödsdag:820122, kl  0830.", "dateType": "latest", "startDate": {"interpretedTimestamp": "1599-12-31T22:47:48.000Z"}}, "locationInformation": {"places": [{"id": "13"}], "position": {"latitude": "65.5449595633524", "longitude": "17.5939290872286", "uncertaintyInMeters": 3500}, "localityI": "Sorsele,Vitnjuln", "localityV": "Sorsele, Vitnjuln, Grans sameby.", "swedishGrid5km": "24H4g", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Sorsele,Vitnjuln\\"; Calculated midpoint from RT90 Index 5km \\"24H4g\\"."}}, "isDeathDate": false, "collectedByAgent": {"textI": "Norén, Eric"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Wolverine", "objects.swedishName": "Järv", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": "Mycket fint kranium"}, "publishRecord": true}	13	{"taxa": {"data": [{"id": "12", "type": "taxon"}]}, "places": {"data": [{"id": "13", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "18", "type": "featureType"}, {"id": "22", "type": "featureType"}, {"id": "23", "type": "featureType"}, {"id": "20", "type": "featureType"}, {"id": "26", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}, {"id": "7", "type": "featureType"}, {"id": "8", "type": "featureType"}, {"id": "13", "type": "featureType"}, {"id": "14", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "2", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "22", "type": "physicalObject"}, {"id": "23", "type": "physicalObject"}, {"id": "24", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "4", "type": "preparationType"}, {"id": "18", "type": "preparationType"}, {"id": "23", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "8", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "Kranie finns på Grimsö med nummer B215-93", "individual": {"identifiers": [{"value": "956051", "identifierType": {"id": "1"}}], "determinations": [{"date": {"endDate": {"day": 2, "year": 1994, "month": 2, "interpretedTimestamp": "1994-02-02T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 2, "year": 1994, "month": 2, "interpretedTimestamp": "1994-02-01T23:00:00.000Z"}}, "taxonNameI": "Capreolus capreolus", "determinedByAgent": {"textI": "Mortensen, Peter"}}], "collectionItems": [{"physicalObject": {"lid": "79547a5d-d0d4-47c3-b179-627bf6deee92"}, "preparationType": {"id": "6"}}], "deathInformation": [{"causeOfDeathType": {"id": "8"}}], "taxonInformation": {"curatorialTaxon": {"id": "5"}}, "featureObservations": [{"featureType": {"id": "30"}, "featureObservationText": "9333", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "1"}, "featureObservationText": "juvenile"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "3"}, "featureObservationText": "fresh"}], "recordHistoryEvents": [{"date": {"dateText": "2018-04-20 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-04-20 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 2, "year": 1994, "month": 2, "interpretedTimestamp": "1994-02-02T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 2, "year": 1994, "month": 2, "interpretedTimestamp": "1994-02-01T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "16"}], "position": {"latitude": "59.4194444444444", "longitude": "18.1683333333333"}, "localityI": "Bogesund, Röskär", "localityV": "Bogesund, Rödskär", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Bogesund, Röskär\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Mortensen, Peter"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": null, "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": "59", "locationDistinct.latM": "25", "locationDistinct.latS": "10", "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": "N", "locationDistinct.longD": "59", "locationDistinct.longM": "25", "locationDistinct.longS": "10", "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": "N", "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Skin discarded from collection"}	14	{"taxa": {"data": [{"id": "5", "type": "taxon"}]}, "places": {"data": [{"id": "16", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "30", "type": "featureType"}, {"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "3", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "25", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "6", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "8", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"individual": {"acquisition": {"handedInByAgent": {"textI": "Swedish Veterinary Association"}}, "identifiers": [{"value": "985093", "identifierType": {"id": "1"}}, {"value": "V0253/98", "identifierType": {"id": "5"}}], "determinations": [{"date": {"endDate": {"day": 26, "year": 1998, "month": 3, "interpretedTimestamp": "1998-03-26T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 26, "year": 1998, "month": 3, "interpretedTimestamp": "1998-03-25T23:00:00.000Z"}}, "taxonNameI": "Lynx lynx", "determinedByAgent": {"textI": "Cederholm, Ingrid"}}], "collectionItems": [{"physicalObject": {"lid": "6cb9d6ca-5baf-4768-be7e-a6f4e89d2eb6"}, "preparationType": {"id": "5"}}, {"physicalObject": {"lid": "8ae89103-2e54-4ebe-9f81-e31c48c35cee"}, "preparationType": {"id": "23"}}], "deathInformation": [{"remarks": "skyddsjakt", "causeOfDeathType": {"id": "7"}}], "taxonInformation": {"curatorialTaxon": {"id": "9"}}, "featureObservations": [{"methodText": "sectioned-teeth", "featureType": {"id": "2"}, "featureObservationText": "2"}, {"methodText": "sectioned-teeth", "featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "male"}, {"featureType": {"id": "26"}, "featureObservationText": "13000", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "4"}, "featureObservationText": "x"}, {"featureType": {"id": "5"}, "featureObservationText": "x"}], "recordHistoryEvents": [{"date": {"dateText": "2018-02-13 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-02-13 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 23, "year": 1998, "month": 3, "interpretedTimestamp": "1998-03-23T22:59:59.999Z"}, "dateType": "single", "startDate": {"day": 23, "year": 1998, "month": 3, "interpretedTimestamp": "1998-03-22T23:00:00.000Z"}}, "locationInformation": {"places": [{"id": "11"}], "position": {"latitude": "63.5103892673661", "longitude": "13.045476444517", "uncertaintyInMeters": 3500}, "localityI": "Åre, Husåberget", "localityV": "Husåberget", "swedishGrid5km": "19D9c", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Åre, Husåberget\\"; Calculated midpoint from RT90 Index 5km \\"19D9c\\"."}}, "isDeathDate": true, "collectedByAgent": {"textI": "Löding, Tomas Olof"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": null, "objects.swedishName": "Lo", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Kan vara förväxlat med 98/5647\\n\\nSkin not added to collection"}	15	{"taxa": {"data": [{"id": "9", "type": "taxon"}]}, "places": {"data": [{"id": "11", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "2", "type": "featureType"}, {"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "26", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "5", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "26", "type": "physicalObject"}, {"id": "27", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "5", "type": "preparationType"}, {"id": "23", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "7", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
2019-03-06 16:16:33.836+00	\N	\N	{"remarks": "00-0k0-925F", "individual": {"acquisition": {"handedInByAgent": {"textI": "SVA"}}, "identifiers": [{"value": "985729", "identifierType": {"id": "1"}}, {"value": "V0615/98", "identifierType": {"id": "5"}}], "determinations": [{"date": {"endDate": {"day": 17, "year": 1998, "month": 9, "interpretedTimestamp": "1998-09-17T21:59:59.999Z"}, "dateType": "single", "startDate": {"day": 17, "year": 1998, "month": 9, "interpretedTimestamp": "1998-09-16T22:00:00.000Z"}}, "taxonNameI": "Gulo gulo", "determinedByAgent": {"textI": "Hansson, Anders"}}], "collectionItems": [{"physicalObject": {"lid": "b446d1dd-7a7b-4394-a2bb-666e030b4c8b"}, "preparationType": {"id": "1"}}], "deathInformation": [{"remarks": "Såret efter sändare rupterat.", "causeOfDeathType": {"id": "11"}}], "taxonInformation": {"curatorialTaxon": {"id": "12"}}, "featureObservations": [{"featureType": {"id": "1"}, "featureObservationText": "adult"}, {"featureType": {"id": "25"}, "featureObservationText": "female"}, {"featureType": {"id": "26"}, "featureObservationText": "10.88", "featureObservationUnit": "unspecified"}, {"featureType": {"id": "4"}, "featureObservationText": "1"}, {"featureType": {"id": "5"}, "featureObservationText": "1"}, {"featureType": {"id": "6"}, "featureObservationText": "x"}, {"featureType": {"id": "7"}, "featureObservationText": "x"}, {"featureType": {"id": "8"}, "featureObservationText": "2"}, {"featureType": {"id": "9"}, "featureObservationText": "2"}, {"featureType": {"id": "10"}, "featureObservationText": "2"}, {"featureType": {"id": "11"}, "featureObservationText": "2"}, {"featureType": {"id": "12"}, "featureObservationText": "2"}, {"featureType": {"id": "13"}, "featureObservationText": "1"}, {"featureType": {"id": "14"}, "featureObservationText": "2"}, {"featureType": {"id": "15"}, "featureObservationText": "2"}, {"featureType": {"id": "16"}, "featureObservationText": "2"}], "recordHistoryEvents": [{"agent": {"textI": "[masked]"}, "system": "Physical card register", "description": "New catalog card"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "New specimen record"}, {"date": {"dateText": "2018-03-06 00:00:00"}, "agent": {"textI": "[masked]"}, "system": "Mam2006 (Microsoft Access database)", "description": "Last update of specimen record"}], "collectingInformation": [{"event": {"dateRange": {"endDate": {"day": 20, "year": 1998, "month": 6, "interpretedTimestamp": "1998-06-20T21:59:59.999Z"}, "dateType": "single", "startDate": {"day": 20, "year": 1998, "month": 6, "interpretedTimestamp": "1998-06-19T22:00:00.000Z"}}, "locationInformation": {"places": [{"id": "12"}], "position": {"latitude": "67.3390847189902", "longitude": "17.6105518879438", "uncertaintyInMeters": 3500}, "localityI": "Sareks nationalpark", "localityV": "Lu., Sareks nationalpark", "swedishGrid5km": "27H6g", "verticalPosition": {}, "georeferenceSourcesText": "Imported from Mam2006 (MS Access database), table \\"Location_distinct\\", locality \\"Sareks nationalpark\\"; Calculated midpoint from RT90 Index 5km \\"27H6g\\"."}}, "isDeathDate": false, "collectedByAgent": {"textI": "Police - Jokkmokk"}, "establishmentMeansType": {"id": "1"}}]}, "legacyData": {"objects.collDay": null, "objects.collYear": null, "objects.dateType": null, "objects.collMonth": null, "collection.ethanol": null, "objects.commonName": "Wolverine", "objects.swedishName": "Järv", "objects.originStatus": null, "objects.publishCoord": null, "analysis.measComments": null, "locationDistinct.latD": null, "locationDistinct.latM": null, "locationDistinct.latS": null, "objects.publishRecord": null, "locationDistinct.latDD": null, "locationDistinct.latNS": null, "locationDistinct.longD": null, "locationDistinct.longM": null, "locationDistinct.longS": null, "objects.scientificName": null, "locationDistinct.longDD": null, "locationDistinct.longEW": null, "collection.oldRubinBones": null, "collection.appearanceComments": null, "collection.suitableForExhibition": null}, "publishRecord": true, "collectionItemsRemarks": "Skin not added to collection"}	16	{"taxa": {"data": [{"id": "12", "type": "taxon"}]}, "places": {"data": [{"id": "12", "type": "place"}]}, "taxonNames": {"data": []}, "featureTypes": {"data": [{"id": "1", "type": "featureType"}, {"id": "25", "type": "featureType"}, {"id": "26", "type": "featureType"}, {"id": "4", "type": "featureType"}, {"id": "5", "type": "featureType"}, {"id": "6", "type": "featureType"}, {"id": "7", "type": "featureType"}, {"id": "8", "type": "featureType"}, {"id": "9", "type": "featureType"}, {"id": "10", "type": "featureType"}, {"id": "11", "type": "featureType"}, {"id": "12", "type": "featureType"}, {"id": "13", "type": "featureType"}, {"id": "14", "type": "featureType"}, {"id": "15", "type": "featureType"}, {"id": "16", "type": "featureType"}]}, "identifierTypes": {"data": [{"id": "1", "type": "identifierType"}, {"id": "5", "type": "identifierType"}]}, "physicalObjects": {"data": [{"id": "28", "type": "physicalObject"}]}, "normalizedAgents": {"data": []}, "preparationTypes": {"data": [{"id": "1", "type": "preparationType"}]}, "causeOfDeathTypes": {"data": [{"id": "11", "type": "causeOfDeathType"}]}, "resourceActivities": {"data": []}, "establishmentMeansTypes": {"data": [{"id": "1", "type": "establishmentMeansType"}]}}	t	2019-03-06 16:16:33.836+00
\.


--
-- Data for Name: storageLocations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."storageLocations" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt", "parentId") FROM stdin;
2019-03-06 16:16:33.195+00	\N	\N	{"name": "NRM", "group": "institution", "isRoot": true}	1	\N	t	2019-03-06 16:16:33.195+00	\N
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Annan Institution", "group": "room"}	2	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Bensalen", "group": "room"}	3	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "4352406 Alouatta caraya", "group": "shelf"}	4	\N	t	2019-03-06 16:16:33.195+00	3
2019-03-06 16:16:33.195+00	\N	\N	{"name": "4500906 Gorilla beringei", "group": "shelf"}	5	\N	t	2019-03-06 16:16:33.195+00	3
2019-03-06 16:16:33.195+00	\N	\N	{"name": "5100906 Ursus arctos", "group": "shelf"}	6	\N	t	2019-03-06 16:16:33.195+00	3
2019-03-06 16:16:33.195+00	\N	\N	{"name": "5203003 Gulo gulo", "group": "shelf"}	7	\N	t	2019-03-06 16:16:33.195+00	3
2019-03-06 16:16:33.195+00	\N	\N	{"name": "5520606 Lynx lynx", "group": "shelf"}	8	\N	t	2019-03-06 16:16:33.195+00	3
2019-03-06 16:16:33.195+00	\N	\N	{"name": "7803903 Capreolus capreolus", "group": "shelf"}	9	\N	t	2019-03-06 16:16:33.195+00	3
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Ingen information", "group": "room"}	10	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "3810444 Myotis mystacinus", "group": "shelf"}	11	\N	t	2019-03-06 16:16:33.195+00	10
2019-03-06 16:16:33.195+00	\N	\N	{"name": "5203003 Gulo gulo", "group": "shelf"}	12	\N	t	2019-03-06 16:16:33.195+00	10
2019-03-06 16:16:33.195+00	\N	\N	{"name": "5520606 Lynx lynx", "group": "shelf"}	13	\N	t	2019-03-06 16:16:33.195+00	10
2019-03-06 16:16:33.195+00	\N	\N	{"name": "5700503 Pusa hispida", "group": "shelf"}	14	\N	t	2019-03-06 16:16:33.195+00	10
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Lodjursrum, köl 1213", "group": "room"}	15	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Låda 25", "group": "mountingWall"}	16	\N	t	2019-03-06 16:16:33.195+00	15
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Låda 6", "group": "mountingWall"}	17	\N	t	2019-03-06 16:16:33.195+00	15
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Okänd", "group": "room"}	18	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Omistliga samlingar", "group": "room"}	19	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "3631800 Anoura sp.", "group": "shelf"}	20	\N	t	2019-03-06 16:16:33.195+00	19
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Omistliga sprit", "group": "room"}	21	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Plåtskåpsrum", "group": "room"}	22	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "9472969 Mus musculoides", "group": "shelf"}	23	\N	t	2019-03-06 16:16:33.195+00	22
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Skinnrum kylda", "group": "room"}	24	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "4352406 Alouatta caraya", "group": "shelf"}	25	\N	t	2019-03-06 16:16:33.195+00	24
2019-03-06 16:16:33.195+00	\N	\N	{"name": "5203003 Gulo gulo", "group": "shelf"}	26	\N	t	2019-03-06 16:16:33.195+00	24
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Utlånad", "group": "room"}	27	\N	t	2019-03-06 16:16:33.195+00	1
2019-03-06 16:16:33.195+00	\N	\N	{"name": "Vindsrum kylda", "group": "room"}	28	\N	t	2019-03-06 16:16:33.195+00	1
\.


--
-- Data for Name: taxonNames; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."taxonNames" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt", "acceptedToTaxonId", "synonymToTaxonId", "vernacularToTaxonId") FROM stdin;
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Glossophaginae", "rank": "unknown rank", "rubinNumber": "3630000", "taxonNameType": "scientific"}	1	\N	t	2019-03-06 16:16:33.061+00	\N	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Anoura", "rank": "genus", "rubinNumber": "3631800", "taxonNameType": "scientific"}	2	\N	t	2019-03-06 16:16:33.061+00	23	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Myotis mystacinus", "rank": "species", "rubinNumber": "3810444", "taxonNameType": "scientific"}	3	\N	t	2019-03-06 16:16:33.061+00	26	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Alouatta caraya", "rank": "species", "rubinNumber": "4352406", "taxonNameType": "scientific"}	4	\N	t	2019-03-06 16:16:33.061+00	30	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Gorilla beringei", "rank": "species", "rubinNumber": "4500906", "taxonNameType": "scientific"}	5	\N	t	2019-03-06 16:16:33.061+00	33	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Ursus arctos", "rank": "species", "rubinNumber": "5100906", "taxonNameType": "scientific"}	6	\N	t	2019-03-06 16:16:33.061+00	20	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Mustela erminea", "rank": "species", "rubinNumber": "5200312", "taxonNameType": "scientific"}	7	\N	t	2019-03-06 16:16:33.061+00	14	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Gulo gulo", "rank": "species", "rubinNumber": "5203003", "taxonNameType": "scientific"}	8	\N	t	2019-03-06 16:16:33.061+00	12	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Lynx lynx", "rank": "species", "rubinNumber": "5520606", "taxonNameType": "scientific"}	9	\N	t	2019-03-06 16:16:33.061+00	9	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Phoca hispida", "rank": "species", "rubinNumber": "5700312", "taxonNameType": "scientific"}	10	\N	t	2019-03-06 16:16:33.061+00	\N	17	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Capreolus capreolus", "rank": "species", "rubinNumber": "7803903", "taxonNameType": "scientific"}	11	\N	t	2019-03-06 16:16:33.061+00	5	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Muridae", "rank": "family", "rubinNumber": "9250000", "taxonNameType": "scientific"}	12	\N	t	2019-03-06 16:16:33.061+00	35	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Rhabdomys pumilio", "rank": "species", "rubinNumber": "9457503", "taxonNameType": "scientific"}	13	\N	t	2019-03-06 16:16:33.061+00	39	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Mus musculoides", "rank": "species", "rubinNumber": "9472969", "taxonNameType": "scientific"}	14	\N	t	2019-03-06 16:16:33.061+00	37	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Mammalia", "rank": "class", "taxonNameType": "scientific"}	15	\N	t	2019-03-06 16:16:33.061+00	1	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Artiodactyla", "rank": "order", "taxonNameType": "scientific"}	16	\N	t	2019-03-06 16:16:33.061+00	2	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Cervidae", "rank": "family", "taxonNameType": "scientific"}	17	\N	t	2019-03-06 16:16:33.061+00	3	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Capreolus", "rank": "genus", "taxonNameType": "scientific"}	18	\N	t	2019-03-06 16:16:33.061+00	4	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Carnivora", "rank": "order", "taxonNameType": "scientific"}	19	\N	t	2019-03-06 16:16:33.061+00	6	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Felidae", "rank": "family", "taxonNameType": "scientific"}	20	\N	t	2019-03-06 16:16:33.061+00	7	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Lynx", "rank": "genus", "taxonNameType": "scientific"}	21	\N	t	2019-03-06 16:16:33.061+00	8	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Mustelidae", "rank": "family", "taxonNameType": "scientific"}	22	\N	t	2019-03-06 16:16:33.061+00	10	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Gulo", "rank": "genus", "taxonNameType": "scientific"}	23	\N	t	2019-03-06 16:16:33.061+00	11	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Mustela", "rank": "genus", "taxonNameType": "scientific"}	24	\N	t	2019-03-06 16:16:33.061+00	13	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Phocidae", "rank": "family", "taxonNameType": "scientific"}	25	\N	t	2019-03-06 16:16:33.061+00	15	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Pusa", "rank": "genus", "taxonNameType": "scientific"}	26	\N	t	2019-03-06 16:16:33.061+00	16	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Pusa hispida", "rank": "species", "taxonNameType": "scientific"}	27	\N	t	2019-03-06 16:16:33.061+00	17	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Ursidae", "rank": "family", "taxonNameType": "scientific"}	28	\N	t	2019-03-06 16:16:33.061+00	18	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Ursus", "rank": "genus", "taxonNameType": "scientific"}	29	\N	t	2019-03-06 16:16:33.061+00	19	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Chiroptera", "rank": "order", "taxonNameType": "scientific"}	30	\N	t	2019-03-06 16:16:33.061+00	21	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Phyllostomidae", "rank": "family", "taxonNameType": "scientific"}	31	\N	t	2019-03-06 16:16:33.061+00	22	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Vespertilionidae", "rank": "family", "taxonNameType": "scientific"}	32	\N	t	2019-03-06 16:16:33.061+00	24	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Myotis", "rank": "genus", "taxonNameType": "scientific"}	33	\N	t	2019-03-06 16:16:33.061+00	25	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Primates", "rank": "order", "taxonNameType": "scientific"}	34	\N	t	2019-03-06 16:16:33.061+00	27	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Atelidae", "rank": "family", "taxonNameType": "scientific"}	35	\N	t	2019-03-06 16:16:33.061+00	28	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Alouatta", "rank": "genus", "taxonNameType": "scientific"}	36	\N	t	2019-03-06 16:16:33.061+00	29	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Hominidae", "rank": "family", "taxonNameType": "scientific"}	37	\N	t	2019-03-06 16:16:33.061+00	31	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Gorilla", "rank": "genus", "taxonNameType": "scientific"}	38	\N	t	2019-03-06 16:16:33.061+00	32	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Rodentia", "rank": "order", "taxonNameType": "scientific"}	39	\N	t	2019-03-06 16:16:33.061+00	34	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Mus", "rank": "genus", "taxonNameType": "scientific"}	40	\N	t	2019-03-06 16:16:33.061+00	36	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Rhabdomys", "rank": "genus", "taxonNameType": "scientific"}	41	\N	t	2019-03-06 16:16:33.061+00	38	\N	\N
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Western Roe Deer", "language": "en", "taxonNameType": "vernacular"}	42	\N	t	2019-03-06 16:16:33.061+00	\N	\N	5
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Eurasian Lynx", "language": "en", "taxonNameType": "vernacular"}	43	\N	t	2019-03-06 16:16:33.061+00	\N	\N	9
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Wolverine", "language": "en", "taxonNameType": "vernacular"}	44	\N	t	2019-03-06 16:16:33.061+00	\N	\N	12
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Ermine", "language": "en", "taxonNameType": "vernacular"}	45	\N	t	2019-03-06 16:16:33.061+00	\N	\N	14
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Ringed Seal", "language": "en", "taxonNameType": "vernacular"}	46	\N	t	2019-03-06 16:16:33.061+00	\N	\N	17
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Brown Bear", "language": "en", "taxonNameType": "vernacular"}	47	\N	t	2019-03-06 16:16:33.061+00	\N	\N	20
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Tailless Bat sp.", "language": "en", "taxonNameType": "vernacular"}	48	\N	t	2019-03-06 16:16:33.061+00	\N	\N	23
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Whiskered Bat", "language": "en", "taxonNameType": "vernacular"}	49	\N	t	2019-03-06 16:16:33.061+00	\N	\N	26
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Black Howler", "language": "en", "taxonNameType": "vernacular"}	50	\N	t	2019-03-06 16:16:33.061+00	\N	\N	30
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Eastern Gorilla", "language": "en", "taxonNameType": "vernacular"}	51	\N	t	2019-03-06 16:16:33.061+00	\N	\N	33
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Subsaharan Pygmy Mouse", "language": "en", "taxonNameType": "vernacular"}	52	\N	t	2019-03-06 16:16:33.061+00	\N	\N	37
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Xeric Four-striped Grass Rat, Four-striped Grass Rat", "language": "en", "taxonNameType": "vernacular"}	53	\N	t	2019-03-06 16:16:33.061+00	\N	\N	39
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Järv", "language": "sv", "taxonNameType": "vernacular"}	54	\N	t	2019-03-06 16:16:33.061+00	\N	\N	12
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Hermelin", "language": "sv", "taxonNameType": "vernacular"}	55	\N	t	2019-03-06 16:16:33.061+00	\N	\N	14
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Vikare", "language": "sv", "taxonNameType": "vernacular"}	56	\N	t	2019-03-06 16:16:33.061+00	\N	\N	17
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Brunbjörn", "language": "sv", "taxonNameType": "vernacular"}	57	\N	t	2019-03-06 16:16:33.061+00	\N	\N	20
2019-03-06 16:16:33.061+00	\N	\N	{"name": "Mustaschfladdermus", "language": "sv", "taxonNameType": "vernacular"}	58	\N	t	2019-03-06 16:16:33.061+00	\N	\N	26
\.


--
-- Data for Name: taxons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.taxons ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt", "parentId") FROM stdin;
2019-03-06 16:16:32.946+00	\N	\N	{"isRoot": true}	1	\N	t	2019-03-06 16:16:32.946+00	\N
2019-03-06 16:16:32.946+00	\N	\N	{}	2	\N	t	2019-03-06 16:16:32.946+00	1
2019-03-06 16:16:32.946+00	\N	\N	{}	3	\N	t	2019-03-06 16:16:32.946+00	2
2019-03-06 16:16:32.946+00	\N	\N	{}	4	\N	t	2019-03-06 16:16:32.946+00	3
2019-03-06 16:16:32.946+00	\N	\N	{}	5	\N	t	2019-03-06 16:16:32.946+00	4
2019-03-06 16:16:32.946+00	\N	\N	{}	6	\N	t	2019-03-06 16:16:32.946+00	1
2019-03-06 16:16:32.946+00	\N	\N	{}	7	\N	t	2019-03-06 16:16:32.946+00	6
2019-03-06 16:16:32.946+00	\N	\N	{}	8	\N	t	2019-03-06 16:16:32.946+00	7
2019-03-06 16:16:32.946+00	\N	\N	{}	9	\N	t	2019-03-06 16:16:32.946+00	8
2019-03-06 16:16:32.946+00	\N	\N	{}	10	\N	t	2019-03-06 16:16:32.946+00	6
2019-03-06 16:16:32.946+00	\N	\N	{}	11	\N	t	2019-03-06 16:16:32.946+00	10
2019-03-06 16:16:32.946+00	\N	\N	{}	12	\N	t	2019-03-06 16:16:32.946+00	11
2019-03-06 16:16:32.946+00	\N	\N	{}	13	\N	t	2019-03-06 16:16:32.946+00	10
2019-03-06 16:16:32.946+00	\N	\N	{}	14	\N	t	2019-03-06 16:16:32.946+00	13
2019-03-06 16:16:32.946+00	\N	\N	{}	15	\N	t	2019-03-06 16:16:32.946+00	6
2019-03-06 16:16:32.946+00	\N	\N	{}	16	\N	t	2019-03-06 16:16:32.946+00	15
2019-03-06 16:16:32.946+00	\N	\N	{}	17	\N	t	2019-03-06 16:16:32.946+00	16
2019-03-06 16:16:32.946+00	\N	\N	{}	18	\N	t	2019-03-06 16:16:32.946+00	6
2019-03-06 16:16:32.946+00	\N	\N	{}	19	\N	t	2019-03-06 16:16:32.946+00	18
2019-03-06 16:16:32.946+00	\N	\N	{}	20	\N	t	2019-03-06 16:16:32.946+00	19
2019-03-06 16:16:32.946+00	\N	\N	{}	21	\N	t	2019-03-06 16:16:32.946+00	1
2019-03-06 16:16:32.946+00	\N	\N	{}	22	\N	t	2019-03-06 16:16:32.946+00	21
2019-03-06 16:16:32.946+00	\N	\N	{}	23	\N	t	2019-03-06 16:16:32.946+00	22
2019-03-06 16:16:32.946+00	\N	\N	{}	24	\N	t	2019-03-06 16:16:32.946+00	21
2019-03-06 16:16:32.946+00	\N	\N	{}	25	\N	t	2019-03-06 16:16:32.946+00	24
2019-03-06 16:16:32.946+00	\N	\N	{}	26	\N	t	2019-03-06 16:16:32.946+00	25
2019-03-06 16:16:32.946+00	\N	\N	{}	27	\N	t	2019-03-06 16:16:32.946+00	1
2019-03-06 16:16:32.946+00	\N	\N	{}	28	\N	t	2019-03-06 16:16:32.946+00	27
2019-03-06 16:16:32.946+00	\N	\N	{}	29	\N	t	2019-03-06 16:16:32.946+00	28
2019-03-06 16:16:32.946+00	\N	\N	{}	30	\N	t	2019-03-06 16:16:32.946+00	29
2019-03-06 16:16:32.946+00	\N	\N	{}	31	\N	t	2019-03-06 16:16:32.946+00	27
2019-03-06 16:16:32.946+00	\N	\N	{}	32	\N	t	2019-03-06 16:16:32.946+00	31
2019-03-06 16:16:32.946+00	\N	\N	{}	33	\N	t	2019-03-06 16:16:32.946+00	32
2019-03-06 16:16:32.946+00	\N	\N	{}	34	\N	t	2019-03-06 16:16:32.946+00	1
2019-03-06 16:16:32.946+00	\N	\N	{}	35	\N	t	2019-03-06 16:16:32.946+00	34
2019-03-06 16:16:32.946+00	\N	\N	{}	36	\N	t	2019-03-06 16:16:32.946+00	35
2019-03-06 16:16:32.946+00	\N	\N	{}	37	\N	t	2019-03-06 16:16:32.946+00	36
2019-03-06 16:16:32.946+00	\N	\N	{}	38	\N	t	2019-03-06 16:16:32.946+00	35
2019-03-06 16:16:32.946+00	\N	\N	{}	39	\N	t	2019-03-06 16:16:32.946+00	38
\.


--
-- Data for Name: typeSpecimenTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."typeSpecimenTypes" ("createdAt", "deactivatedAt", diff, document, id, relationships, "schemaCompliant", "updatedAt") FROM stdin;
2019-03-06 16:16:32.79+00	\N	\N	{"key": "cotype", "name": {"en": "cotype", "sv": "cotyp"}, "description": "A term no longer used. Formerly used for either a syntype or paratype."}	1	\N	t	2019-03-06 16:16:32.79+00
2019-03-06 16:16:32.79+00	\N	\N	{"key": "holotype", "name": {"en": "holotype", "sv": "holotyp"}, "description": "Unique specimen, fixed by original designation or indication."}	2	\N	t	2019-03-06 16:16:32.79+00
2019-03-06 16:16:32.79+00	\N	\N	{"key": "lectotype", "name": {"en": "lectotype", "sv": "lektotyp"}, "description": "Unique specimen, fixed by designation of a syntype to be the lectotype."}	3	\N	t	2019-03-06 16:16:32.79+00
2019-03-06 16:16:32.79+00	\N	\N	{"key": "neotype", "name": {"en": "neotype", "sv": "neotyp"}, "description": "Unique specimen, fixed by designation of a specimen to be the neotype."}	4	\N	t	2019-03-06 16:16:32.79+00
2019-03-06 16:16:32.79+00	\N	\N	{"key": "paralectotype", "name": {"en": "paralectotype", "sv": "paralektotyp"}, "description": "One or more specimens remaining in syntype series after designation of the lectotype."}	5	\N	t	2019-03-06 16:16:32.79+00
2019-03-06 16:16:32.79+00	\N	\N	{"key": "paratype", "name": {"en": "paratype", "sv": "paratyp"}, "description": "One or more specimens referred to in the original description in addition to the holotype."}	6	\N	t	2019-03-06 16:16:32.79+00
2019-03-06 16:16:32.79+00	\N	\N	{"key": "syntype", "name": {"en": "syntype", "sv": "syntyp"}, "description": "Two or more specimens referred to in the original description of which neither is the holotype."}	7	\N	t	2019-03-06 16:16:32.79+00
2019-03-06 16:16:32.79+00	\N	\N	{"key": "unspecified-type", "name": {"en": "unspecified type", "sv": "ospecificerad typ"}, "description": "Unknown kind of type."}	8	\N	t	2019-03-06 16:16:32.79+00
\.


--
-- Name: catalogNumbers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."catalogNumbers_id_seq"', 17, false);


--
-- Name: causeOfDeathTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."causeOfDeathTypes_id_seq"', 17, false);


--
-- Name: customTaxonNameTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."customTaxonNameTypes_id_seq"', 4, false);


--
-- Name: dataModelMigrationLogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."dataModelMigrationLogs_id_seq"', 4, true);


--
-- Name: establishmentMeansTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."establishmentMeansTypes_id_seq"', 5, false);


--
-- Name: exportJobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."exportJobs_id_seq"', 1, false);


--
-- Name: featureTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."featureTypes_id_seq"', 31, false);


--
-- Name: identifierTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."identifierTypes_id_seq"', 7, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: normalizedAgents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."normalizedAgents_id_seq"', 13, false);


--
-- Name: physicalObjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."physicalObjects_id_seq"', 29, false);


--
-- Name: places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.places_id_seq', 26, false);


--
-- Name: preparationTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."preparationTypes_id_seq"', 24, false);


--
-- Name: resourceActivities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."resourceActivities_id_seq"', 207, false);


--
-- Name: specimens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.specimens_id_seq', 17, false);


--
-- Name: storageLocations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."storageLocations_id_seq"', 29, false);


--
-- Name: taxonNames_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."taxonNames_id_seq"', 59, false);


--
-- Name: taxons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.taxons_id_seq', 40, false);


--
-- Name: typeSpecimenTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."typeSpecimenTypes_id_seq"', 9, false);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: catalogNumbers catalogNumbers_identifier_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."catalogNumbers"
    ADD CONSTRAINT "catalogNumbers_identifier_key" UNIQUE (identifier);


--
-- Name: catalogNumbers catalogNumbers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."catalogNumbers"
    ADD CONSTRAINT "catalogNumbers_pkey" PRIMARY KEY (id);


--
-- Name: causeOfDeathTypes causeOfDeathTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."causeOfDeathTypes"
    ADD CONSTRAINT "causeOfDeathTypes_pkey" PRIMARY KEY (id);


--
-- Name: customTaxonNameTypes customTaxonNameTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."customTaxonNameTypes"
    ADD CONSTRAINT "customTaxonNameTypes_pkey" PRIMARY KEY (id);


--
-- Name: dataModelMigrationLogs dataModelMigrationLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."dataModelMigrationLogs"
    ADD CONSTRAINT "dataModelMigrationLogs_pkey" PRIMARY KEY (id);


--
-- Name: establishmentMeansTypes establishmentMeansTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."establishmentMeansTypes"
    ADD CONSTRAINT "establishmentMeansTypes_pkey" PRIMARY KEY (id);


--
-- Name: exportJobs exportJobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."exportJobs"
    ADD CONSTRAINT "exportJobs_pkey" PRIMARY KEY (id);


--
-- Name: featureTypes featureTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."featureTypes"
    ADD CONSTRAINT "featureTypes_pkey" PRIMARY KEY (id);


--
-- Name: identifierTypes identifierTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."identifierTypes"
    ADD CONSTRAINT "identifierTypes_pkey" PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: normalizedAgents normalizedAgents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."normalizedAgents"
    ADD CONSTRAINT "normalizedAgents_pkey" PRIMARY KEY (id);


--
-- Name: physicalObjects physicalObjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."physicalObjects"
    ADD CONSTRAINT "physicalObjects_pkey" PRIMARY KEY (id);


--
-- Name: places places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_pkey PRIMARY KEY (id);


--
-- Name: preparationTypes preparationTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."preparationTypes"
    ADD CONSTRAINT "preparationTypes_pkey" PRIMARY KEY (id);


--
-- Name: resourceActivities resourceActivities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resourceActivities"
    ADD CONSTRAINT "resourceActivities_pkey" PRIMARY KEY (id);


--
-- Name: specimens specimens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specimens
    ADD CONSTRAINT specimens_pkey PRIMARY KEY (id);


--
-- Name: storageLocations storageLocations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."storageLocations"
    ADD CONSTRAINT "storageLocations_pkey" PRIMARY KEY (id);


--
-- Name: taxonNames taxonNames_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taxonNames"
    ADD CONSTRAINT "taxonNames_pkey" PRIMARY KEY (id);


--
-- Name: taxons taxons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taxons
    ADD CONSTRAINT taxons_pkey PRIMARY KEY (id);


--
-- Name: typeSpecimenTypes typeSpecimenTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."typeSpecimenTypes"
    ADD CONSTRAINT "typeSpecimenTypes_pkey" PRIMARY KEY (id);


--
-- Name: catalog_numbers_identifier_year_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX catalog_numbers_identifier_year_number ON public."catalogNumbers" USING btree (identifier, year, number);


--
-- Name: idx_specimen_rel_normalizedagents; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_specimen_rel_normalizedagents ON public.specimens USING gin ((((relationships -> 'normalizedAgents'::text) -> 'data'::text)));


--
-- Name: idx_specimen_rel_physicalobjects; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_specimen_rel_physicalobjects ON public.specimens USING gin ((((relationships -> 'physicalObjects'::text) -> 'data'::text)));


--
-- Name: idx_specimen_rel_places; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_specimen_rel_places ON public.specimens USING gin ((((relationships -> 'places'::text) -> 'data'::text)));


--
-- Name: idx_specimen_rel_taxa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_specimen_rel_taxa ON public.specimens USING gin ((((relationships -> 'taxa'::text) -> 'data'::text)));


--
-- Name: idx_storagelocation_rel_taxa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_storagelocation_rel_taxa ON public."storageLocations" USING gin ((((relationships -> 'taxa'::text) -> 'data'::text)));


--
-- Name: resource_activities_resource; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX resource_activities_resource ON public."resourceActivities" USING btree (resource);


--
-- Name: resource_activities_resource_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX resource_activities_resource_id ON public."resourceActivities" USING btree ("resourceId");


--
-- Name: resource_activities_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX resource_activities_user_id ON public."resourceActivities" USING btree ("userId");


--
-- Name: physicalObjects physicalObjects_storageLocationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."physicalObjects"
    ADD CONSTRAINT "physicalObjects_storageLocationId_fkey" FOREIGN KEY ("storageLocationId") REFERENCES public."storageLocations"(id);


--
-- Name: places places_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT "places_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.places(id);


--
-- Name: storageLocations storageLocations_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."storageLocations"
    ADD CONSTRAINT "storageLocations_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."storageLocations"(id);


--
-- Name: taxonNames taxonNames_acceptedToTaxonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taxonNames"
    ADD CONSTRAINT "taxonNames_acceptedToTaxonId_fkey" FOREIGN KEY ("acceptedToTaxonId") REFERENCES public.taxons(id);


--
-- Name: taxonNames taxonNames_synonymToTaxonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taxonNames"
    ADD CONSTRAINT "taxonNames_synonymToTaxonId_fkey" FOREIGN KEY ("synonymToTaxonId") REFERENCES public.taxons(id);


--
-- Name: taxonNames taxonNames_vernacularToTaxonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taxonNames"
    ADD CONSTRAINT "taxonNames_vernacularToTaxonId_fkey" FOREIGN KEY ("vernacularToTaxonId") REFERENCES public.taxons(id);


--
-- Name: taxons taxons_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taxons
    ADD CONSTRAINT "taxons_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.taxons(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

