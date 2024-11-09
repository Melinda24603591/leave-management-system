package com.hml.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

/**
 * 请假类型表
 */
@Data
public class LogDTO {


    String spName;


    String sqName;


    String status;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    Date createTime;



    /**
     * 当前页
     */
    @TableField(exist = false)
    private Integer pageNum;

    /**
     * 每页多少条
     */
    @TableField(exist = false)
    private Integer pageSize;


}