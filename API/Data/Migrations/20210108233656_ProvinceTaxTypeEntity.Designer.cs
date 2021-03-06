﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210108233656_ProvinceTaxTypeEntity")]
    partial class ProvinceTaxTypeEntity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0-rc.2.20475.6");

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("API.Entities.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CommencementDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("GroupTerminationDate")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IncludeCostPlusClaims")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IncludeHsaClaims")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("YearEndDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Company");
                });

            modelBuilder.Entity("API.Entities.Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("TaxPercentage")
                        .HasColumnType("REAL");

                    b.Property<int>("TaxTypeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TaxTypeId");

                    b.ToTable("Province");
                });

            modelBuilder.Entity("API.Entities.TaxType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Tax_Type");
                });

            modelBuilder.Entity("API.Entities.Province", b =>
                {
                    b.HasOne("API.Entities.TaxType", "TaxType")
                        .WithMany("Provinces")
                        .HasForeignKey("TaxTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TaxType");
                });

            modelBuilder.Entity("API.Entities.TaxType", b =>
                {
                    b.Navigation("Provinces");
                });
#pragma warning restore 612, 618
        }
    }
}
