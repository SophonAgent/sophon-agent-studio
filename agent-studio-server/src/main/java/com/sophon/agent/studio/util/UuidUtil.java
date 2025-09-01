package com.sophon.agent.studio.util;

import java.util.UUID;

public class UuidUtil {

    public static String getUuid(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

}
