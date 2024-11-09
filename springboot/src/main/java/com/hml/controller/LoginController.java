package com.hml.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.hml.common.Result;
import com.hml.domain.User;
import com.hml.mapper.UserMapper;
import com.hml.service.RedisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "登录")
@RestController
@RequestMapping()
public class LoginController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RedisService redisService;

    @GetMapping("/login")
    @ApiOperation("登录")
    public Result login(User user) {
        User user1 = (User) redisService.getValue(user.getUsername());
        if (user1 != null){
            System.out.println("我这里用的redis");
            return Result.success(user1);
        }else{
            QueryWrapper<User> wrapper = new QueryWrapper<>();
            wrapper.eq("username",user.getUsername())
                    .eq("password",user.getPassword());
            User user2 = userMapper.selectOne(wrapper);
            if (user2 == null) {
                return Result.fail("用户名或密码错误");
            }
            System.out.println("我这里redis存入");
            redisService.setValue(user2.getUsername(),user2);
            return Result.success(user2);
        }

    }
}
