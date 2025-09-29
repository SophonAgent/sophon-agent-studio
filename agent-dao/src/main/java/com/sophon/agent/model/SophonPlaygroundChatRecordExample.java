package com.sophon.agent.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SophonPlaygroundChatRecordExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SophonPlaygroundChatRecordExample() {
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

        public Criteria andUserIdIsNull() {
            addCriterion("user_id is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("user_id is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(String value) {
            addCriterion("user_id =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(String value) {
            addCriterion("user_id <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(String value) {
            addCriterion("user_id >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("user_id >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(String value) {
            addCriterion("user_id <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(String value) {
            addCriterion("user_id <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLike(String value) {
            addCriterion("user_id like", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotLike(String value) {
            addCriterion("user_id not like", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<String> values) {
            addCriterion("user_id in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<String> values) {
            addCriterion("user_id not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(String value1, String value2) {
            addCriterion("user_id between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(String value1, String value2) {
            addCriterion("user_id not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andSessionIdIsNull() {
            addCriterion("session_id is null");
            return (Criteria) this;
        }

        public Criteria andSessionIdIsNotNull() {
            addCriterion("session_id is not null");
            return (Criteria) this;
        }

        public Criteria andSessionIdEqualTo(String value) {
            addCriterion("session_id =", value, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdNotEqualTo(String value) {
            addCriterion("session_id <>", value, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdGreaterThan(String value) {
            addCriterion("session_id >", value, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdGreaterThanOrEqualTo(String value) {
            addCriterion("session_id >=", value, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdLessThan(String value) {
            addCriterion("session_id <", value, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdLessThanOrEqualTo(String value) {
            addCriterion("session_id <=", value, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdLike(String value) {
            addCriterion("session_id like", value, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdNotLike(String value) {
            addCriterion("session_id not like", value, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdIn(List<String> values) {
            addCriterion("session_id in", values, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdNotIn(List<String> values) {
            addCriterion("session_id not in", values, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdBetween(String value1, String value2) {
            addCriterion("session_id between", value1, value2, "sessionId");
            return (Criteria) this;
        }

        public Criteria andSessionIdNotBetween(String value1, String value2) {
            addCriterion("session_id not between", value1, value2, "sessionId");
            return (Criteria) this;
        }

        public Criteria andModelArgsIsNull() {
            addCriterion("model_args is null");
            return (Criteria) this;
        }

        public Criteria andModelArgsIsNotNull() {
            addCriterion("model_args is not null");
            return (Criteria) this;
        }

        public Criteria andModelArgsEqualTo(String value) {
            addCriterion("model_args =", value, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsNotEqualTo(String value) {
            addCriterion("model_args <>", value, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsGreaterThan(String value) {
            addCriterion("model_args >", value, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsGreaterThanOrEqualTo(String value) {
            addCriterion("model_args >=", value, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsLessThan(String value) {
            addCriterion("model_args <", value, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsLessThanOrEqualTo(String value) {
            addCriterion("model_args <=", value, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsLike(String value) {
            addCriterion("model_args like", value, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsNotLike(String value) {
            addCriterion("model_args not like", value, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsIn(List<String> values) {
            addCriterion("model_args in", values, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsNotIn(List<String> values) {
            addCriterion("model_args not in", values, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsBetween(String value1, String value2) {
            addCriterion("model_args between", value1, value2, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andModelArgsNotBetween(String value1, String value2) {
            addCriterion("model_args not between", value1, value2, "modelArgs");
            return (Criteria) this;
        }

        public Criteria andCompleteContentIsNull() {
            addCriterion("complete_content is null");
            return (Criteria) this;
        }

        public Criteria andCompleteContentIsNotNull() {
            addCriterion("complete_content is not null");
            return (Criteria) this;
        }

        public Criteria andCompleteContentEqualTo(String value) {
            addCriterion("complete_content =", value, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentNotEqualTo(String value) {
            addCriterion("complete_content <>", value, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentGreaterThan(String value) {
            addCriterion("complete_content >", value, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentGreaterThanOrEqualTo(String value) {
            addCriterion("complete_content >=", value, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentLessThan(String value) {
            addCriterion("complete_content <", value, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentLessThanOrEqualTo(String value) {
            addCriterion("complete_content <=", value, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentLike(String value) {
            addCriterion("complete_content like", value, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentNotLike(String value) {
            addCriterion("complete_content not like", value, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentIn(List<String> values) {
            addCriterion("complete_content in", values, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentNotIn(List<String> values) {
            addCriterion("complete_content not in", values, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentBetween(String value1, String value2) {
            addCriterion("complete_content between", value1, value2, "completeContent");
            return (Criteria) this;
        }

        public Criteria andCompleteContentNotBetween(String value1, String value2) {
            addCriterion("complete_content not between", value1, value2, "completeContent");
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

        public Criteria andPromptDynamicValuesIsNull() {
            addCriterion("prompt_dynamic_values is null");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesIsNotNull() {
            addCriterion("prompt_dynamic_values is not null");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesEqualTo(String value) {
            addCriterion("prompt_dynamic_values =", value, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesNotEqualTo(String value) {
            addCriterion("prompt_dynamic_values <>", value, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesGreaterThan(String value) {
            addCriterion("prompt_dynamic_values >", value, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesGreaterThanOrEqualTo(String value) {
            addCriterion("prompt_dynamic_values >=", value, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesLessThan(String value) {
            addCriterion("prompt_dynamic_values <", value, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesLessThanOrEqualTo(String value) {
            addCriterion("prompt_dynamic_values <=", value, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesLike(String value) {
            addCriterion("prompt_dynamic_values like", value, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesNotLike(String value) {
            addCriterion("prompt_dynamic_values not like", value, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesIn(List<String> values) {
            addCriterion("prompt_dynamic_values in", values, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesNotIn(List<String> values) {
            addCriterion("prompt_dynamic_values not in", values, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesBetween(String value1, String value2) {
            addCriterion("prompt_dynamic_values between", value1, value2, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andPromptDynamicValuesNotBetween(String value1, String value2) {
            addCriterion("prompt_dynamic_values not between", value1, value2, "promptDynamicValues");
            return (Criteria) this;
        }

        public Criteria andNameIsNull() {
            addCriterion("name is null");
            return (Criteria) this;
        }

        public Criteria andNameIsNotNull() {
            addCriterion("name is not null");
            return (Criteria) this;
        }

        public Criteria andNameEqualTo(String value) {
            addCriterion("name =", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotEqualTo(String value) {
            addCriterion("name <>", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThan(String value) {
            addCriterion("name >", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThanOrEqualTo(String value) {
            addCriterion("name >=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThan(String value) {
            addCriterion("name <", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThanOrEqualTo(String value) {
            addCriterion("name <=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLike(String value) {
            addCriterion("name like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotLike(String value) {
            addCriterion("name not like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameIn(List<String> values) {
            addCriterion("name in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotIn(List<String> values) {
            addCriterion("name not in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameBetween(String value1, String value2) {
            addCriterion("name between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotBetween(String value1, String value2) {
            addCriterion("name not between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andIsSharedIsNull() {
            addCriterion("is_shared is null");
            return (Criteria) this;
        }

        public Criteria andIsSharedIsNotNull() {
            addCriterion("is_shared is not null");
            return (Criteria) this;
        }

        public Criteria andIsSharedEqualTo(Integer value) {
            addCriterion("is_shared =", value, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedNotEqualTo(Integer value) {
            addCriterion("is_shared <>", value, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedGreaterThan(Integer value) {
            addCriterion("is_shared >", value, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_shared >=", value, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedLessThan(Integer value) {
            addCriterion("is_shared <", value, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedLessThanOrEqualTo(Integer value) {
            addCriterion("is_shared <=", value, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedIn(List<Integer> values) {
            addCriterion("is_shared in", values, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedNotIn(List<Integer> values) {
            addCriterion("is_shared not in", values, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedBetween(Integer value1, Integer value2) {
            addCriterion("is_shared between", value1, value2, "isShared");
            return (Criteria) this;
        }

        public Criteria andIsSharedNotBetween(Integer value1, Integer value2) {
            addCriterion("is_shared not between", value1, value2, "isShared");
            return (Criteria) this;
        }

        public Criteria andExtraIsNull() {
            addCriterion("extra is null");
            return (Criteria) this;
        }

        public Criteria andExtraIsNotNull() {
            addCriterion("extra is not null");
            return (Criteria) this;
        }

        public Criteria andExtraEqualTo(String value) {
            addCriterion("extra =", value, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraNotEqualTo(String value) {
            addCriterion("extra <>", value, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraGreaterThan(String value) {
            addCriterion("extra >", value, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraGreaterThanOrEqualTo(String value) {
            addCriterion("extra >=", value, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraLessThan(String value) {
            addCriterion("extra <", value, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraLessThanOrEqualTo(String value) {
            addCriterion("extra <=", value, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraLike(String value) {
            addCriterion("extra like", value, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraNotLike(String value) {
            addCriterion("extra not like", value, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraIn(List<String> values) {
            addCriterion("extra in", values, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraNotIn(List<String> values) {
            addCriterion("extra not in", values, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraBetween(String value1, String value2) {
            addCriterion("extra between", value1, value2, "extra");
            return (Criteria) this;
        }

        public Criteria andExtraNotBetween(String value1, String value2) {
            addCriterion("extra not between", value1, value2, "extra");
            return (Criteria) this;
        }

        public Criteria andPromptVersionIsNull() {
            addCriterion("prompt_version is null");
            return (Criteria) this;
        }

        public Criteria andPromptVersionIsNotNull() {
            addCriterion("prompt_version is not null");
            return (Criteria) this;
        }

        public Criteria andPromptVersionEqualTo(Integer value) {
            addCriterion("prompt_version =", value, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionNotEqualTo(Integer value) {
            addCriterion("prompt_version <>", value, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionGreaterThan(Integer value) {
            addCriterion("prompt_version >", value, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionGreaterThanOrEqualTo(Integer value) {
            addCriterion("prompt_version >=", value, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionLessThan(Integer value) {
            addCriterion("prompt_version <", value, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionLessThanOrEqualTo(Integer value) {
            addCriterion("prompt_version <=", value, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionIn(List<Integer> values) {
            addCriterion("prompt_version in", values, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionNotIn(List<Integer> values) {
            addCriterion("prompt_version not in", values, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionBetween(Integer value1, Integer value2) {
            addCriterion("prompt_version between", value1, value2, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andPromptVersionNotBetween(Integer value1, Integer value2) {
            addCriterion("prompt_version not between", value1, value2, "promptVersion");
            return (Criteria) this;
        }

        public Criteria andChatIdIsNull() {
            addCriterion("chat_id is null");
            return (Criteria) this;
        }

        public Criteria andChatIdIsNotNull() {
            addCriterion("chat_id is not null");
            return (Criteria) this;
        }

        public Criteria andChatIdEqualTo(String value) {
            addCriterion("chat_id =", value, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdNotEqualTo(String value) {
            addCriterion("chat_id <>", value, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdGreaterThan(String value) {
            addCriterion("chat_id >", value, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdGreaterThanOrEqualTo(String value) {
            addCriterion("chat_id >=", value, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdLessThan(String value) {
            addCriterion("chat_id <", value, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdLessThanOrEqualTo(String value) {
            addCriterion("chat_id <=", value, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdLike(String value) {
            addCriterion("chat_id like", value, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdNotLike(String value) {
            addCriterion("chat_id not like", value, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdIn(List<String> values) {
            addCriterion("chat_id in", values, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdNotIn(List<String> values) {
            addCriterion("chat_id not in", values, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdBetween(String value1, String value2) {
            addCriterion("chat_id between", value1, value2, "chatId");
            return (Criteria) this;
        }

        public Criteria andChatIdNotBetween(String value1, String value2) {
            addCriterion("chat_id not between", value1, value2, "chatId");
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