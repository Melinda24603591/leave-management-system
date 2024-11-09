package com.hml.common;

import lombok.Data;

import java.io.Serializable;

@Data
public class Result<T> implements Serializable {

    /**
     * 状态码
     */
    private Integer code;

    /**
     * 返回结果
     */
    private T data;

    /**
     * 返回消息
     */
    private String msg;

    public static <T> Result<T> success() {
        Result<T> result = new Result<>();
        result.setCode(200);
        return result;
    }

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.setData(data);
        result.setCode(200);
        return result;
    }
    public static <T> Result<T> success(T data, String msg) {
        Result<T> result = new Result<>();
        result.setData(data);
        result.setCode(200);
        result.setMsg(msg);
        return result;
    }

    public static <T> Result<T> fail() {
        Result<T> result = new Result<>();
        result.setCode(500);
        result.setMsg("失败");
        return result;
    }



    public static <T> Result<T> fail(String msg) {
        Result<T> result = new Result<>();
        result.setCode(500);
        result.setMsg(msg);
        return result;
    }
}