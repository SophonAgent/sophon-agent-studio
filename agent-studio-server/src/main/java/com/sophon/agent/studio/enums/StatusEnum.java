package com.sophon.agent.studio.enums;

/**
 * @author: chun
 * @date: 2022/1/11
 * @Description: 状态
 * @version: V1.0
 */
public enum StatusEnum {
    ENABLE(1),
    DISABLE(0),
    DELETE(-1),
    TEST(99);

    private int status;

    StatusEnum(int status) {
        this.status = status;
    }

    public static StatusEnum getByStatus(int status){
        for(StatusEnum statusEnum : values()){
            if(statusEnum.status == status){
                return statusEnum;
            }
        }
        return StatusEnum.ENABLE;
    }

    public int getStatus() {
        return status;
    }

    public static boolean codeToBoolean(int code) {
        return code == 1;
    }
}
