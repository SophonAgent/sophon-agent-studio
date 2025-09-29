package com.sophon.agent.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SophonPromptConfigDetailExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SophonPromptConfigDetailExample() {
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

        public Criteria andPromptUidIsNull() {
            addCriterion("prompt_uid is null");
            return (Criteria) this;
        }

        public Criteria andPromptUidIsNotNull() {
            addCriterion("prompt_uid is not null");
            return (Criteria) this;
        }

        public Criteria andPromptUidEqualTo(String value) {
            addCriterion("prompt_uid =", value, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidNotEqualTo(String value) {
            addCriterion("prompt_uid <>", value, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidGreaterThan(String value) {
            addCriterion("prompt_uid >", value, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidGreaterThanOrEqualTo(String value) {
            addCriterion("prompt_uid >=", value, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidLessThan(String value) {
            addCriterion("prompt_uid <", value, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidLessThanOrEqualTo(String value) {
            addCriterion("prompt_uid <=", value, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidLike(String value) {
            addCriterion("prompt_uid like", value, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidNotLike(String value) {
            addCriterion("prompt_uid not like", value, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidIn(List<String> values) {
            addCriterion("prompt_uid in", values, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidNotIn(List<String> values) {
            addCriterion("prompt_uid not in", values, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidBetween(String value1, String value2) {
            addCriterion("prompt_uid between", value1, value2, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptUidNotBetween(String value1, String value2) {
            addCriterion("prompt_uid not between", value1, value2, "promptUid");
            return (Criteria) this;
        }

        public Criteria andPromptContentIsNull() {
            addCriterion("prompt_content is null");
            return (Criteria) this;
        }

        public Criteria andPromptContentIsNotNull() {
            addCriterion("prompt_content is not null");
            return (Criteria) this;
        }

        public Criteria andPromptContentEqualTo(String value) {
            addCriterion("prompt_content =", value, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentNotEqualTo(String value) {
            addCriterion("prompt_content <>", value, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentGreaterThan(String value) {
            addCriterion("prompt_content >", value, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentGreaterThanOrEqualTo(String value) {
            addCriterion("prompt_content >=", value, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentLessThan(String value) {
            addCriterion("prompt_content <", value, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentLessThanOrEqualTo(String value) {
            addCriterion("prompt_content <=", value, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentLike(String value) {
            addCriterion("prompt_content like", value, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentNotLike(String value) {
            addCriterion("prompt_content not like", value, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentIn(List<String> values) {
            addCriterion("prompt_content in", values, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentNotIn(List<String> values) {
            addCriterion("prompt_content not in", values, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentBetween(String value1, String value2) {
            addCriterion("prompt_content between", value1, value2, "promptContent");
            return (Criteria) this;
        }

        public Criteria andPromptContentNotBetween(String value1, String value2) {
            addCriterion("prompt_content not between", value1, value2, "promptContent");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderIsNull() {
            addCriterion("content_placeholder is null");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderIsNotNull() {
            addCriterion("content_placeholder is not null");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderEqualTo(String value) {
            addCriterion("content_placeholder =", value, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderNotEqualTo(String value) {
            addCriterion("content_placeholder <>", value, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderGreaterThan(String value) {
            addCriterion("content_placeholder >", value, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderGreaterThanOrEqualTo(String value) {
            addCriterion("content_placeholder >=", value, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderLessThan(String value) {
            addCriterion("content_placeholder <", value, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderLessThanOrEqualTo(String value) {
            addCriterion("content_placeholder <=", value, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderLike(String value) {
            addCriterion("content_placeholder like", value, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderNotLike(String value) {
            addCriterion("content_placeholder not like", value, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderIn(List<String> values) {
            addCriterion("content_placeholder in", values, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderNotIn(List<String> values) {
            addCriterion("content_placeholder not in", values, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderBetween(String value1, String value2) {
            addCriterion("content_placeholder between", value1, value2, "contentPlaceholder");
            return (Criteria) this;
        }

        public Criteria andContentPlaceholderNotBetween(String value1, String value2) {
            addCriterion("content_placeholder not between", value1, value2, "contentPlaceholder");
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

        public Criteria andVersionIsNull() {
            addCriterion("version is null");
            return (Criteria) this;
        }

        public Criteria andVersionIsNotNull() {
            addCriterion("version is not null");
            return (Criteria) this;
        }

        public Criteria andVersionEqualTo(Integer value) {
            addCriterion("version =", value, "version");
            return (Criteria) this;
        }

        public Criteria andVersionNotEqualTo(Integer value) {
            addCriterion("version <>", value, "version");
            return (Criteria) this;
        }

        public Criteria andVersionGreaterThan(Integer value) {
            addCriterion("version >", value, "version");
            return (Criteria) this;
        }

        public Criteria andVersionGreaterThanOrEqualTo(Integer value) {
            addCriterion("version >=", value, "version");
            return (Criteria) this;
        }

        public Criteria andVersionLessThan(Integer value) {
            addCriterion("version <", value, "version");
            return (Criteria) this;
        }

        public Criteria andVersionLessThanOrEqualTo(Integer value) {
            addCriterion("version <=", value, "version");
            return (Criteria) this;
        }

        public Criteria andVersionIn(List<Integer> values) {
            addCriterion("version in", values, "version");
            return (Criteria) this;
        }

        public Criteria andVersionNotIn(List<Integer> values) {
            addCriterion("version not in", values, "version");
            return (Criteria) this;
        }

        public Criteria andVersionBetween(Integer value1, Integer value2) {
            addCriterion("version between", value1, value2, "version");
            return (Criteria) this;
        }

        public Criteria andVersionNotBetween(Integer value1, Integer value2) {
            addCriterion("version not between", value1, value2, "version");
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

        public Criteria andCommentIsNull() {
            addCriterion("comment is null");
            return (Criteria) this;
        }

        public Criteria andCommentIsNotNull() {
            addCriterion("comment is not null");
            return (Criteria) this;
        }

        public Criteria andCommentEqualTo(String value) {
            addCriterion("comment =", value, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentNotEqualTo(String value) {
            addCriterion("comment <>", value, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentGreaterThan(String value) {
            addCriterion("comment >", value, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentGreaterThanOrEqualTo(String value) {
            addCriterion("comment >=", value, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentLessThan(String value) {
            addCriterion("comment <", value, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentLessThanOrEqualTo(String value) {
            addCriterion("comment <=", value, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentLike(String value) {
            addCriterion("comment like", value, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentNotLike(String value) {
            addCriterion("comment not like", value, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentIn(List<String> values) {
            addCriterion("comment in", values, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentNotIn(List<String> values) {
            addCriterion("comment not in", values, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentBetween(String value1, String value2) {
            addCriterion("comment between", value1, value2, "comment");
            return (Criteria) this;
        }

        public Criteria andCommentNotBetween(String value1, String value2) {
            addCriterion("comment not between", value1, value2, "comment");
            return (Criteria) this;
        }

        public Criteria andFrameworkIsNull() {
            addCriterion("framework is null");
            return (Criteria) this;
        }

        public Criteria andFrameworkIsNotNull() {
            addCriterion("framework is not null");
            return (Criteria) this;
        }

        public Criteria andFrameworkEqualTo(String value) {
            addCriterion("framework =", value, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkNotEqualTo(String value) {
            addCriterion("framework <>", value, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkGreaterThan(String value) {
            addCriterion("framework >", value, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkGreaterThanOrEqualTo(String value) {
            addCriterion("framework >=", value, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkLessThan(String value) {
            addCriterion("framework <", value, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkLessThanOrEqualTo(String value) {
            addCriterion("framework <=", value, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkLike(String value) {
            addCriterion("framework like", value, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkNotLike(String value) {
            addCriterion("framework not like", value, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkIn(List<String> values) {
            addCriterion("framework in", values, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkNotIn(List<String> values) {
            addCriterion("framework not in", values, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkBetween(String value1, String value2) {
            addCriterion("framework between", value1, value2, "framework");
            return (Criteria) this;
        }

        public Criteria andFrameworkNotBetween(String value1, String value2) {
            addCriterion("framework not between", value1, value2, "framework");
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