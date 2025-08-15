package com.sophon.agent.studio.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SophonAgentModelConfigExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SophonAgentModelConfigExample() {
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

        public Criteria andModelUrlIsNull() {
            addCriterion("model_url is null");
            return (Criteria) this;
        }

        public Criteria andModelUrlIsNotNull() {
            addCriterion("model_url is not null");
            return (Criteria) this;
        }

        public Criteria andModelUrlEqualTo(String value) {
            addCriterion("model_url =", value, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlNotEqualTo(String value) {
            addCriterion("model_url <>", value, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlGreaterThan(String value) {
            addCriterion("model_url >", value, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlGreaterThanOrEqualTo(String value) {
            addCriterion("model_url >=", value, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlLessThan(String value) {
            addCriterion("model_url <", value, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlLessThanOrEqualTo(String value) {
            addCriterion("model_url <=", value, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlLike(String value) {
            addCriterion("model_url like", value, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlNotLike(String value) {
            addCriterion("model_url not like", value, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlIn(List<String> values) {
            addCriterion("model_url in", values, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlNotIn(List<String> values) {
            addCriterion("model_url not in", values, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlBetween(String value1, String value2) {
            addCriterion("model_url between", value1, value2, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelUrlNotBetween(String value1, String value2) {
            addCriterion("model_url not between", value1, value2, "modelUrl");
            return (Criteria) this;
        }

        public Criteria andModelKeyIsNull() {
            addCriterion("model_key is null");
            return (Criteria) this;
        }

        public Criteria andModelKeyIsNotNull() {
            addCriterion("model_key is not null");
            return (Criteria) this;
        }

        public Criteria andModelKeyEqualTo(String value) {
            addCriterion("model_key =", value, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyNotEqualTo(String value) {
            addCriterion("model_key <>", value, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyGreaterThan(String value) {
            addCriterion("model_key >", value, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyGreaterThanOrEqualTo(String value) {
            addCriterion("model_key >=", value, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyLessThan(String value) {
            addCriterion("model_key <", value, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyLessThanOrEqualTo(String value) {
            addCriterion("model_key <=", value, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyLike(String value) {
            addCriterion("model_key like", value, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyNotLike(String value) {
            addCriterion("model_key not like", value, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyIn(List<String> values) {
            addCriterion("model_key in", values, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyNotIn(List<String> values) {
            addCriterion("model_key not in", values, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyBetween(String value1, String value2) {
            addCriterion("model_key between", value1, value2, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelKeyNotBetween(String value1, String value2) {
            addCriterion("model_key not between", value1, value2, "modelKey");
            return (Criteria) this;
        }

        public Criteria andModelNameIsNull() {
            addCriterion("model_name is null");
            return (Criteria) this;
        }

        public Criteria andModelNameIsNotNull() {
            addCriterion("model_name is not null");
            return (Criteria) this;
        }

        public Criteria andModelNameEqualTo(String value) {
            addCriterion("model_name =", value, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameNotEqualTo(String value) {
            addCriterion("model_name <>", value, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameGreaterThan(String value) {
            addCriterion("model_name >", value, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameGreaterThanOrEqualTo(String value) {
            addCriterion("model_name >=", value, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameLessThan(String value) {
            addCriterion("model_name <", value, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameLessThanOrEqualTo(String value) {
            addCriterion("model_name <=", value, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameLike(String value) {
            addCriterion("model_name like", value, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameNotLike(String value) {
            addCriterion("model_name not like", value, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameIn(List<String> values) {
            addCriterion("model_name in", values, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameNotIn(List<String> values) {
            addCriterion("model_name not in", values, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameBetween(String value1, String value2) {
            addCriterion("model_name between", value1, value2, "modelName");
            return (Criteria) this;
        }

        public Criteria andModelNameNotBetween(String value1, String value2) {
            addCriterion("model_name not between", value1, value2, "modelName");
            return (Criteria) this;
        }

        public Criteria andConfigIsNull() {
            addCriterion("config is null");
            return (Criteria) this;
        }

        public Criteria andConfigIsNotNull() {
            addCriterion("config is not null");
            return (Criteria) this;
        }

        public Criteria andConfigEqualTo(String value) {
            addCriterion("config =", value, "config");
            return (Criteria) this;
        }

        public Criteria andConfigNotEqualTo(String value) {
            addCriterion("config <>", value, "config");
            return (Criteria) this;
        }

        public Criteria andConfigGreaterThan(String value) {
            addCriterion("config >", value, "config");
            return (Criteria) this;
        }

        public Criteria andConfigGreaterThanOrEqualTo(String value) {
            addCriterion("config >=", value, "config");
            return (Criteria) this;
        }

        public Criteria andConfigLessThan(String value) {
            addCriterion("config <", value, "config");
            return (Criteria) this;
        }

        public Criteria andConfigLessThanOrEqualTo(String value) {
            addCriterion("config <=", value, "config");
            return (Criteria) this;
        }

        public Criteria andConfigLike(String value) {
            addCriterion("config like", value, "config");
            return (Criteria) this;
        }

        public Criteria andConfigNotLike(String value) {
            addCriterion("config not like", value, "config");
            return (Criteria) this;
        }

        public Criteria andConfigIn(List<String> values) {
            addCriterion("config in", values, "config");
            return (Criteria) this;
        }

        public Criteria andConfigNotIn(List<String> values) {
            addCriterion("config not in", values, "config");
            return (Criteria) this;
        }

        public Criteria andConfigBetween(String value1, String value2) {
            addCriterion("config between", value1, value2, "config");
            return (Criteria) this;
        }

        public Criteria andConfigNotBetween(String value1, String value2) {
            addCriterion("config not between", value1, value2, "config");
            return (Criteria) this;
        }

        public Criteria andIsDeleteIsNull() {
            addCriterion("is_delete is null");
            return (Criteria) this;
        }

        public Criteria andIsDeleteIsNotNull() {
            addCriterion("is_delete is not null");
            return (Criteria) this;
        }

        public Criteria andIsDeleteEqualTo(Integer value) {
            addCriterion("is_delete =", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteNotEqualTo(Integer value) {
            addCriterion("is_delete <>", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteGreaterThan(Integer value) {
            addCriterion("is_delete >", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_delete >=", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteLessThan(Integer value) {
            addCriterion("is_delete <", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteLessThanOrEqualTo(Integer value) {
            addCriterion("is_delete <=", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteIn(List<Integer> values) {
            addCriterion("is_delete in", values, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteNotIn(List<Integer> values) {
            addCriterion("is_delete not in", values, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteBetween(Integer value1, Integer value2) {
            addCriterion("is_delete between", value1, value2, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteNotBetween(Integer value1, Integer value2) {
            addCriterion("is_delete not between", value1, value2, "isDelete");
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

        public Criteria andModalitiesIsNull() {
            addCriterion("modalities is null");
            return (Criteria) this;
        }

        public Criteria andModalitiesIsNotNull() {
            addCriterion("modalities is not null");
            return (Criteria) this;
        }

        public Criteria andModalitiesEqualTo(String value) {
            addCriterion("modalities =", value, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesNotEqualTo(String value) {
            addCriterion("modalities <>", value, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesGreaterThan(String value) {
            addCriterion("modalities >", value, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesGreaterThanOrEqualTo(String value) {
            addCriterion("modalities >=", value, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesLessThan(String value) {
            addCriterion("modalities <", value, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesLessThanOrEqualTo(String value) {
            addCriterion("modalities <=", value, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesLike(String value) {
            addCriterion("modalities like", value, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesNotLike(String value) {
            addCriterion("modalities not like", value, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesIn(List<String> values) {
            addCriterion("modalities in", values, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesNotIn(List<String> values) {
            addCriterion("modalities not in", values, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesBetween(String value1, String value2) {
            addCriterion("modalities between", value1, value2, "modalities");
            return (Criteria) this;
        }

        public Criteria andModalitiesNotBetween(String value1, String value2) {
            addCriterion("modalities not between", value1, value2, "modalities");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitIsNull() {
            addCriterion("max_completion_token_limit is null");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitIsNotNull() {
            addCriterion("max_completion_token_limit is not null");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitEqualTo(Integer value) {
            addCriterion("max_completion_token_limit =", value, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitNotEqualTo(Integer value) {
            addCriterion("max_completion_token_limit <>", value, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitGreaterThan(Integer value) {
            addCriterion("max_completion_token_limit >", value, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitGreaterThanOrEqualTo(Integer value) {
            addCriterion("max_completion_token_limit >=", value, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitLessThan(Integer value) {
            addCriterion("max_completion_token_limit <", value, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitLessThanOrEqualTo(Integer value) {
            addCriterion("max_completion_token_limit <=", value, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitIn(List<Integer> values) {
            addCriterion("max_completion_token_limit in", values, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitNotIn(List<Integer> values) {
            addCriterion("max_completion_token_limit not in", values, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitBetween(Integer value1, Integer value2) {
            addCriterion("max_completion_token_limit between", value1, value2, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andMaxCompletionTokenLimitNotBetween(Integer value1, Integer value2) {
            addCriterion("max_completion_token_limit not between", value1, value2, "maxCompletionTokenLimit");
            return (Criteria) this;
        }

        public Criteria andModelAppTagIsNull() {
            addCriterion("model_app_tag is null");
            return (Criteria) this;
        }

        public Criteria andModelAppTagIsNotNull() {
            addCriterion("model_app_tag is not null");
            return (Criteria) this;
        }

        public Criteria andModelAppTagEqualTo(String value) {
            addCriterion("model_app_tag =", value, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagNotEqualTo(String value) {
            addCriterion("model_app_tag <>", value, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagGreaterThan(String value) {
            addCriterion("model_app_tag >", value, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagGreaterThanOrEqualTo(String value) {
            addCriterion("model_app_tag >=", value, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagLessThan(String value) {
            addCriterion("model_app_tag <", value, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagLessThanOrEqualTo(String value) {
            addCriterion("model_app_tag <=", value, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagLike(String value) {
            addCriterion("model_app_tag like", value, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagNotLike(String value) {
            addCriterion("model_app_tag not like", value, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagIn(List<String> values) {
            addCriterion("model_app_tag in", values, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagNotIn(List<String> values) {
            addCriterion("model_app_tag not in", values, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagBetween(String value1, String value2) {
            addCriterion("model_app_tag between", value1, value2, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andModelAppTagNotBetween(String value1, String value2) {
            addCriterion("model_app_tag not between", value1, value2, "modelAppTag");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsIsNull() {
            addCriterion("default_params is null");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsIsNotNull() {
            addCriterion("default_params is not null");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsEqualTo(String value) {
            addCriterion("default_params =", value, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsNotEqualTo(String value) {
            addCriterion("default_params <>", value, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsGreaterThan(String value) {
            addCriterion("default_params >", value, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsGreaterThanOrEqualTo(String value) {
            addCriterion("default_params >=", value, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsLessThan(String value) {
            addCriterion("default_params <", value, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsLessThanOrEqualTo(String value) {
            addCriterion("default_params <=", value, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsLike(String value) {
            addCriterion("default_params like", value, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsNotLike(String value) {
            addCriterion("default_params not like", value, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsIn(List<String> values) {
            addCriterion("default_params in", values, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsNotIn(List<String> values) {
            addCriterion("default_params not in", values, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsBetween(String value1, String value2) {
            addCriterion("default_params between", value1, value2, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andDefaultParamsNotBetween(String value1, String value2) {
            addCriterion("default_params not between", value1, value2, "defaultParams");
            return (Criteria) this;
        }

        public Criteria andSupportStreamIsNull() {
            addCriterion("support_stream is null");
            return (Criteria) this;
        }

        public Criteria andSupportStreamIsNotNull() {
            addCriterion("support_stream is not null");
            return (Criteria) this;
        }

        public Criteria andSupportStreamEqualTo(Integer value) {
            addCriterion("support_stream =", value, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamNotEqualTo(Integer value) {
            addCriterion("support_stream <>", value, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamGreaterThan(Integer value) {
            addCriterion("support_stream >", value, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamGreaterThanOrEqualTo(Integer value) {
            addCriterion("support_stream >=", value, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamLessThan(Integer value) {
            addCriterion("support_stream <", value, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamLessThanOrEqualTo(Integer value) {
            addCriterion("support_stream <=", value, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamIn(List<Integer> values) {
            addCriterion("support_stream in", values, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamNotIn(List<Integer> values) {
            addCriterion("support_stream not in", values, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamBetween(Integer value1, Integer value2) {
            addCriterion("support_stream between", value1, value2, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportStreamNotBetween(Integer value1, Integer value2) {
            addCriterion("support_stream not between", value1, value2, "supportStream");
            return (Criteria) this;
        }

        public Criteria andSupportSystemIsNull() {
            addCriterion("support_system is null");
            return (Criteria) this;
        }

        public Criteria andSupportSystemIsNotNull() {
            addCriterion("support_system is not null");
            return (Criteria) this;
        }

        public Criteria andSupportSystemEqualTo(Integer value) {
            addCriterion("support_system =", value, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemNotEqualTo(Integer value) {
            addCriterion("support_system <>", value, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemGreaterThan(Integer value) {
            addCriterion("support_system >", value, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemGreaterThanOrEqualTo(Integer value) {
            addCriterion("support_system >=", value, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemLessThan(Integer value) {
            addCriterion("support_system <", value, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemLessThanOrEqualTo(Integer value) {
            addCriterion("support_system <=", value, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemIn(List<Integer> values) {
            addCriterion("support_system in", values, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemNotIn(List<Integer> values) {
            addCriterion("support_system not in", values, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemBetween(Integer value1, Integer value2) {
            addCriterion("support_system between", value1, value2, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportSystemNotBetween(Integer value1, Integer value2) {
            addCriterion("support_system not between", value1, value2, "supportSystem");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningIsNull() {
            addCriterion("support_reasoning is null");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningIsNotNull() {
            addCriterion("support_reasoning is not null");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningEqualTo(Integer value) {
            addCriterion("support_reasoning =", value, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningNotEqualTo(Integer value) {
            addCriterion("support_reasoning <>", value, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningGreaterThan(Integer value) {
            addCriterion("support_reasoning >", value, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningGreaterThanOrEqualTo(Integer value) {
            addCriterion("support_reasoning >=", value, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningLessThan(Integer value) {
            addCriterion("support_reasoning <", value, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningLessThanOrEqualTo(Integer value) {
            addCriterion("support_reasoning <=", value, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningIn(List<Integer> values) {
            addCriterion("support_reasoning in", values, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningNotIn(List<Integer> values) {
            addCriterion("support_reasoning not in", values, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningBetween(Integer value1, Integer value2) {
            addCriterion("support_reasoning between", value1, value2, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andSupportReasoningNotBetween(Integer value1, Integer value2) {
            addCriterion("support_reasoning not between", value1, value2, "supportReasoning");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsIsNull() {
            addCriterion("timeout_seconds is null");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsIsNotNull() {
            addCriterion("timeout_seconds is not null");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsEqualTo(Integer value) {
            addCriterion("timeout_seconds =", value, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsNotEqualTo(Integer value) {
            addCriterion("timeout_seconds <>", value, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsGreaterThan(Integer value) {
            addCriterion("timeout_seconds >", value, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsGreaterThanOrEqualTo(Integer value) {
            addCriterion("timeout_seconds >=", value, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsLessThan(Integer value) {
            addCriterion("timeout_seconds <", value, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsLessThanOrEqualTo(Integer value) {
            addCriterion("timeout_seconds <=", value, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsIn(List<Integer> values) {
            addCriterion("timeout_seconds in", values, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsNotIn(List<Integer> values) {
            addCriterion("timeout_seconds not in", values, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsBetween(Integer value1, Integer value2) {
            addCriterion("timeout_seconds between", value1, value2, "timeoutSeconds");
            return (Criteria) this;
        }

        public Criteria andTimeoutSecondsNotBetween(Integer value1, Integer value2) {
            addCriterion("timeout_seconds not between", value1, value2, "timeoutSeconds");
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