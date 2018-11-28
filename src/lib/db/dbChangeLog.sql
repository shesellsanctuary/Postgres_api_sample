--liquibase formatted sql

--changeset i860624:1
CREATE TABLE apiCalls(
            id BIGSERIAL,
            service TEXT,
            tenant TEXT,
            timestamp TIMESTAMP,
            numberOfCall BIGINT,
            sentToMaas BOOLEAN DEFAULT false
            );

