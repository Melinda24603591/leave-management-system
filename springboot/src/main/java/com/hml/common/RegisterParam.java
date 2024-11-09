package com.hml.common;

import lombok.Data;

@Data
public class RegisterParam {

    private Integer userId;

    private String username;

    private String password;

    private String confirmPassword;

}
