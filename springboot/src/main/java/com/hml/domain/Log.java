package com.hml.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

/**
 * 请假类型表
 */
@Data
@TableName(value ="log")
public class Log {


    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 申请表id
     */
    private String leaveId;



    /**
     * 创建时间
     */
    private Date createTime;


    private Integer userId;


}