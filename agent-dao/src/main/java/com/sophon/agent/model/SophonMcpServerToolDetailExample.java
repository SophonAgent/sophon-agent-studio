package com.sophon.agent.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SophonMcpServerToolDetailExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SophonMcpServerToolDetailExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameIsNull() {
            addCriterion("qualified_name is null");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameIsNotNull() {
            addCriterion("qualified_name is not null");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameEqualTo(String value) {
            addCriterion("qualified_name =", value, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameNotEqualTo(String value) {
            addCriterion("qualified_name <>", value, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameGreaterThan(String value) {
            addCriterion("qualified_name >", value, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameGreaterThanOrEqualTo(String value) {
            addCriterion("qualified_name >=", value, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameLessThan(String value) {
            addCriterion("qualified_name <", value, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameLessThanOrEqualTo(String value) {
            addCriterion("qualified_name <=", value, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameLike(String value) {
            addCriterion("qualified_name like", value, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameNotLike(String value) {
            addCriterion("qualified_name not like", value, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameIn(List<String> values) {
            addCriterion("qualified_name in", values, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameNotIn(List<String> values) {
            addCriterion("qualified_name not in", values, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameBetween(String value1, String value2) {
            addCriterion("qualified_name between", value1, value2, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andQualifiedNameNotBetween(String value1, String value2) {
            addCriterion("qualified_name not between", value1, value2, "qualifiedName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameIsNull() {
            addCriterion("display_name is null");
            return (Criteria) this;
        }

        public Criteria andDisplayNameIsNotNull() {
            addCriterion("display_name is not null");
            return (Criteria) this;
        }

        public Criteria andDisplayNameEqualTo(String value) {
            addCriterion("display_name =", value, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameNotEqualTo(String value) {
            addCriterion("display_name <>", value, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameGreaterThan(String value) {
            addCriterion("display_name >", value, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameGreaterThanOrEqualTo(String value) {
            addCriterion("display_name >=", value, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameLessThan(String value) {
            addCriterion("display_name <", value, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameLessThanOrEqualTo(String value) {
            addCriterion("display_name <=", value, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameLike(String value) {
            addCriterion("display_name like", value, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameNotLike(String value) {
            addCriterion("display_name not like", value, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameIn(List<String> values) {
            addCriterion("display_name in", values, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameNotIn(List<String> values) {
            addCriterion("display_name not in", values, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameBetween(String value1, String value2) {
            addCriterion("display_name between", value1, value2, "displayName");
            return (Criteria) this;
        }

        public Criteria andDisplayNameNotBetween(String value1, String value2) {
            addCriterion("display_name not between", value1, value2, "displayName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameIsNull() {
            addCriterion("server_qualified_name is null");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameIsNotNull() {
            addCriterion("server_qualified_name is not null");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameEqualTo(String value) {
            addCriterion("server_qualified_name =", value, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameNotEqualTo(String value) {
            addCriterion("server_qualified_name <>", value, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameGreaterThan(String value) {
            addCriterion("server_qualified_name >", value, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameGreaterThanOrEqualTo(String value) {
            addCriterion("server_qualified_name >=", value, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameLessThan(String value) {
            addCriterion("server_qualified_name <", value, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameLessThanOrEqualTo(String value) {
            addCriterion("server_qualified_name <=", value, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameLike(String value) {
            addCriterion("server_qualified_name like", value, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameNotLike(String value) {
            addCriterion("server_qualified_name not like", value, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameIn(List<String> values) {
            addCriterion("server_qualified_name in", values, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameNotIn(List<String> values) {
            addCriterion("server_qualified_name not in", values, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameBetween(String value1, String value2) {
            addCriterion("server_qualified_name between", value1, value2, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andServerQualifiedNameNotBetween(String value1, String value2) {
            addCriterion("server_qualified_name not between", value1, value2, "serverQualifiedName");
            return (Criteria) this;
        }

        public Criteria andDescriptionIsNull() {
            addCriterion("description is null");
            return (Criteria) this;
        }

        public Criteria andDescriptionIsNotNull() {
            addCriterion("description is not null");
            return (Criteria) this;
        }

        public Criteria andDescriptionEqualTo(String value) {
            addCriterion("description =", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotEqualTo(String value) {
            addCriterion("description <>", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionGreaterThan(String value) {
            addCriterion("description >", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionGreaterThanOrEqualTo(String value) {
            addCriterion("description >=", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLessThan(String value) {
            addCriterion("description <", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLessThanOrEqualTo(String value) {
            addCriterion("description <=", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLike(String value) {
            addCriterion("description like", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotLike(String value) {
            addCriterion("description not like", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionIn(List<String> values) {
            addCriterion("description in", values, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotIn(List<String> values) {
            addCriterion("description not in", values, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionBetween(String value1, String value2) {
            addCriterion("description between", value1, value2, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotBetween(String value1, String value2) {
            addCriterion("description not between", value1, value2, "description");
            return (Criteria) this;
        }

        public Criteria andInputSchemaIsNull() {
            addCriterion("input_schema is null");
            return (Criteria) this;
        }

        public Criteria andInputSchemaIsNotNull() {
            addCriterion("input_schema is not null");
            return (Criteria) this;
        }

        public Criteria andInputSchemaEqualTo(String value) {
            addCriterion("input_schema =", value, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaNotEqualTo(String value) {
            addCriterion("input_schema <>", value, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaGreaterThan(String value) {
            addCriterion("input_schema >", value, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaGreaterThanOrEqualTo(String value) {
            addCriterion("input_schema >=", value, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaLessThan(String value) {
            addCriterion("input_schema <", value, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaLessThanOrEqualTo(String value) {
            addCriterion("input_schema <=", value, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaLike(String value) {
            addCriterion("input_schema like", value, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaNotLike(String value) {
            addCriterion("input_schema not like", value, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaIn(List<String> values) {
            addCriterion("input_schema in", values, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaNotIn(List<String> values) {
            addCriterion("input_schema not in", values, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaBetween(String value1, String value2) {
            addCriterion("input_schema between", value1, value2, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andInputSchemaNotBetween(String value1, String value2) {
            addCriterion("input_schema not between", value1, value2, "inputSchema");
            return (Criteria) this;
        }

        public Criteria andProxyTypeIsNull() {
            addCriterion("proxy_type is null");
            return (Criteria) this;
        }

        public Criteria andProxyTypeIsNotNull() {
            addCriterion("proxy_type is not null");
            return (Criteria) this;
        }

        public Criteria andProxyTypeEqualTo(String value) {
            addCriterion("proxy_type =", value, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeNotEqualTo(String value) {
            addCriterion("proxy_type <>", value, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeGreaterThan(String value) {
            addCriterion("proxy_type >", value, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeGreaterThanOrEqualTo(String value) {
            addCriterion("proxy_type >=", value, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeLessThan(String value) {
            addCriterion("proxy_type <", value, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeLessThanOrEqualTo(String value) {
            addCriterion("proxy_type <=", value, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeLike(String value) {
            addCriterion("proxy_type like", value, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeNotLike(String value) {
            addCriterion("proxy_type not like", value, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeIn(List<String> values) {
            addCriterion("proxy_type in", values, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeNotIn(List<String> values) {
            addCriterion("proxy_type not in", values, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeBetween(String value1, String value2) {
            addCriterion("proxy_type between", value1, value2, "proxyType");
            return (Criteria) this;
        }

        public Criteria andProxyTypeNotBetween(String value1, String value2) {
            addCriterion("proxy_type not between", value1, value2, "proxyType");
            return (Criteria) this;
        }

        public Criteria andRequestMethodIsNull() {
            addCriterion("request_method is null");
            return (Criteria) this;
        }

        public Criteria andRequestMethodIsNotNull() {
            addCriterion("request_method is not null");
            return (Criteria) this;
        }

        public Criteria andRequestMethodEqualTo(String value) {
            addCriterion("request_method =", value, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodNotEqualTo(String value) {
            addCriterion("request_method <>", value, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodGreaterThan(String value) {
            addCriterion("request_method >", value, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodGreaterThanOrEqualTo(String value) {
            addCriterion("request_method >=", value, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodLessThan(String value) {
            addCriterion("request_method <", value, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodLessThanOrEqualTo(String value) {
            addCriterion("request_method <=", value, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodLike(String value) {
            addCriterion("request_method like", value, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodNotLike(String value) {
            addCriterion("request_method not like", value, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodIn(List<String> values) {
            addCriterion("request_method in", values, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodNotIn(List<String> values) {
            addCriterion("request_method not in", values, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodBetween(String value1, String value2) {
            addCriterion("request_method between", value1, value2, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestMethodNotBetween(String value1, String value2) {
            addCriterion("request_method not between", value1, value2, "requestMethod");
            return (Criteria) this;
        }

        public Criteria andRequestUrlIsNull() {
            addCriterion("request_url is null");
            return (Criteria) this;
        }

        public Criteria andRequestUrlIsNotNull() {
            addCriterion("request_url is not null");
            return (Criteria) this;
        }

        public Criteria andRequestUrlEqualTo(String value) {
            addCriterion("request_url =", value, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlNotEqualTo(String value) {
            addCriterion("request_url <>", value, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlGreaterThan(String value) {
            addCriterion("request_url >", value, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlGreaterThanOrEqualTo(String value) {
            addCriterion("request_url >=", value, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlLessThan(String value) {
            addCriterion("request_url <", value, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlLessThanOrEqualTo(String value) {
            addCriterion("request_url <=", value, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlLike(String value) {
            addCriterion("request_url like", value, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlNotLike(String value) {
            addCriterion("request_url not like", value, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlIn(List<String> values) {
            addCriterion("request_url in", values, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlNotIn(List<String> values) {
            addCriterion("request_url not in", values, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlBetween(String value1, String value2) {
            addCriterion("request_url between", value1, value2, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestUrlNotBetween(String value1, String value2) {
            addCriterion("request_url not between", value1, value2, "requestUrl");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersIsNull() {
            addCriterion("request_headers is null");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersIsNotNull() {
            addCriterion("request_headers is not null");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersEqualTo(String value) {
            addCriterion("request_headers =", value, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersNotEqualTo(String value) {
            addCriterion("request_headers <>", value, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersGreaterThan(String value) {
            addCriterion("request_headers >", value, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersGreaterThanOrEqualTo(String value) {
            addCriterion("request_headers >=", value, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersLessThan(String value) {
            addCriterion("request_headers <", value, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersLessThanOrEqualTo(String value) {
            addCriterion("request_headers <=", value, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersLike(String value) {
            addCriterion("request_headers like", value, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersNotLike(String value) {
            addCriterion("request_headers not like", value, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersIn(List<String> values) {
            addCriterion("request_headers in", values, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersNotIn(List<String> values) {
            addCriterion("request_headers not in", values, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersBetween(String value1, String value2) {
            addCriterion("request_headers between", value1, value2, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestHeadersNotBetween(String value1, String value2) {
            addCriterion("request_headers not between", value1, value2, "requestHeaders");
            return (Criteria) this;
        }

        public Criteria andRequestJsonIsNull() {
            addCriterion("request_json is null");
            return (Criteria) this;
        }

        public Criteria andRequestJsonIsNotNull() {
            addCriterion("request_json is not null");
            return (Criteria) this;
        }

        public Criteria andRequestJsonEqualTo(String value) {
            addCriterion("request_json =", value, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonNotEqualTo(String value) {
            addCriterion("request_json <>", value, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonGreaterThan(String value) {
            addCriterion("request_json >", value, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonGreaterThanOrEqualTo(String value) {
            addCriterion("request_json >=", value, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonLessThan(String value) {
            addCriterion("request_json <", value, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonLessThanOrEqualTo(String value) {
            addCriterion("request_json <=", value, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonLike(String value) {
            addCriterion("request_json like", value, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonNotLike(String value) {
            addCriterion("request_json not like", value, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonIn(List<String> values) {
            addCriterion("request_json in", values, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonNotIn(List<String> values) {
            addCriterion("request_json not in", values, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonBetween(String value1, String value2) {
            addCriterion("request_json between", value1, value2, "requestJson");
            return (Criteria) this;
        }

        public Criteria andRequestJsonNotBetween(String value1, String value2) {
            addCriterion("request_json not between", value1, value2, "requestJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonIsNull() {
            addCriterion("response_json is null");
            return (Criteria) this;
        }

        public Criteria andResponseJsonIsNotNull() {
            addCriterion("response_json is not null");
            return (Criteria) this;
        }

        public Criteria andResponseJsonEqualTo(String value) {
            addCriterion("response_json =", value, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonNotEqualTo(String value) {
            addCriterion("response_json <>", value, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonGreaterThan(String value) {
            addCriterion("response_json >", value, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonGreaterThanOrEqualTo(String value) {
            addCriterion("response_json >=", value, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonLessThan(String value) {
            addCriterion("response_json <", value, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonLessThanOrEqualTo(String value) {
            addCriterion("response_json <=", value, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonLike(String value) {
            addCriterion("response_json like", value, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonNotLike(String value) {
            addCriterion("response_json not like", value, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonIn(List<String> values) {
            addCriterion("response_json in", values, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonNotIn(List<String> values) {
            addCriterion("response_json not in", values, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonBetween(String value1, String value2) {
            addCriterion("response_json between", value1, value2, "responseJson");
            return (Criteria) this;
        }

        public Criteria andResponseJsonNotBetween(String value1, String value2) {
            addCriterion("response_json not between", value1, value2, "responseJson");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(Integer value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Integer value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Integer value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Integer value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Integer value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Integer> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Integer> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Integer value1, Integer value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLike(Date value) {
            addCriterion("create_time like", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotLike(Date value) {
            addCriterion("create_time not like", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeIsNull() {
            addCriterion("modify_time is null");
            return (Criteria) this;
        }

        public Criteria andModifyTimeIsNotNull() {
            addCriterion("modify_time is not null");
            return (Criteria) this;
        }

        public Criteria andModifyTimeEqualTo(Date value) {
            addCriterion("modify_time =", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeNotEqualTo(Date value) {
            addCriterion("modify_time <>", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeGreaterThan(Date value) {
            addCriterion("modify_time >", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("modify_time >=", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeLessThan(Date value) {
            addCriterion("modify_time <", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeLessThanOrEqualTo(Date value) {
            addCriterion("modify_time <=", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeLike(Date value) {
            addCriterion("modify_time like", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeNotLike(Date value) {
            addCriterion("modify_time not like", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeIn(List<Date> values) {
            addCriterion("modify_time in", values, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeNotIn(List<Date> values) {
            addCriterion("modify_time not in", values, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeBetween(Date value1, Date value2) {
            addCriterion("modify_time between", value1, value2, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeNotBetween(Date value1, Date value2) {
            addCriterion("modify_time not between", value1, value2, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andCreateUserIsNull() {
            addCriterion("create_user is null");
            return (Criteria) this;
        }

        public Criteria andCreateUserIsNotNull() {
            addCriterion("create_user is not null");
            return (Criteria) this;
        }

        public Criteria andCreateUserEqualTo(String value) {
            addCriterion("create_user =", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotEqualTo(String value) {
            addCriterion("create_user <>", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserGreaterThan(String value) {
            addCriterion("create_user >", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserGreaterThanOrEqualTo(String value) {
            addCriterion("create_user >=", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserLessThan(String value) {
            addCriterion("create_user <", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserLessThanOrEqualTo(String value) {
            addCriterion("create_user <=", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserLike(String value) {
            addCriterion("create_user like", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotLike(String value) {
            addCriterion("create_user not like", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserIn(List<String> values) {
            addCriterion("create_user in", values, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotIn(List<String> values) {
            addCriterion("create_user not in", values, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserBetween(String value1, String value2) {
            addCriterion("create_user between", value1, value2, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotBetween(String value1, String value2) {
            addCriterion("create_user not between", value1, value2, "createUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserIsNull() {
            addCriterion("modify_user is null");
            return (Criteria) this;
        }

        public Criteria andModifyUserIsNotNull() {
            addCriterion("modify_user is not null");
            return (Criteria) this;
        }

        public Criteria andModifyUserEqualTo(String value) {
            addCriterion("modify_user =", value, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserNotEqualTo(String value) {
            addCriterion("modify_user <>", value, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserGreaterThan(String value) {
            addCriterion("modify_user >", value, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserGreaterThanOrEqualTo(String value) {
            addCriterion("modify_user >=", value, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserLessThan(String value) {
            addCriterion("modify_user <", value, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserLessThanOrEqualTo(String value) {
            addCriterion("modify_user <=", value, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserLike(String value) {
            addCriterion("modify_user like", value, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserNotLike(String value) {
            addCriterion("modify_user not like", value, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserIn(List<String> values) {
            addCriterion("modify_user in", values, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserNotIn(List<String> values) {
            addCriterion("modify_user not in", values, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserBetween(String value1, String value2) {
            addCriterion("modify_user between", value1, value2, "modifyUser");
            return (Criteria) this;
        }

        public Criteria andModifyUserNotBetween(String value1, String value2) {
            addCriterion("modify_user not between", value1, value2, "modifyUser");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}